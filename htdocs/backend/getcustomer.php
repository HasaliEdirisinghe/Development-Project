<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve the customer ID from the request
$id = mysqli_real_escape_string($connectNow, $_POST['id']);

// Prepare the SQL statement to fetch customer data
$sql_query = "SELECT * FROM customers WHERE CustomerID = '$id'";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // Check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // Fetch the customer data
        $customer = mysqli_fetch_assoc($result);
        
        // Convert the customer data to JSON format
        $customer_json = json_encode($customer);
        
        // Send the JSON response
        echo $customer_json;
    } else {
        echo "No customer found";
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
