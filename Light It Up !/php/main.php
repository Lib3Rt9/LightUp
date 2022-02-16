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

$sql = "SELECT * FROM player ORDER BY TotalScore, HighestScore DESC limit 9";
$result = $conn->query($sql);
$i = 0;
while($row = $result->fetch_assoc()) {
    $ulist[$i] = $row["Username"];
    $tlist[$i] = $row["TotalScore"];
    $hlist[$i] = $row["HighestScore"];
    $nlist[$i] = $row["Nation"];
    $i++;
}
$lists = array($ulist,$tlist,$hlist,$nlist);
$disabled = "disabled";

if ($_GET) {

    $id = $_GET["id"];
    $sql = "SELECT * FROM player WHERE ID = '".$id."'";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
    $u = $row['Username'];
    $h = $row['HighestScore'];
    $t = $row['TotalScore'];
    $n = $row['Nation'];
}

$conn->close();

?>