const express = require('express');
const router = express.Router();

const { registrarUsuario, login } = require('../controllers/auth.controller');
const validarAuth = require('../middleware/validarAuth');

router.post('/registro', validarAuth, registrarUsuario);
router.post('/login', validarAuth, login);

module.exports = router;