const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/creauser', userController.creauser);
router.post('/login', userController.login);

// Rutas sin proteccion para pruebas
/***********************************/
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);

// Rutas protegidas con JWT
/****************************/
//router.get('/', authenticateToken, userController.getUsers);
//router.get('/:id', authenticateToken, userController.getUser);
//router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
