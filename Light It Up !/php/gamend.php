<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "light_up";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM player WHERE ID = '".$_POST["get_id"]."'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
if ($row['HighestScore'] >= $_POST["finalScore"]) {
    $score = $row['HighestScore'];
} else {
    $score = $_POST["finalScore"];
}
$total = $_POST["finalScore"] + $row['TotalScore'];

$sql = "UPDATE player SET TotalScore = '".$total."', HighestScore = '".$score."' WHERE player.ID = ".$_POST["get_id"];

$conn->query($sql);

$conn->close();
header('Location: ../main.html?id='.$_POST['get_id']);


?>