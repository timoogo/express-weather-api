const db = require('./db');
const mysql2 = require('mysql2/promise');


async function createTables() {
  const createApiKeyTableQuery = `
    CREATE TABLE if not exists apikey_table (
      id INT AUTO_INCREMENT PRIMARY KEY,
      api_key VARCHAR(255) NOT NULL,
      expires BIGINT NOT NULL
    );
  `;

  const createWeatherTableQuery = `
    CREATE TABLE if not exists weather (
      id INT AUTO_INCREMENT PRIMARY KEY,
      longitude FLOAT NOT NULL,
      latitude FLOAT NOT NULL,
      temperature FLOAT NOT NULL,
      humidity FLOAT NOT NULL,
      pressure FLOAT NOT NULL,
      windSpeed FLOAT NOT NULL,
      windDirection FLOAT NOT NULL
    );
  `;

  try {
    const connection = await db.getConnection();

    // Create the apikey_table
    await connection.query(createApiKeyTableQuery);
    console.log('Table "apikey_table" created successfully.');

    // Create the weather table
    await connection.query(createWeatherTableQuery);
    console.log('Table "weather" created successfully.');

    connection.release();
    connection.destroy();
  } catch (err) {
    console.error('Error creating tables:', err.message);
  }
}

// Call the function to create both tables
createTables();
