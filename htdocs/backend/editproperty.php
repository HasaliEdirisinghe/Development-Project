<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve the customer data from the request
$id = mysqli_real_escape_string($connectNow, $_POST['id']);
$propertytype = mysqli_real_escape_string($connectNow, $_POST['propertytype']);
$projectname = mysqli_real_escape_string($connectNow, $_POST['projectname']);
$location = mysqli_real_escape_string($connectNow, $_POST['location']);
$district = mysqli_real_escape_string($connectNow, $_POST['district']);
$address = mysqli_real_escape_string($connectNow, $_POST['address']);
$lot_no = mysqli_real_escape_string($connectNow, $_POST['lot_no']);
$plan_no = mysqli_real_escape_string($connectNow, $_POST['plan_no']);
$size = mysqli_real_escape_string($connectNow, $_POST['size']);
$price = mysqli_real_escape_string($connectNow, $_POST['price']);

$total_price = (int)$price*(int)$size;

// Prepare the SQL statement to update the customer record
$sql_query = "UPDATE property 
            SET PropertyType = '$propertytype', ProjectName = '$projectname', Location = '$location', District = '$district', Address = '$address', LotNo = '$lot_no',  Size = '$size', UnitPrice = '$price', TotalPrice = '$total_price'
            WHERE PropertyID = '$id';";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // Check if any rows were affected by the update
    if (mysqli_affected_rows($connectNow) > 0) {
        echo "Property Updated";
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
