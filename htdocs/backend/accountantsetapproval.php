<?php
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
$CustomerID = $_POST['CustomerID'];
$PropertyID = $_POST['PropertyID'];
$status = $_POST['ProjPageStatus'];

$todayDate = date("Y-m-d");

// Create the SQL query
$sql = "UPDATE customer_payment 
        SET ProjPageStatus = '$status', SoldDate = '$todayDate'
        WHERE CustomerID = '$CustomerID' AND PropertyID = '$PropertyID';";

// Execute the query
$result = mysqli_query($connectNow, $sql);

// Check if the query was successful
if ($result) {
    echo "Status updated successfully";
} else {
    echo "Error updating status: " . $connectNow->error;
}

// Close the database connection
mysqli_close($connectNow);
?>
