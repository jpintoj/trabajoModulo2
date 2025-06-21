const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {

  const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true, },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
   
    createdAt: {type: DataTypes.DATE, allowNull: true },
    updatedAt: {type: DataTypes.DATE,allowNull: true },
 
    });
    
 
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};

