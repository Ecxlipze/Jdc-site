<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $fullname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $city = trim($_POST['city'] ?? '');
    $dob = trim($_POST['dob'] ?? '');
    $gender = trim($_POST['gender'] ?? '');
    $availability = trim($_POST['availability'] ?? '');
    $experience = trim($_POST['experience'] ?? '');
    $skills = trim($_POST['skills'] ?? '');
    $interest = $_POST['interest'] ?? [];

    if (
        empty($fullname) ||
        empty($email) ||
        empty($phone) ||
        !preg_match("/^[A-Za-z\s]+$/", $fullname) ||
        !preg_match("/^[0-9]+$/", $phone)
    ) {
        echo json_encode(["status"=>"error","message"=>"Invalid input"]);
        exit;
    }

    $interestList = !empty($interest) ? implode(', ', $interest) : 'None';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'hammadsyed1999@gmail.com';
        $mail->Password = 'idnhlvwdllzurnei';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('hammadsyed1999@gmail.com', 'Volunteer Form');
        $mail->addAddress('hammadsyed1999@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = 'New Volunteer Registration';
        $mail->Body = "
          <h3>Volunteer Details</h3>
          <p><b>Name:</b> $fullname</p>
          <p><b>Email:</b> $email</p>
          <p><b>Phone:</b> $phone</p>
          <p><b>City:</b> $city</p>
          <p><b>DOB:</b> $dob</p>
          <p><b>Gender:</b> $gender</p>
          <p><b>Availability:</b> $availability</p>
          <p><b>Interest:</b> $interestList</p>
          <p><b>Experience:</b> $experience</p>
          <p><b>Skills:</b> $skills</p>
        ";

        $mail->send();

        echo json_encode(["status"=>"success","message"=>"Form submitted successfully"]);

    } catch (Exception $e) {
        echo json_encode(["status"=>"error","message"=>$mail->ErrorInfo]);
    }
}
?>
