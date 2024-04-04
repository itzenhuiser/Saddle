require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: '10.176.17.145',
  user: 'root',
  password: 'password',
  database: 'saddle_pos_system'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL Server');
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function to pull all data from the Company table
const getAllCompanies = () => {
  const query = 'SELECT * FROM Company';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from Company table:', err);
      return;
    }
    console.log('All companies:', results);
  });
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM Company WHERE company_username = ? AND company_password = ?';
    
    db.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).send('Error logging in the user');
      } else {
        if (results.length > 0) {
          res.status(200).send('Login successful');
          console.log('User is logged in');

        } else {
          res.status(401).send('Invalid username or password');
        }
      }
    });
  });
