<?php

// Define MongoDB connection URL and database name
$url = 'mongodb://localhost:27017';
$dbName = 'myapp';

// Connect to mongdb.Seeing th comment don't judge i'm copying code.It's for my understanding.
$client = new Mongodb\Client($url);

// Get the "users" collection
$users = $client->selectCollection($dbName, 'users');

// Check if the signup form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the user data from the request body
  $userData = [
    'name' => $_POST['name'],
    'age' => $_POST['age'],
    'phone' => $_POST['phone']
  ];

  // Insert the new user
  $result = $users->insertOne($userData);

  if ($result->getInsertedCount() === 1) {
    echo 'User created successfully';
  } else {
    echo 'Failed to create user';
  }
}
?>