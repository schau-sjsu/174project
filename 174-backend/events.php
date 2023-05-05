<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];

// Prepare and execute the SQL query to select events from the database
$sql = "SELECT cid, title, duedate FROM calendar where username='$username'";
$result = $conn->query($sql);

// Fetch the events as an array of objects
$events = array();
while ($row = $result->fetch_assoc()) {
    $event = array(
        'id' => $row['cid'],
        'title' => $row['title'],
        'start' => $row['duedate']
    );
    array_push($events, $event);
}

// Encode the events as JSON and output them
header('Content-Type: application/json');
echo json_encode($events);

?>
