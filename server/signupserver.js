const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the signup page!');
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Insert user into the database
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      res.status(500).send('Error signing up');
      throw err;
    }
    res.status(200).send('Signed up successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
