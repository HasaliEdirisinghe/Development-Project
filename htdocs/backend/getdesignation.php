<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Get the username from the POST data and sanitize it to prevent SQL injection
$username = mysqli_real_escape_string($connectNow, $_POST['name']);

// Create the SQL query to retrieve the designation
$sql_query = "SELECT Designation FROM employee WHERE EmployeeID = '$username';";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // If the query was successful, check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // Fetch the first row from the result
        $row = mysqli_fetch_assoc($result);

        // Echo the designation as a response
        echo $row['Designation'];
    } else {
        // If no rows were returned, echo an error message
        echo "Invalid username.";
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
