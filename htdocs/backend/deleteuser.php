<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve the customer data from the request
$id = mysqli_real_escape_string($connectNow, $_POST['EmployeeID']);

// Prepare the SQL statement to delete the employee from user_login and employee table
$sql = "DELETE ul, emp FROM user_login as ul
        LEFT JOIN employee as emp ON ul.EmployeeID = emp.EmployeeID
        WHERE ul.EmployeeID = '$id' AND emp.Status = 'Inactive'";

// Execute the delete query
$result = mysqli_query($connectNow, $sql);

// Check if the query was successful
if ($result) {
    // Check if any rows were affected by the delete
    if (mysqli_affected_rows($connectNow) > 0) {
        // Employee was successfully deleted
        echo "Employee Deleted";
    } else {
        // No matching employee found with the given EmployeeID in both tables
        echo "None deleted";
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
