import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import sendEmail from "../../../services/mail";

export default function ContactFrom() {
  const [captchaValue, setCaptchaValue] = useState(null);

  let [message, setMessage] = useState("");
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailRef = useRef();
  let phoneRef = useRef();
  let detailsRef = useRef();
  function validEmptyInput(value) {
    return value != "";
  }
  function handleForm(e) {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify that you are not a robot.");
      return;
    }

    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let email = emailRef.current.value;
    let phone = phoneRef.current.value;
    let details = detailsRef.current.value;

    if (
      validEmptyInput(firstName) &&
      validEmptyInput(lastName) &&
      validEmptyInput(email) &&
      validEmptyInput(phone) &&
      validEmptyInput(details)
    ) {
      sendEmail(firstName, lastName, email, phone, details, captchaValue);

      setMessage("The message has been sent successfully");

      setTimeout(() => {
        setMessage("");
      }, 8000);

      setCaptchaValue(null);
    } else {
      setMessage("Input Valid Value");
      setTimeout(() => {
        setMessage("");
      }, 8000);
    }
  }

  const handleCaptcha = (value) => {
    setCaptchaValue(value); // Store the captcha value
  };

  return (
    <div className="flex flex-col sm:w-3/5 w-full border border-neutral-200 dark:border-neutral-700 rounded- py-7 px-5">
      {message && (
        <p className="w-full py-3 px-7 bg-neutral-900 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 mb-5 rounded-md font-Lufga text-base font-medium">
          {message}
        </p>
      )}
      <form
        onSubmit={handleForm}
        method="post"
      >
        <div className="grid gap-4 lg:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label
                htmlFor="hs-firstname-contacts-1"
                className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="hs-firstname-contacts-1"
                id="hs-firstname-contacts-1"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-secondary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ref={firstNameRef}
                required
              />
            </div>

            <div>
              <label
                htmlFor="hs-lastname-contacts-1"
                className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="hs-lastname-contacts-1"
                id="hs-lastname-contacts-1"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-secondary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ref={lastNameRef}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label
                htmlFor="hs-email-contacts-1"
                className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="hs-email-contacts-1"
                id="hs-email-contacts-1"
                autoComplete="email"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-secondary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ref={emailRef}
                required
              />
            </div>

            <div>
              <label
                htmlFor="hs-phone-number-1"
                className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                name="hs-phone-number-1"
                id="hs-phone-number-1"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-secondary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ref={phoneRef}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="hs-about-contacts-1"
              className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
            >
              Details
            </label>
            <textarea
              id="hs-about-contacts-1"
              name="hs-about-contacts-1"
              rows="4"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-secondary focus:ring-secondary disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              ref={detailsRef}
              required
            ></textarea>
          </div>
          <div>
            <ReCAPTCHA
              sitekey="6LfTImUqAAAAAJ4H26Ip8-WJhaNI7uNWryGjAIVr" // Replace with your actual reCAPTCHA site key
              onChange={handleCaptcha}
            />
          </div>
        </div>

        <div className="mt-6 grid">
          <button
            type="submit"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent dark:bg-primary-500 bg-secondary text-white dark:hover:bg-primary-700 hover:bg-secondary focus:outline-none dark:focus:bg-primary-700 hover:focus:bg-secondary disabled:opacity-50 disabled:pointer-events-none"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
