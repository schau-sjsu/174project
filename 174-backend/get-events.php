<?php

// send response as JSON
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Define the path to the JSON file
$json_path = 'events.json';

// Function to read events from the JSON file
function read_events_from_file()
{
    global $json_path;
    $json_string = file_get_contents($json_path);
    return json_decode($json_string, true);
}

// Function to write events to the JSON file
function write_events_to_file($events)
{
    global $json_path;
    $json_string = json_encode($events);
    file_put_contents($json_path, $json_string);
}

// If the request is a GET request, return the events from the JSON file
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo json_encode(read_events_from_file());
}

// If the request is a POST request, add the event to the JSON file
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $event = json_decode(file_get_contents('php://input'), true);
    $events = read_events_from_file();
    $events[] = $event;
    write_events_to_file($events);
}

?>