<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the user is logged in
if (isset($_SESSION['user_name'])) {
  // Get the current user's information from the session
  $username = $_SESSION['user_name'];

  // Create an associative array with the user information
  $user = array(
    'username' => $username
  );

  // Set the response header to JSON
  header('Content-Type: application/json');

  // Encode the user array as JSON and echo it back to the client
  echo json_encode($user);
} else {
  // If the user is not logged in, return an error response
  $response = array(
    'success' => false,
    'message' => 'User not logged in'
  );

  // Set the response header to JSON
  header('Content-Type: application/json');

  // Encode the error response as JSON and echo it back to the client
  echo json_encode($response);
}
?>
