<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// $sql_query = "SELECT * FROM customer c, property p, customer_payment cp WHERE c.CustomerID = cp.CustomerID AND p.PropertyID = cp.PropertyID";
$sql_query = "SELECT c.CustomerID, c.NIC, c.FirstName, c.LastName, c.OtherNames, c.PermanentAddress, c.PhoneNumber, 
            p.PropertyID, p.PropertyType, p.ProjectName, p.Location, p.District, p.Address, p.LotNo, p.BedRooms, p.PlanNo, p.Size, 
            FORMAT(p.UnitPrice, 'N', 'en-US') AS UnitPrice, 
            FORMAT(p.TotalPrice, 'N', 'en-US') AS TotalPrice, 
            cp.Discount, cp.OtherCharges, 
            FORMAT(cp.FinalValue, 'N', 'en-US') AS FinalValue, 
            cp.ProjPageStatus, cp.SoldDate, cp.DeedStatus 
            FROM customer c 
            JOIN customer_payment cp ON c.CustomerID = cp.CustomerID 
            JOIN property p ON p.PropertyID = cp.PropertyID;";


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
