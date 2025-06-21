require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const userRoutes = require('./src/routes/userRoutes.js');
const pokemonRoutes = require('./src/routes/pokemonRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/pokemon', pokemonRoutes);

// Middleware para manejo de errores simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
});
