const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'customer',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Set up Express
app.use(bodyParser.urlencoded({ extended: true }));

// Set the views directory
app.set('views', __dirname);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define routes

// Homepage with search form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
// Handle form submission
app.post('/search', (req, res) => {
  // Query MySQL for all data from customer_table
  const query = 'SELECT * FROM customer_table';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Render the results page with the fetched data
    res.render('results', { results });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
