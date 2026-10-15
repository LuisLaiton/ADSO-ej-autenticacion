const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post('/registro', async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'usuario y contraseña, son obligatorios'
        });
    }

    try {
        const [usuarios] = await db.execute(
            'SELECT * FROM usuarios WHERE usuario = ?', [usuario]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensaje: 'El usuario ya existe'
            });
        }

        await db.execute('INSERT INTO usuarios (usuario, password) VALUES (?, ?)', [usuario, password]);

        res.status(201).json({
            mensaje: 'usuario registrado correctamente'
        });
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'error interno del servidor'
        });
    }
});

router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: 'usuario y contraseña, son obligatorios'
        });
    }

    try {
        const [usuarios] = await db.execute(
            'SELECT * FROM usuarios WHERE usuario = ?', [usuario]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        const usuarioEncontrado = usuarios[0];
        if (usuarioEncontrado.password != password) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }
        res.status(200).json({
            mensaje: 'autenticación satisfactoria'
        });
        
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'error interno del servidor'
        });
    }
});

module.exports = router;
