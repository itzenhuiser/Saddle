require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  // host: '192.168.68.134',
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

app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error getting items');
    }
    else {
      res.status(200).send(results);
    }
  })
})


app.post('/updatePoints', (req, res) => {
  const { phoneNumber, totalDue } = req.body;
  console.log("Update Points called");

  // Look up the customer by phone number
  const query = 'SELECT points FROM Customers WHERE phone_number = ?';

  db.query(query, [phoneNumber], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error finding customer' });
    } else if (results.length > 0) {
      let currentPoints = results[0].points;
      let newPoints = currentPoints + Math.floor(totalDue); // Assuming $1 = 1 point

      const updateQuery = 'UPDATE Customers SET points = ? WHERE phone_number = ?';
      db.query(updateQuery, [newPoints, phoneNumber], (updateErr, updateResults) => {
        if (updateErr) {
          res.status(500).json({ message: 'Error updating points' });
        } else {
          res.status(200).json({ newPoints });
        }
      });
    } else {
      console.log(phoneNumber, "not found.");
      res.status(404).json({ message: 'Customer not found. Please sign up for rewards.' });
    }
  });
});

app.post('/createAccount', (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  const query = `INSERT INTO Customers (first_name, last_name, phone_number, points) VALUES (?, ?, ?, 100)`;

  db.query(query, [firstName, lastName, phoneNumber], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error creating new customer account' });
    } else {
      res.status(200).json({
        message: 'Customer account created successfully',
        firstName,
        lastName,
        phoneNumber,
      });
    }
  });
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));