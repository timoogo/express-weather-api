var express = require('express');
var router = express.Router();

let db = require('../db');
let weatherService = require('../service/weatherService');


/* GET home page. */

router.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await weatherService.getAllWeather();
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather Data' });
});

// get one weather data

router.get('/api/weather/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const weatherRecord = await weatherService.getWeatherById(id);
    res.json(weatherRecord);
  } catch (err) {
    res.status(404).json({ error: err.message, idMissing: id });
  }
});




router.post('/api/weather', async (req, res) => {
  const weatherData = req.body;

  try {
    await weatherService.addWeather(weatherData);
    res.json({ message: 'Weather data added successfully.', data: weatherData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/api/weather/:id', async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    await weatherService.updateWeatherById(id, newData);
    res.json({ message: 'Weather data updated successfully.', newData: newData });
  } catch (err) {
    res.status(500).json({ error: err.message, data: req.body });
  }
});

router.delete('/api/weather/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await weatherService.deleteWeatherById(id);
    res.json({ message: 'Weather data deleted successfully.', idDeleted: id });
  } catch (err) {
    res.status(500).json({ error: err.message, idMissing: id });
  }
});
module.exports = router;

