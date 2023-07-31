<?php
// Include the connection.php file to establish a database connection
require 'connection.php';

// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Query to fetch names of legal officers and directors from the employee table
$sql = "SELECT EmployeeName FROM employee WHERE Designation = 'Legal Officer' OR Designation = 'Director'";
$result = $db->query($sql);

// Check if the query was successful
if ($result) {
    $employees = array();
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row['EmployeeName'];
    }
    // Return the array of employee names as JSON response
    echo json_encode($employees);
} else {
    // Return an error response if the query fails
    echo json_encode(array('error' => 'Failed to fetch employees.'));
}

// Close the database connection
mysqli_close($connectNow);
?>