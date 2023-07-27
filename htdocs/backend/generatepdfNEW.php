<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

$month = mysqli_real_escape_string($connectNow, $_POST['month']);
$year = mysqli_real_escape_string($connectNow, $_POST['year']);
$projectname = mysqli_real_escape_string($connectNow, $_POST['projectname']);


// Check if the provided year and month are valid
// if (!is_numeric($month) || !is_numeric($year) || $month < 1 || $month > 12) {
//     echo "Invalid month or year";
//     exit();
// }

// Create a date string with the format 'YYYY-MM' to use in the SQL query
$dateString = $year . '-' .$month;

$sql_query = "SELECT * FROM customer c, property p, customer_payment cp 
            WHERE c.CustomerID = cp.CustomerID AND p.PropertyID = cp.PropertyID 
            AND cp.SoldDate IS NOT NULL
            AND DATE_FORMAT(cp.SoldDate, '%Y-%m') = '$dateString'
            AND p.ProjectName = '$projectname';";
 

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
