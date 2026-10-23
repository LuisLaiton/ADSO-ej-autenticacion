const db = require('../config/db');

const autorizarRol = (...rolesPermitidos) => {
    return async (req, res, next) => {
        try {
            const [usuarios] = await db.execute('SELECT id, rol FROM usuarios WHERE id = ?', [req.usuarios.id]);

            if (usuarios.length === 0) {
                return res.status(401).json({
                    mensaje: 'El usuario ya no existe'
                });
            }

            const usuario = usuarios[0];

            if (!rolesPermitidos.includes(usuario.rol)) {
                return res.status(403).json({
                    mensaje: 'No tiene permisos para realizar esta operación'
                });
            }

            req.usuarios.rol = usuario.rol;

            next();
        } catch (error) {
            return res.status(500).json({
                mensaje: 'Error interno del servidor'
            });
        }
    };
};

module.exports = autorizarRol;