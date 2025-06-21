const jwt = require('jsonwebtoken');
//const { User } = require('../models');
const { Pokemon } = require('../models');
const bcrypt = require('bcryptjs');



//lista todos los pokemones
exports.getPokemon = async (req, res) => {
  const pokemon = await Pokemon.findAll({ attributes: ['id', 'name', 'types','attacks', 'weight', 'height'] });
   res.json(pokemon);
};

//Muestra pokemon selecionado buscado por nombre
exports.loginpoke = async (req, res) => {
  try {
    const { name } = req.body;
    const pokemon = await Pokemon.findOne({ where: { name } });
    if (!pokemon) return res.status(400).json({ message: 'Pokemon no encontrado' });
    res.json({ pokemon });
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

//Creacion de nuevo pokemon 
exports.nuevopoke = async (req, res) => {
  try {
    const { id,name,types, attacks, weight, height } = req.body;
    const pokemon = await Pokemon.create({ id, name,types, attacks, weight, height });
    res.status(201).json({ message: 'Pokemon creado', Id: pokemon.id });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear Pokemon', error: error.message });
  }
};

//Actualiza pokemon seleccionado por ID
exports.updatePokemon = async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (!pokemon) return res.status(404).json({ message: 'Pokemon no encontrado' });

  const { name,types, attacks, weight, height } = req.body;
  if (name) pokemon.name = name;
  if (types) pokemon.types = types;
  if (attacks) pokemon.attacks = attacks;
  if (weight) pokemon.weight = weight;
  if (height) pokemon.height = height;
   await pokemon.save();
  res.json({ message: 'Pokemon actualizado' });
};

exports.deletePokemon = async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (!pokemon) return res.status(404).json({ message: 'Pokemon no encontrado' });
  await pokemon.destroy();
  res.json({ message: 'Pokemon eliminado' });
};
