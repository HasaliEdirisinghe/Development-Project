<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve the customer data from the request
$id = mysqli_real_escape_string($connectNow, $_POST['id']);
$nic = mysqli_real_escape_string($connectNow, $_POST['nic']);
$firstName = mysqli_real_escape_string($connectNow, $_POST['fname']);
$lastName = mysqli_real_escape_string($connectNow, $_POST['lname']);
$otherNames = mysqli_real_escape_string($connectNow, $_POST['othernames']);
$address = mysqli_real_escape_string($connectNow, $_POST['address']);
$phoneNumber = mysqli_real_escape_string($connectNow, $_POST['phone']);

// Prepare the SQL statement to update the customer record
$sql_query = "UPDATE customer 
            SET NIC = '$nic', FirstName = '$firstName', LastName = '$lastName', OtherNames = '$otherNames', PermanentAddress = '$address', PhoneNumber = '$phoneNumber' 
            WHERE CustomerID = '$id'";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // Check if any rows were affected by the update
    if (mysqli_affected_rows($connectNow) > 0) {
        echo "Customer Updated";
    } else {
        echo "No rows were updated";
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
