<?php
    require 'connection.php';

    // Allow cross-origin requests
    header('Access-Control-Allow-Origin: *');

    // Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
    $CustomerID = mysqli_real_escape_string($connectNow, $_POST['CustomerID']);
    $propertyID = mysqli_real_escape_string($connectNow, $_POST['propertyID']);
    $deedNo = mysqli_real_escape_string($connectNow, $_POST['deed_no']);
    $deedDate = mysqli_real_escape_string($connectNow, $_POST['deed_date']);
    $lawyer = mysqli_real_escape_string($connectNow, $_POST['Lawyer']);
    $director = mysqli_real_escape_string($connectNow, $_POST['Director']);


    // Create the SQL query
    $sql = "INSERT INTO deeds (PropertyID, DeedNo, SignedDate, Lawyer, Director) 
            VALUES ('$propertyID', '$deedNo', '$deedDate', '$lawyer', '$director');";

    // Execute the query
    $result = mysqli_query($connectNow, $sql);

    // Check if the query was successful
    if ($result) {
        $sql_query = "UPDATE customer_payment 
                      SET DeedStatus = 'Completed'
                      WHERE CustomerID = '$CustomerID' AND PropertyID = '$propertyID';";
        // Execute the query
        $result = mysqli_query($connectNow, $sql_query);
        if ($result) {
            echo "Status updated successfully";
        } else {
            echo "Error updating status: " . $connectNow->error;
        }
        
    } else {
        echo "Error inserting data: " . $conn->error;
    }
    

    // Close the database connection
    mysqli_close($connectNow);
?>
