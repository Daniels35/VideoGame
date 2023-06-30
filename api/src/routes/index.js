const { Router } = require('express');
const videogamesRoutes = require('./videogames.js');
const videogameIdRoutes = require('./videogameId.js');
const genresRoutes = require('./genres.js');
const createVideogameRoutes = require('./createVideogame.js');

const router = Router();

// TODOS LOS JUEGOS TAMBIEN POR NOMBRE
router.use('/videogames', videogamesRoutes);

// JUEGOS POR ID 
router.use('/videogames', videogameIdRoutes);

//CREAR LOS JUEGOS
router.use('/videogames', createVideogameRoutes);

// Busco todos los genres
router.use('/genres', genresRoutes);

module.exports = router;
