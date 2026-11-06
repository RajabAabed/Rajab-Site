import emailjs from "emailjs-com";

const SERVICE_ID = "service_fr50272";
const TEMPLATE_ID = "template_rl04g5t";
const PUBLIC_KEY = "WTIU7jj3IrSwmATQV";

export default function sendEmail({ fname, lname, email, phone, message, captcha }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_fname: fname,
      from_lname: lname,
      from_email: email,
      from_phone: phone,
      message,
      "g-recaptcha-response": captcha,
    },
    PUBLIC_KEY
  );
}
