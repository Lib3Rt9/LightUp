<?php

$_username = $_POST["username"];
$_password = $_POST["password"];
$temp = explode("/", $_POST["nation"]);
$_nation = end($temp);

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

$sql = "SELECT * FROM player WHERE Username = '".$_username."' AND Password = '".$_password."'" ;
$result = $conn->query($sql);

if ($result->num_rows == 1) {
  $conn->close();
  echo "<script>alert('Account Existed !');
  window.location.href='../modify.html?id=' + ";
  echo json_encode($_POST['get_id']);
  echo ";</script>";
} else {

  $sql = "UPDATE player SET Username = '".$_username."', Password = '".$_password."', Nation = '".$_nation."' WHERE player.ID = ".$_POST["get_id"];

  $conn->query($sql);
  
  $conn->close();
  header('Location: ../main.html?id='.$_POST['get_id']);
};


?>