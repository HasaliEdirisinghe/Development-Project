<?php
    require 'connection.php';

    // Allow cross-origin requests
    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $projectname = mysqli_real_escape_string($connectNow, $_POST['projectname']);
    $propertytype = mysqli_real_escape_string($connectNow, $_POST['propertytype']);
    $location = mysqli_real_escape_string($connectNow, $_POST['location']);
    $district = mysqli_real_escape_string($connectNow, $_POST['district']);
    $address = mysqli_real_escape_string($connectNow, $_POST['address']);
    $lot_no = mysqli_real_escape_string($connectNow, $_POST['lot_no']);
    $plan_no = mysqli_real_escape_string($connectNow, $_POST['plan_no']);
    $size = mysqli_real_escape_string($connectNow, $_POST['size']);
    $price = mysqli_real_escape_string($connectNow, $_POST['price']);

    $total_price = (int)$price * (int)$size;
 

    // Create the SQL query
    $sql = "INSERT INTO property (ProjectName, PropertyType, Location, District, Address, LotNo,  PlanNo, Size, UnitPrice, TotalPrice) 
            VALUES (' $projectname', '$propertytype', '$location', '$district', '$address', '$lot_no', '$plan_no', '$size', '$price', '$total_price');";

    // Execute the query
    $result = mysqli_query($connectNow, $sql);

    // Check if the query was successful
    if ($result) {
            echo "Property Added";
        } else {
            echo "Error inserting data: " . $conn->error;
        }
    

    // Close the database connection
    mysqli_close($connectNow);
?>
