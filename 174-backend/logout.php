<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Unset all session variables
session_unset();

// Destroy the session
session_destroy();

// Create a success response
$response = array(
  'success' => true,
  'message' => 'User logged out'
);

// Set the response header to JSON
header('Content-Type: application/json');

// Encode the response array as JSON and echo it back to the client
echo json_encode($response);
?>
