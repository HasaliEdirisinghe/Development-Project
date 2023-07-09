<?php 

    header("Access-Control-Allow-Origin: *"); // Replace "*" with the domain of your Flutter web application for more restrictive access
    header("Access-Control-Allow-Methods: POST, OPTIONS"); // Specify the allowed HTTP methods
    header("Access-Control-Allow-Headers: Content-Type"); // Specify the allowed request headers

    $serverhost = "localhost:3307";
    $user = "saladmin";
    $password = "saladmin1";
    $database = "sal_bhoomi_database";

    $connectNow = new mysqli($serverhost, $user, $password, $database);

    if(!$connectNow)
	{
		echo json_encode("Connection Failed");
	}

?>