# EmailJS Integration Setup

## Overview
This project uses EmailJS to handle contact form submissions. EmailJS allows you to send emails directly from client-side JavaScript without requiring a backend server.

## Setup Instructions

### 1. Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account
2. Verify your email address

### 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down the **Service ID** that is generated

### 3. Create an Email Template
1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
   - `{{to_name}}` - Your name (recipient)
   - `{{reply_to}}` - Reply-to email address
4. Save the template and note down the **Template ID**

### 4. Get Your Public Key
1. In your EmailJS dashboard, go to "Account" > "API Keys"
2. Copy your **Public Key**

### 5. Update Environment Variables
Update the `.env` file in the project root with your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Testing
1. Fill out the contact form on the website
2. Submit the form
3. Check your email to ensure you received the message

## Troubleshooting
If emails are not being sent:
1. Check the browser console for any errors
2. Verify that all environment variables are correctly set
3. Ensure your EmailJS account is active and within the free tier limits (or that you have a paid plan)
4. Check if your email service (Gmail, etc.) has any restrictions on sending emails via third-party applications