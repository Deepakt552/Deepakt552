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
    
    // Prepare email body HTML
    $email_body = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2c7a7b; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .info { margin-bottom: 20px; }
            .label { font-weight: bold; }
            .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2c7a7b; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Contact Form Submission</h2>
            <div class='info'>
                <p><span class='label'>Name:</span> $name</p>
                <p><span class='label'>Email:</span> $email</p>
                <p><span class='label'>Subject:</span> $subject</p>
                <p><span class='label'>Message:</span></p>
                <div class='message'>$message</div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Create email headers
    $headers = "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Set additional mail parameters (can help with deliverability)
    $additional_params = "-f deepakt552@gmail.com";
    
    // Attempt to send email
    $success = mail($to, $email_subject, $email_body, $headers, $additional_params);
    
    // Return JSON response
    if ($success) {
        echo json_encode([
            "success" => true, 
            "message" => "Message sent successfully! I'll get back to you soon."
        ]);
    } else {
        // Log error for debugging
        error_log("Mail sending failed. To: $to, Subject: $email_subject");
        
        echo json_encode([
            "success" => false, 
            "message" => "Failed to send message. Please try contacting me directly at deepakt552@gmail.com"
        ]);
    }
    
    exit;
}
?> 