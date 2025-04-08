// emailService.js
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!publicKey) {
    console.error('EmailJS public key is missing. Please check your environment variables.');
    return false;
  }
  
  emailjs.init(publicKey);
  return true;
};

// Send email using EmailJS
const sendEmail = async (templateParams) => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;
    
    if (!serviceId || !templateId || !recipientEmail) {
      throw new Error('EmailJS configuration is missing. Please check environment variables.');
    }

    if (!recipientEmail) {
      throw new Error('Recipient email is missing. Please check your environment variables.');
    }

    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        ...templateParams,
        to_email: recipientEmail
      }
    );
    
    return {
      success: true,
      message: 'Email sent successfully!',
      response
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message
    };
  }
};

export { initEmailJS, sendEmail };