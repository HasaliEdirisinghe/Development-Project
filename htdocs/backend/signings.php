<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// $sql_query = "SELECT * FROM deeds;";

$sql_query = "SELECT p.PropertyID, p.ProjectName, p.LotNo, 
            c.FirstName, c.LastName, 
            FORMAT(cp.FinalValue, 'N', 'en-US') AS FinalValue, 
            d.SignedDate, d.Lawyer, d.Director 
            FROM property p, customer c, customer_payment cp, deeds d 
            WHERE d.PropertyID = p.PropertyID AND d.PropertyID = cp.PropertyID AND cp.CustomerID = c.CustomerID;";
            

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
