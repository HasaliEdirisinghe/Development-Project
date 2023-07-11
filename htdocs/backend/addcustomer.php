<?php
    require 'connection.php';

    // // Retrieve data from the form
    // $nic = $_POST['nic'];
    // $fname = $_POST['fname'];
    // $lname = $_POST['lname'];
    // $othernames = $_POST['other'];
    // $address = $_POST['address'];
    // $phone = $_POST['phone'];

    // // Prepare the SQL statement
    // $sql = "INSERT INTO customer (NIC, FirstName, LastName, OtherName, PermenantAddress, PhoneNumber) VALUES ('$nic', '$fname', '$lname', '$othernames', '$address', '$phone')";

    // // Execute the SQL statement
    // if ($conn->query($sql) === TRUE) {
    //     echo "Customer Added";
    // } else {
    //     echo "Error inserting data: " . $conn->error;
    // }

    // // Close the database connection
    // $conn->close();

    // Allow cross-origin requests
    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $nic = mysqli_real_escape_string($connectNow, $_POST['nic']);
    $fname = mysqli_real_escape_string($connectNow, $_POST['fname']);
    $lname = mysqli_real_escape_string($connectNow, $_POST['lname']);
    $othernames = mysqli_real_escape_string($connectNow, $_POST['othernames']);
    $address = mysqli_real_escape_string($connectNow, $_POST['address']);
    $phone = mysqli_real_escape_string($connectNow, $_POST['phone']);

    // Create the SQL query
    $sql = "INSERT INTO customer (NIC, FirstName, LastName, OtherNames, PermanentAddress, PhoneNumber) VALUES ('$nic', '$fname', '$lname', '$othernames', '$address', '$phone');";

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
