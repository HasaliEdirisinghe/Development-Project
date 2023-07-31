<?php
require 'connection.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    $mail = new PHPMailer(true);


// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');

// Retrieve data from the form from the POST data and sanitize them to prevent SQL injection
$CustomerID = $_POST['CustomerID'];
$PropertyID = $_POST['PropertyID'];
$status = $_POST['DeedStatus'];
$email = $_POST['email'];


// Create the SQL query
$sql = "UPDATE customer_payment 
        SET DeedStatus = '$status'
        WHERE CustomerID = '$CustomerID' AND PropertyID = '$PropertyID';";

// Execute the query
$result = mysqli_query($connectNow, $sql);

// Check if the query was successful
if ($result) {
    if($status == 'Waiting to Sign'){
        try {
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'sal.emails.bhoomi@gmail.com';                     //SMTP username
            $mail->Password   = 'arrlfkmreeqgahuo';                               //SMTP password
            $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('sal.emails.bhoomi@gmail.com');
            $mail->addAddress($email);     //Add a recipient
            
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Deed is waiting to be signed';
            $mail->Body    = "Dear Sir/Madam, <br/>Your deed is ready to be signed. Please contact the Legal Department on 011 2075075 <br/><br/>Regards, <br/>Team Bhoomi";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            $mail->send();
            // echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    echo "Status updated successfully";
} else {
    echo "Error updating status: " . $connectNow->error;
}

// Close the database connection
mysqli_close($connectNow);
?>
