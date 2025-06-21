const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rutas sin proteccion pruebas
/*
router.post('/signuppoke', pokemonController.signuppoke);
router.post('/signinpoke', pokemonController.signinpoke);
router.put('/:id', pokemonController.updatePokemon);
router.delete('/:id', pokemonController.deletePokemon);
router.get('/', pokemonController.getPokemon);
*/
// Rutas protegidas con JWT

router.get('/', authenticateToken,pokemonController.getPokemon);
router.post('/nuevopoke', authenticateToken, pokemonController.nuevopoke);
router.post('/loginpoke', authenticateToken, pokemonController.loginpoke);
router.put('/:id', authenticateToken, pokemonController.updatePokemon);
router.delete('/:id', authenticateToken, pokemonController.deletePokemon);

module.exports = router;
