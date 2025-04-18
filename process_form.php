<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Email details
    $to = "deepakt552@gmail.com";
    $email_subject = "Contact Form: $subject";
    
    // Email body
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send the email
    if(mail($to, $email_subject, $email_body, $headers)) {
        // Success response
        echo json_encode(["success" => true, "message" => "Message sent successfully"]);
    } else {
        // Error response
        echo json_encode(["success" => false, "message" => "Failed to send message"]);
    }
    exit;
}
?> 