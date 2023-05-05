<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Establish database connection
$servername = "localhost"; 
$username = "blueducksuser";
$password = "HL95#3#ZxTZ"; 
$dbname = "blueducksdb"; 
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// get current user from session and update sql statement to filter by username
$currentuser = $_SESSION["username"];


// Query database for users
$sql = "SELECT tid, username, description, duedate FROM tasks";
$result = mysqli_query($conn, $sql);

// Initialize empty array to store user data
$data = array();

// Loop through result set and add each user to the data array
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Close database connection
mysqli_close($conn);

// Return data as JSON object
header('Content-Type: application/json');
echo json_encode($data);

?>
