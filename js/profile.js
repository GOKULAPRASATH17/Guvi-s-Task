// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');


const app = express();

// Set up middleware to parse incoming request bodies
app.use(bodyParser.json());

// Define MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'myapp';


app.post('/profile', (req, res) => {
  // Get the user data from the request body
  const userData = req.body;

  // Connect to MongoDB and insert the new user
  mongodb.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      res.status(500).json({ message: 'Failed to connect to database' });
      return;
    }

    const db = client.db(dbName);
    const users = db.collection('profile');

    users.insertOne(userData, (err, result) => {
      if (err) {
        console.error('Failed to insert user into MongoDB:', err);
        res.status(500).json({ message: 'Failed to create user' });
        return;
      }

      console.log('Created new user:', result.ops[0]);
      res.status(200).json({ message: 'User created successfully' });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});