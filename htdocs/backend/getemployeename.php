<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

$id = mysqli_real_escape_string($connectNow, $_POST['id']);

$sql_query = "SELECT EmployeeName FROM employee WHERE EmployeeID = '$id'";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // If the query was successful, check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // If rows were returned, echo the username
        $row = mysqli_fetch_assoc($result);
        $username = $row['EmployeeName'];
        echo $username;
    } else {
        // If no rows were returned, echo an invalid credentials message
        echo "Invalid credentials.";
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>