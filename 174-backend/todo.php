<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];

    if (empty($username)) {
        $response = ['success' => false, 'message' => 'Please log in'];
        echo json_encode($response);
        exit;
    }

    // Query database for users
    $sql = "SELECT tid, username, description, duedate FROM tasks where username='$username'";
    $result = mysqli_query($conn, $sql);

    // Initialize empty array to store user data
    $data = array();

    // Loop through result set and add each user to the data array
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Return data as JSON object
    header('Content-Type: application/json');
    echo json_encode($data);
}

?>
