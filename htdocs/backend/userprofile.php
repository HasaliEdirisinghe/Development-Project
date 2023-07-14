<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

$id = mysqli_real_escape_string($connectNow, $_POST['id']);

$sql_query = "SELECT e.EmployeeID, e.EmployeeName, e.NIC, e.Designation, ul.Password FROM employee e, user_login ul WHERE e.EmployeeID = '$id' AND ul.EmployeeID = e.EmployeeID;";

// Execute the query
$result = mysqli_query($connectNow, $sql_query);

// Check if the query was successful
if ($result) {
    // If the query was successful, check if any rows were returned
    if (mysqli_num_rows($result) > 0) {
        // Fetch the first row from the result
        $row = mysqli_fetch_assoc($result);

        // Create an associative array to hold the specific details
        $details = array(
            'EmployeeID' => $row['EmployeeID'],
            'EmployeeName' => $row['EmployeeName'],
            'NIC' => $row['NIC'],
            'Designation' => $row['Designation'],
            'Password' => $row['Password'],
        );

        // Echo the details as JSON
        echo json_encode($details);
    } else {
        // If no rows were returned, echo an empty object
        echo json_encode((object) []);
    }
} else {
    // If the query failed, echo an error message
    echo "Error in query: " . mysqli_error($connectNow);
}

// Close the database connection
mysqli_close($connectNow);
?>
