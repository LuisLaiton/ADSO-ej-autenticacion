const express = require('express');
const router = express.Router();

const { registrarUsuario, login, obtenerPerfil, listarUsuarios } = require('../controllers/auth.controller');
const validarAuth = require('../middleware/validarAuth');
const verificarToken = require('../middleware/auth.middleware');
const autorizarRol = require('../middleware/autorizarRol');

router.post('/registro', validarAuth, registrarUsuario);
router.post('/login', validarAuth, login);

router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/usuarios', verificarToken, autorizarRol('admin'), listarUsuarios);


module.exports = router;