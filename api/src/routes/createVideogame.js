const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();

// Creo el videojuego en la db

router.post('/', async (req, res) => {
  const { name, description, image, released, rating, platforms, genres } = req.body;

  let platformString = platforms.join(', ')

  let gameCreated = await Videogame.create({
    name,
    description,
    image, 
    released,
    rating,
    platforms: platformString,
  })

  let genrePromises = genres.map(async (G) => {
    let genresGame = await Genre.findOne({ where: { name: G } })
    return gameCreated.addGenre(genresGame)
  });
  await Promise.all(genrePromises);

  res.json({ message: `Videogame created successfully! ID: ${gameCreated.id}`, game: gameCreated });

});

module.exports = router;