const validarAuth = (req, res, next) => {
    const { usuario, password } = req.body;

    if (typeof usuario !== 'string' || typeof password !== 'string' || !usuario.trim() || !password) {
        return res.status(400).json({
            mensaje: 'Debe enviar un usuario y una contraseña válidos'
        });
    }
    next();
};

module.exports = validarAuth;