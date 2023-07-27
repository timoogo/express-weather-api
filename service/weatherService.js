const db = require('../db');

// Function to retrieve all weather data from the database
async function getAllWeather() {
  try {
    const query = 'SELECT id, longitude, latitude, temperature, humidity, pressure, windSpeed, windDirection FROM weather';

    const [results, fields] = await db.query(query);

    return results;
  } catch (err) {
    console.error('Error executing the SQL query:', err.message);
    throw new Error('Failed to retrieve weather data.');
  }
}

async function getWeatherById(id) {
    try {
      console.log('Recherche de l\'enregistrement avec l\'ID :', id);
  
      const query = 'SELECT id, longitude, latitude, temperature, humidity, pressure, windSpeed, windDirection FROM weather WHERE id = ?';
      const [results, fields] = await db.query(query, [id]);
  
      console.log('Résultats de la requête :', results);
  
      if (results.length === 0) {
        throw new Error('Weather data not found.');
      }
  
      return results[0];
    } catch (err) {
      console.error('Error executing the SQL query:', err.message);
      throw new Error('Failed to retrieve weather data by id.');
    }
  }


  async function addWeather(weatherData) {
    try {
      const query = 'INSERT INTO weather SET ?';
      await db.query(query, [weatherData]);
    } catch (err) {
      console.error('Error executing the SQL query:', err.message);
      throw new Error('Failed to add weather data.');
    }
  }


  async function updateWeatherById(id, newData) {
    try {
      const query = 'UPDATE weather SET ? WHERE id = ?';
      await db.query(query, [newData, id]);
    } catch (err) {
      console.error('Error executing the SQL query:', err.message);
      throw new Error('Failed to update weather data.');
    }
  }
  async function deleteWeatherById(id) {
    try {
      const findQuery = 'SELECT * FROM weather WHERE id = ?';
      const [results, fields] = await db.query(findQuery, [id]);
  
      if (results.length === 0) {
        throw new Error('Weather data with the given ID does not exist.');
      }
  
      const deleteQuery = 'DELETE FROM weather WHERE id = ?';
      await db.query(deleteQuery, [id]);
    } catch (err) {
      console.error('Error executing the SQL query:', err.message);
      throw new Error('Failed to delete weather data.');
    }
  }
module.exports = {
  getAllWeather,
  getWeatherById,
  addWeather,
  updateWeatherById,
  deleteWeatherById
};
