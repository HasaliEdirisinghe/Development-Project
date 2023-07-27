<?php
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
$CusID = (int)$_POST['CusID'];
$PropID = (int)$_POST['PropID'];
$Discount = (float)$_POST['Discount'];
$OtherCharges = (float)$_POST['OtherCharges'];
$total_price = (float)$_POST['total_price'];

$final_value = $total_price - $Discount + $OtherCharges;

// Create the SQL query
$sql = "INSERT INTO customer_payment (CustomerID, PropertyID, Discount, OtherCharges, FinalValue) 
        VALUES ('$CusID', '$PropID', '$Discount', '$OtherCharges', '$final_value');";

// Execute the query
$result = mysqli_query($connectNow, $sql);

// Check if the query was successful
if ($result) {
    echo "Property Assigned";
} else {
    echo "Error inserting data: " . $connectNow->error;
}

// Close the database connection
mysqli_close($connectNow);
?>
