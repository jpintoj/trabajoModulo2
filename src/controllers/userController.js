const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

//validar contraseña
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//validar formato de correo
function validarEmail(email) {
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailregex.test(email);
}

exports.creauser = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!passwordRegex.test(password)) {
          console.log("status = ",res.status)
          res.status(201).json({message: "La contraseña no cumple con requisitos minimos de seguridad"});
    }
    else if (!validarEmail(email)) {
          console.log("status = ",res.status)
          res.status(201).json({message: "Correo ingresado no cumple con formato ."});
    }else{

      const user = await User.create({ username, email, password });
      res.status(201).json({ message: 'Usuario creado', userId: user.id });
    }

  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario', error: error.message });
  }

};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
  //  console.log(req.body);
  
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const valid = await user.validatePassword(password);
        if (!valid) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
    
       res.json({ token });
    
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username', 'password'] });
   res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: ['id', 'username'] });
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
console.log(user);
  const { username,email, password } = req.body;

 if (!passwordRegex.test(password)) {
              console.log("status = ",res.status)
              res.status(201).json({message: "La contraseña no cumple con requisitos minimos de seguridad"});
  }
  else if (!validarEmail(email)) {
              console.log("status = ",res.status)
              res.status(201).json({message: "Correo ingresado no cumple con formato ."});
          
  }else{

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: 'Usuario actualizado' });
};
}
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  await user.destroy();
  res.json({ message: 'Usuario eliminado' });
};
