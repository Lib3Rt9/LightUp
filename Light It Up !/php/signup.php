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
  echo "<script>
alert('Account Existed !');
window.location.href='../signup.html';
</script>";
} else {
  $sql = "INSERT INTO player (Username, Password, Nation)
  VALUES ('".$_username."', '".$_password."', '".$_nation."')";
  $conn->query($sql);
  $conn->close();
  header('Location: ../index.html');
};

?>