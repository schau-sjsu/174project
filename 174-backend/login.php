<?php
header('Content-Type: application/json');
session_start();
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    // Validate the user's input
    if (empty($email) || empty($password)) {
        $response = ['success' => false, 'message' => 'Please enter your email and password'];
        echo json_encode($response);
        exit;
    }

    // Check if the email and password combination is correct
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // Login successful
        $user = $result->fetch_assoc();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $response = ['success' => true];
        echo json_encode($response);
        exit;
    } else {
        // Login failed
        $response = ['success' => false, 'message' => 'Invalid email or password'];
        echo json_encode($response);
        exit;
    }
}
?>