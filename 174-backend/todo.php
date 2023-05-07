<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];

    if (empty($username)) {
        $response = ['success' => false, 'message' => 'Please log in'];
        echo json_encode($response);
        exit;
    }

    //Insert dummy data
    // $insertSql = "INSERT INTO tasks (tid, username, description, duedate) VALUES (1, 'bobby', 'hello test', '2023-13-05')";
    // $insertRes = $conn->query($insertSql);

    // Query database for users
    header('Content-Type: application/json');
    $sqlSel = "SELECT tid, username, description, duedate FROM tasks WHERE username = '$username' ORDER BY duedate ASC";
    $result = $conn->query($sqlSel);

    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);

    // if ($result) {
    //     while ($row = mysqli_fetch_assoc($result)) {
    //         $data[] = $row;
    //     }
    // }
    // else {
    //     echo "Error in query:";
    // }


    

    // Initialize empty array to store user data
    // $data = array();

    // Loop through result set and add each user to the data array
    // while ($row = mysqli_fetch_assoc($result)) {
    //     $data[] = $row;
    // }

    // Return data as JSON object
    // echo json_encode($data);
}

?>
