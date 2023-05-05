<?php
session_start();

$servername = "localhost"; // replace with your server name
$username = "blueducksuser"; // replace with your MySQL username
$password = "HL95#3#ZxTZ"; // replace with your MySQL password
$dbname = "blueducksdb"; // replace with your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>