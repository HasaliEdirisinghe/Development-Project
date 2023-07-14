<?php
    require 'connection.php';

    // Allow cross-origin requests
    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $empid = mysqli_real_escape_string($connectNow, $_POST['empid']);
    $nic = mysqli_real_escape_string($connectNow, $_POST['nic']);
    $name = mysqli_real_escape_string($connectNow, $_POST['name']);
    $designation = mysqli_real_escape_string($connectNow, $_POST['designation']);
    $temp_pwd = mysqli_real_escape_string($connectNow, $_POST['temp_pwd']);

    // Create the SQL query
    $sql = "INSERT INTO employee (EmployeeID, NIC, EmployeeName, Designation)
    VALUES ('$empid', '$nic', '$name', '$designation');";
    $sql_pwd = "INSERT INTO user_login (EmployeeID, Password)
    VALUES ('$empid', '$temp_pwd');";

    
    // Execute the query
    $result = mysqli_query($connectNow, $sql);

    // Check if the query was successful
    if ($result) {
            echo "User Added";
            $result2 = mysqli_query($connectNow, $sql_pwd);
        } else {
            echo "Error inserting data: " . $conn->error;
        }
    

    // Close the database connection
    mysqli_close($connectNow);
?>
