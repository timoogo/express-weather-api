const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2/promise'); // Import the promise-based version of mysql2
const indexRouter = require('./routes/index');
const routes = require('express-list-endpoints');
const crypto = require('crypto');

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

async function checkApiKey(req, res, next) {
  // Check if API key is present in request
  let apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    // API key is missing
    return res.status(401).json({ error: 'API key is missing' });
  }

  try {
    // Connect to the database using promise-based mysql2
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'weatherDB'
    });

    // Check if API key is valid
    const [rows] = await connection.execute('SELECT * FROM apikey_table WHERE api_key = ?', [apiKey]);

    if (rows.length === 0) {
      // API key is invalid
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // API key is valid, pass control to the next middleware
    next();

    // Close the database connection
    connection.end();
  } catch (err) {
    console.error('Error checking API key:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate-api-key', async (req, res) => {
  // Generate new API key
  let apiKey = generateApiKey();
  // Connect to MySQL
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'weatherDB'
  });

  try {
    // Add new API key with expiration date to table
    await connection.execute('INSERT INTO apikey_table (api_key, expires) VALUES (?, ?)', [apiKey, Date.now() + 86400000]);
    // Close the database connection
    connection.end();

    // Return new API key in response
    res.json({ apiKey: apiKey });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to insert API key' });
  }
});

app.use(checkApiKey);

app.use('/', indexRouter);

// log all available routes
console.log(routes(app));

module.exports = app;
