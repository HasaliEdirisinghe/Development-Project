<?php
    require 'connection.php';

    // Allow cross-origin requests
    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $nic = mysqli_real_escape_string($connectNow, $_POST['nic']);
    $fname = mysqli_real_escape_string($connectNow, $_POST['fname']);
    $lname = mysqli_real_escape_string($connectNow, $_POST['lname']);
    $othernames = mysqli_real_escape_string($connectNow, $_POST['othernames']);
    $address = mysqli_real_escape_string($connectNow, $_POST['address']);
    $phone = mysqli_real_escape_string($connectNow, $_POST['phone']);
    $email = mysqli_real_escape_string($connectNow, $_POST['email']);


    // Create the SQL query
    $sql = "INSERT INTO customer (NIC, FirstName, LastName, OtherNames, PermanentAddress, PhoneNumber, email) 
            VALUES ('$nic', '$fname', '$lname', '$othernames', '$address', '$phone', '$email');";

    // Execute the query
    $result = mysqli_query($connectNow, $sql);

    // Check if the query was successful
    if ($result) {
            echo "Customer Added";
        } else {
            echo "Error inserting data: " . $conn->error;
        }
    

    // Close the database connection
    mysqli_close($connectNow);
?>
