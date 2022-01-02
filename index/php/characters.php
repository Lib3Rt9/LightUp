<?php

if(isset($_POST['character_img_path'])){
    echo $_POST['player_name']."<br>";
    echo "<img src='../".$_POST['character_img_path']."'>";
}

?>