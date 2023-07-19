<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

$id = mysqli_real_escape_string($connectNow, $_POST['cusid']);

$sql_query = "SELECT c.NIC, c.FirstName, c.LastName, c.PhoneNumber, p.Location, p.ProjectName, p.PropertyType, p.Address, p.LotNo, p.PlanNo, p.Size, p.UnitPrice, p.TotalPrice, cp.FinalValue, cp.ProjPageStatus, cp.DeedStatus  
            FROM customer_payment cp, property p, customer c 
            WHERE cp.CustomerId = '$id' AND cp.PropertyId = p.PropertyId AND cp.CustomerID = c.CustomerID;";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // If the query was successful, check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // Create an array to hold the property details
        $properties = array();

        // Loop through each row and add the details to the array
        while ($row = mysqli_fetch_assoc($result)) {
            $properties[] = $row;
        }

        // Echo the details as JSON
        echo json_encode($properties);
    } else {
        // If no rows were returned, echo an empty array
        echo json_encode([]);
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
