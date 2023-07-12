<?php
    require 'connection.php';

    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $price_per_unit = mysqli_real_escape_string($connectNow, $_POST['ppu']);
    $basic_property_value = mysqli_real_escape_string($connectNow, $_POST['basic']);
    $discount = mysqli_real_escape_string($connectNow, $_POST['discount']);
    $other_charges = mysqli_real_escape_string($connectNow, $_POST['othercharges']);


    $final_value = $price_per_unit*

    // Create the SQL query
    $sql = "INSERT INTO payment (NIC, FirstName, LastName, OtherNames, PermanentAddress, PhoneNumber) VALUES ('$nic', '$fname', '$lname', '$othernames', '$address', '$phone');";

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
