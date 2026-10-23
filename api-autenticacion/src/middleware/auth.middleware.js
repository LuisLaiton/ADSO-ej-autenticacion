const jwt = require('jsonwebtoken');

require('dotenv').config();

const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'Se requiere autenticación'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const datosToken = jwt.verify(token, process.env.JWT_SECRET);

        req.usuarios = {id: datosToken.id };

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: 'Toquen inválido o expirado'
        });
    }
};

module.exports = verificarToken;