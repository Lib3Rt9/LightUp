<?php

$_username = $_POST["username"];
$_password = $_POST["password"];


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
  $row = $result->fetch_assoc();
  $id = $row['ID'];
  $conn->close();
  header('Location: ../main.html?id='.$id);
} else {
  $conn->close();
  echo "<script>
alert('Wrong Username or Password');
window.location.href='../index.html';
</script>";
}

?>