const db = require('./db');


const createTableQuery = `
CREATE TABLE weather (
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


async function createTable() {
  try {
    const connection = await db.getConnection();
    await connection.query(createTableQuery);
    console.log('Table "weather" created successfully.');
    connection.release();
  } catch (err) {
    console.error('Error creating table:', err.message);
  }
}
createTable();

