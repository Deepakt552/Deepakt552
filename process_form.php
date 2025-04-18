<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Path to PHPMailer autoload.php from Composer
    require 'vendor/autoload.php';
    
    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                 // Gmail SMTP server
        $mail->SMTPAuth   = true;                             // Enable SMTP authentication
        $mail->Username   = 'hanutechx@gmail.com';           // SMTP username (your Gmail)
        $mail->Password   = 'vasiqobaqqmessoy';              // SMTP password (use app password, not regular password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // Enable TLS encryption
        $mail->Port       = 587;                              // TCP port to connect to
        
        // Recipients
        $mail->setFrom('hanutechx@gmail.com', 'Portfolio Contact Form');
        $mail->addAddress('deepakt552@gmail.com');           // Add recipient
        $mail->addReplyTo($email, $name);                    // Add reply-to address
        
        // Content
        $mail->isHTML(true);                                 // Set email format to HTML
        $mail->Subject = "Contact Form: $subject";
        
        // Email body
        $html_body = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong></p>
        <p>$message</p>
        ";
        
        $text_body = "You have received a new message from your website contact form.\n\n";
        $text_body .= "Name: $name\n";
        $text_body .= "Email: $email\n";
        $text_body .= "Subject: $subject\n";
        $text_body .= "Message:\n$message\n";
        
        $mail->Body    = $html_body;
        $mail->AltBody = $text_body;
        
        // Send the email
        $mail->send();
        echo json_encode(["success" => true, "message" => "Message sent successfully"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Failed to send message. Error: {$mail->ErrorInfo}"]);
    }
    exit;
}
?> 