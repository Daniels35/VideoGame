require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const router = Router();

let cache = null; 

// Obtengo las plataformas desde la API

router.get('/', async function (req, res) {
    try{
        if (!cache) {
            const platformsAPI = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
            cache = platformsAPI.data.results.map(p => p.name);
        }
        res.json(cache)
    } catch (err) {
        res.status(404).json({ err })
    }
})

module.exports = router;
