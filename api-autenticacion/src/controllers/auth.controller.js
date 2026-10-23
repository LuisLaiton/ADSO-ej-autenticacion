const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registrarUsuario = async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const [usuarios] = await db.execute('SELECT id FROM usuarios WHERE usuario = ?', [usuario]);

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensaje: 'El usuario ya existe'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await db.execute('INSERT INTO usuarios (usuario, password) VALUES (?, ?)', [usuario, passwordHash]);

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

const login = async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        const passwordValida = await bcrypt.compare(password, usuarios[0].password);

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        const token = jwt.sign(
            { id: usuarios[0].id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
        );

        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

const obtenerPerfil = async (req, res) => {
    try {

        const [usuarios] = await db.execute('SELECT id, usuario, rol FROM usuarios WHERE id = ?', [req.usuarios.id]);

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Usuario no he encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'perfil consultado correctamente',
            usuario: usuarios[0]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await db.execute('SELECT id, usuario, rol FROM usuarios');

        return res.status(200).json({
            mensaje: "usuarios consultados correctamente",
            usuarios
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = { registrarUsuario, login, obtenerPerfil, listarUsuarios };