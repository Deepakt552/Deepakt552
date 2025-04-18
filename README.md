# 🌟 Deepak Tiwari | Full Stack Developer

[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white)](https://laravel.com/)

I build exceptional and accessible digital experiences for the web.

## 🚀 About Me

I'm a passionate full stack web developer with expertise in modern JavaScript frameworks and PHP backends. My core technical skills include React.js, Laravel, MongoDB, Express.js, and Inertia.js, allowing me to build complete web applications from front to back.

I specialize in creating responsive single-page applications with React.js, building robust backends with Laravel, and implementing NoSQL database solutions with MongoDB. I'm also experienced with WordPress development and version control using GitHub. When I'm not coding, you can find me exploring new technologies and contributing to open-source projects.

## 💻 Technical Skills

### Frontend Development
- **React.js** - Component architecture, hooks, Redux & Context API for state management
- **Inertia.js** - Single-page app development, server-side routing
- **HTML5** - Semantic markup, accessibility standards (WCAG)
- **CSS3/Tailwind** - Responsive design, animations, modern layouts

### Backend Development
- **Laravel** - MVC architecture, Eloquent ORM, RESTful API development
- **Express.js** - RESTful API design, middleware implementation, authentication systems
- **WordPress** - Theme development, custom plugins, WooCommerce integration

### Database & Tools
- **MongoDB** - Schema design, indexing, aggregation pipelines
- **MySQL** - Relational database design and optimization
- **GitHub** - Version control, collaborative workflows, CI/CD integration

## 🏆 Featured Projects

### Leasing Portal
A comprehensive leasing management platform for Excel Residential with Flutter mobile integration, allowing property managers and tenants to streamline the leasing process.

**Technologies:** Laravel, Inertia.js, MySQL, Flutter, Tailwind CSS, Breeze  
**Live Demo:** [https://leasing.excelresidential.com/](https://leasing.excelresidential.com/)

### Profix Supplies Portal
An advanced supply management platform with inventory tracking, order processing, and user authentication system for streamlined business operations.

**Technologies:** Laravel, Inertia.js, MySQL, Tailwind CSS, Vue.js, REST API  
**Live Demo:** [https://profixsupplies.com/login](https://profixsupplies.com/login)

### Hollywood Royale Garden
A professional website for an assisted living facility showcasing their services, facilities, and care options with a modern, accessible design and content management system.

**Technologies:** WordPress, Custom Theme, PHP, JavaScript, CSS, Responsive Design  
**Live Demo:** [https://hrgalla.com/](https://hrgalla.com/)

## 📬 Contact Information

- **Email:** Deepakt552@gmail.com
- **Location:** Mumbai, India
- **Phone:** +91 9768001109
- **Availability:** Available for new projects

## 🔗 Connect With Me

- **GitHub:** [@Deepakt552](https://github.com/Deepakt552)
- **LinkedIn:** [Deepakt552](https://linkedin.com/in/Deepakt552)
- **Twitter:** [@Deepakt552](https://twitter.com/Deepakt552)

---

⚡ Full Stack Web Developer | React.js Developer | Laravel Expert | MERN Stack Developer | WordPress Developer | Inertia.js Specialist

# Local Development and Contact Form Setup

## Local Development Testing

When developing locally, the contact form is set up to work in a simulation mode:

1. The form will not actually send emails when testing on localhost or 127.0.0.1
2. Instead, it will simulate a successful submission and show a "Development mode" message
3. The form data will be logged to the console for verification

## Production Deployment Instructions

To make the contact form work properly on a production server:

1. Upload all files to a web server that supports PHP
2. Ensure the `process_form.php` file is in the root directory alongside your HTML files
3. The PHP mail() function must be enabled on your hosting server

## Troubleshooting the Contact Form

If you're experiencing issues with the contact form:

### For 405 Method Not Allowed Error:
- This typically occurs when testing locally without a proper PHP server
- Solution: Use a proper PHP server like XAMPP, WAMP, or MAMP for local testing
- Alternatively, deploy to a real web hosting service

### For Email Sending Issues:
- Check if PHP's mail() function is enabled on your server
- Some hosting providers may require specific email configurations
- You can modify `process_form.php` to use SMTP if needed (instructions in file)

### If Using Shared Hosting:
- Contact your hosting provider to ensure PHP mail is properly configured
- Some hosts restrict email sending to prevent spam

## Testing in Production Environment

Once deployed to a production server:
1. Fill out the contact form completely
2. Submit the form
3. Check your email (deepakt552@gmail.com) for the submitted message
4. If you don't receive the email, check server logs for PHP errors

# Portfolio Contact Form Setup

This document explains how to set up the contact form to send emails using PHPMailer with Gmail SMTP.

## Installation Steps

### 1. Install PHPMailer

You need to install PHPMailer via Composer. If you don't have Composer installed, [download and install it first](https://getcomposer.org/download/).

Then run the following command in your project root:

```bash
composer require phpmailer/phpmailer
```

This will create a `vendor` directory with all the necessary files.

### 2. Create Gmail App Password

For security reasons, Gmail requires using App Passwords instead of your regular password when accessing Gmail from applications:

1. Go to your [Google Account](https://myaccount.google.com/).
2. Select "Security" from the left navigation.
3. Under "Signing in to Google," select "2-Step Verification" (enable it if not already enabled).
4. At the bottom of the page, select "App passwords".
5. Give your app password a name like "Portfolio Contact Form".
6. Click "Create" and Google will generate a 16-character password.
7. Copy this password - you'll need it for the configuration.

### 3. Update SMTP Configuration

Open the `process_form.php` file and update the following lines with your Gmail information:

```php
$mail->Username   = 'your-gmail@gmail.com';           // Your Gmail address
$mail->Password   = 'your-app-password';              // The 16-character app password
$mail->setFrom('your-gmail@gmail.com', 'Portfolio Contact Form');
```

## Testing

After completing these steps, your contact form should be working. To test:

1. Fill out and submit the form on your website.
2. Check your `deepakt552@gmail.com` inbox for the email.
3. Check for any error messages on form submission if the email doesn't arrive. 