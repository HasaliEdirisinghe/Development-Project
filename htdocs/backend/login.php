<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Get the password and username from the POST data and sanitize them to prevent SQL injection
$username = mysqli_real_escape_string($connectNow, $_POST['name']);
$password = mysqli_real_escape_string($connectNow, $_POST['password']);

// Create the SQL query
$sql_query = "SELECT * FROM user_login WHERE EmployeeID = '$username' AND Password = '$password'";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // If the query was successful, check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // If rows were returned, echo a success message
        echo "Login successful.";
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