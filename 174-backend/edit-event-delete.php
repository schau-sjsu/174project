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
    $title = $data['title'];

    // Check if the username and password combination is correct
    $sql = "DELETE from calendar WHERE username='$username' AND title='$title'";
    $result = $conn->query($sql);

    if ($result === TRUE) {
        // Username is unique --> add the new user to the database
        $response = ['success' => true];
        echo json_encode($response);
        exit;
    } else {
        // Registration failed
        $response = ['success' => false, 'message' => 'Delete event unsuccessful'];
        echo json_encode($response);
        exit;
    }
}
?>