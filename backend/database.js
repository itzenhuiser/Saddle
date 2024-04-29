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

  app.post('/updateinventory', (req, res) => {
    const cartData = req.body;
    // Iterate over each item in the cart and update the item_quantity in the database
    Object.keys(cartData).forEach(itemName => {
      const quantity = cartData[itemName].quantity;
      
      const updateQuery = 'UPDATE items SET item_quantity = item_quantity - ? WHERE item_name = ?';
      
      db.query(updateQuery, [quantity, itemName], (err, results) => {
        if (err) {
          console.error('Error updating item quantity for:', itemName, err);
        }
      });
    });
  
    res.status(200).send('Inventory updated successfully');
  });

app.post('/removeitem', (req, res) => {
  const { itemName } = req.body;

  const deleteQuery = 'DELETE FROM items WHERE item_name = ?';

  db.query(deleteQuery, [itemName], (err, results) => {
    if (err) {
      console.error('Error removing item:', itemName, err);
      res.status(500).send('Error removing item from inventory');
    } else {
      console.log('Item removed successfully:', itemName);
      res.status(200).send('Item removed from inventory');
    }
  });
});

app.post('/additem', (req, res) => {
  const { itemName, itemPrice, itemQuantity, itemDescription, itemImage } = req.body;

  const insertQuery = 'INSERT INTO items (item_name, item_price, item_quantity, item_description, image_picture) VALUES (?, ?, ?, ?, ?)';

  db.query(insertQuery, [itemName, itemPrice, itemQuantity, itemDescription, itemImage], (err, results) => {
    if (err) {
      console.error('Error adding item:', itemName, err);
      res.status(500).send('Error adding item to inventory');
    } else {
      console.log('Item added successfully:', itemName);
      res.status(200).send('Item added to inventory');
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

app.get('/itemsavailible', (req, res) => {
  const query = 'SELECT * FROM items WHERE item_quantity <> 0';

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

app.post('/redeemPoints', (req, res) => {
  const { phoneNumber, pointsToRedeem } = req.body;

  const getPointsQuery = 'SELECT points FROM Customers WHERE phone_number = ?';

  db.query(getPointsQuery, [phoneNumber], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error finding customer' });
    }

    if (results.length > 0) {
      let currentPoints = results[0].points;
      if (currentPoints >= pointsToRedeem) {
        let newPoints = currentPoints - pointsToRedeem;

        const updatePointsQuery = 'UPDATE Customers SET points = ? WHERE phone_number = ?';
        db.query(updatePointsQuery, [newPoints, phoneNumber], (updateErr, updateResults) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Error updating points' });
          } else {
            return res.status(200).json({ message: 'Points redeemed successfully', newTotalDue: req.body.totalDue - 5 });
          }
        });
      } else {
        return res.status(400).json({ message: 'Not enough points to redeem' });
      }
    } else {
      return res.status(404).json({ message: 'Customer not found. Please sign up for rewards.' });
    }
  });
});


app.post('/createAccount', (req, res) => {

  const query = 'INSERT INTO Customers (first_name, last_name, phone_number, points) VALUES (?, ?, ?, ?)';

  db.query(query, [req.body.first_name, req.body.last_name, req.body.phone_number, 100], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error creating new customer account' });
    } else {
      res.status(200).json({
        message: 'Customer account created successfully'
      });
    }
  });
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));