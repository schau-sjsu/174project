<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    // Validate the user's input
    if (empty($username) || empty($password)) {
        $response = ['success' => false, 'message' => 'Please enter your username and password'];
        echo json_encode($response);
        exit;
    }

    // Check if the username and password combination is correct
    $sql = "INSERT INTO users VALUES ('$username', '$password')";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        // Username is unique --> add the new user to the database
        $_SESSION['user_name'] = $username;
        $response = ['success' => true];
        echo json_encode($response);
        exit;
    } else {
        // Registration failed
        $response = ['success' => false, 'message' => 'Username is already taken'];
        echo json_encode($response);
        exit;
    }
}
?>