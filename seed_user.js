import bcrypt from "bcryptjs";
import pkg from 'pg';
const { Pool } = pkg;

// Configura la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
   //host: 'localhost',
  host: 'postgres',  //para conexion utilizando contenedor
  database: 'pokedex',
  //database: 'prueba2',
  password: 'Piton1961*',
  port: 5432,
});

async function insertarRegistro(username, email, password) {
  try {
    const password1 = await bcrypt.hash(password, 10);
    const queryText = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, password1];

    const res = await pool.query(queryText, values);

   // console.log('Registro insertado:', res.rows[0]);
    return res.rows[0]; 
  } catch (err) {
     console.error('Error al insertar el registro:', err.stack);
    throw err; 
  } finally {
     process.exit(0);
  }
}

async function ejemplo() {
  try {
    const nuevoUsuario = await insertarRegistro('usuario_01', 'usuario_01@correo.cl', 'Clave2025*');
    console.log('Nuevo usuario:', nuevoUsuario);
  } catch (error) {
    console.error('Error en el ejemplo:', error);
  }
}

ejemplo();