const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API funcionando correctamente'
    })
})

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});