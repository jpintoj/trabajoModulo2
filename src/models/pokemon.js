const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  const Pokemon = sequelize.define('pokemon', {
    name: { type: DataTypes.STRING, allowNull: false },
    types: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    attacks: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    weight: { type: DataTypes.REAL, allowNull: false },
    height: { type: DataTypes.REAL, allowNull: false },
    createdAt: {type: DataTypes.DATE, allowNull: true },
    updatedAt: {type: DataTypes.DATE,allowNull: true },
 
  });

  return Pokemon;
  
};