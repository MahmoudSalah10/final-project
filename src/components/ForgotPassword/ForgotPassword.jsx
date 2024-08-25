import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // Stores the user's email
  const [resetCode, setResetCode] = useState("");  // Stores the verification code
  const [loading, setLoading] = useState(false); // Loading state
  const [apiError, setApiError] = useState(null); // API error message
  const [successMessage, setSuccessMessage] = useState(null); // Success message
  const [isCodeSent, setIsCodeSent] = useState(false); // Flag to check if code has been sent

  const navigate = useNavigate();

  // Handle sending the verification code
  async function handleSendCode(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email } // Payload containing email
      );
      setSuccessMessage("Verification code sent to your email.");
      setIsCodeSent(true); // Now allow the user to enter the code
      setLoading(false);
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  // Handle verifying the code
  async function handleVerifyCode(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode // Use resetCode instead of code
        }
      );
      setSuccessMessage("Code verified successfully.");
      navigate("/reset-password"); // Navigate to the reset password page
    } catch (err) {
      setApiError(err.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        {isCodeSent ? "Verify Your Code" : "Forgot Your Password?"}
      </h1>
      {apiError && (
        <div
          className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      )}
      {successMessage && (
        <div
          className="px-4 py-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isCodeSent} // Disable email input after code is sent
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email :
          </label>
        </div>

        {isCodeSent && (
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={(e) => setResetCode(e.target.value)}
              value={resetCode}
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter the verification code :
            </label>
          </div>
        )}

        {loading ? (
          <button type="button" className="btn btn-green">
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button type="submit" className="btn btn-green">
            {isCodeSent ? "Verify Code" : "Send Verification Code"}
          </button>
        )}
      </form>
    </div>
  );
}
