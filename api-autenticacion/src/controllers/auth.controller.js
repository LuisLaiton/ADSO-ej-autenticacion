const bcrypt = require('bcrypt');
const db = require('../config/db');

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

        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

module.exports = { registrarUsuario, login };