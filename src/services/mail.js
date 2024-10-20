import emailjs from "emailjs-com";
export default function sendEmail(
  fname,
  lname,
  email,
  phone,
  message,
  captchaValue
) {
  // Prepare email parameters with EmailJS
  const emailParams = {
    from_fname: fname,
    from_lname: lname,
    from_email: email,
    from_phone: phone,
    message: message,
    "g-recaptcha-response": captchaValue, // Include reCAPTCHA token
  };

  emailjs
    .send(
      "service_fr50272", // Replace with your EmailJS service ID
      "template_rl04g5t", // Replace with your EmailJS template ID
      emailParams,
      "WTIU7jj3IrSwmATQV" // Replace with your EmailJS user ID
    )
    .then(() => {
      console.log("ttt");
      return true;
    })
    .catch((error) => {
      console.log("ewfwf");
      console.error("EmailJS error:", error);
      return false;
    });
}
