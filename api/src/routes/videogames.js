require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const { Videogame, Genre } = require('../db.js');

const router = Router();
const cache = {}; // Objeto para almacenar los datos en caché en memoria

// Query -> name ? db + api : 100 primeros juegos

router.get('/', async function (req, res) {
  const { name } = req.query;

  try {
    if (name) {
      const cacheKey = `game:${name}`;

      // Verificar si los datos están en caché
      if (cache[cacheKey]) {
        const gamesAPIFull = cache[cacheKey];
        res.json(gamesAPIFull);
        return;
      }

      let gamesDB = await Videogame.findOne({ where: { name: name }, include: [Genre] });
      if (gamesDB) {
        let X = gamesDB
        gamesDBFull = {
          id: X.id,
          name: X.name,
          image: X.image,
          rating: X.rating,
          source: "Created",
          genres: X.genres.map(p => p.name).join(', '),
        }
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        const combinedData = gamesAPIFull.concat(gamesDBFull);

        // Almacenar los datos en caché en memoria
        cache[cacheKey] = combinedData;
        res.json(combinedData);
      } else {
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        // Almacenar los datos en caché en memoria
        cache[cacheKey] = gamesAPIFull;
        res.json(gamesAPIFull);
      }
    } else {
      const cacheKey = 'games';

      // Verificar si los datos están en caché
      if (cache[cacheKey]) {
        const gamesResults = cache[cacheKey];
        res.json(gamesResults);
        return;
      }

      let gamesResults = [];
      let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let index = 0; index < 5; index++) {
        let games = (await axios.get(apiRAWG)).data
        let dataGame = games.results.map((G) => {
          var game = {
            name: G.name,
            image: G.background_image,
            genres: G.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
            source: "Api",
            id: G.id,
            rating: G.rating
          };
          return game
        })
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame)
      }

      let dbGames = await Videogame.findAll({ include: [Genre] })
      let jsonGames = dbGames.map((J) => J.toJSON())
      jsonGames.forEach(C => {
        C.source = "Created",
          C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
      });
      gamesResults = gamesResults.concat(jsonGames)

      // Almacenar los datos en caché en memoria
      cache[cacheKey] = gamesResults;
      res.json(gamesResults);
    }
  } catch (err) {
    res.status(404).json({ err })
  }
});

module.exports = router;
