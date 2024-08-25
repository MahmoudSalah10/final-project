// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [apiError, setApiError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleResetPassword(e) {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setApiError("Passwords do not match!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
//         { newPassword }
//       );
//       navigate("/login"); // Redirect to login after successful password reset
//     } catch (err) {
//       setApiError(err.response.data.message);
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto">
//       <h1 className="text-4xl font-bold mb-8">Reset Your Password</h1>
//       {apiError && (
//         <div
//           className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//           role="alert"
//         >
//           {apiError}
//         </div>
//       )}

//       <form onSubmit={handleResetPassword}>
//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="password"
//             name="newPassword"
//             id="newPassword"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//             onChange={(e) => setNewPassword(e.target.value)}
//             value={newPassword}
//           />
//           <label
//             htmlFor="newPassword"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter new password :
//           </label>
//         </div>

//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="password"
//             name="confirmPassword"
//             id="confirmPassword"
//             className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
//             placeholder=" "
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             value={confirmPassword}
//           />
//           <label
//             htmlFor="confirmPassword"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Confirm new password :
//           </label>
//         </div>

//         {loading ? (
//           <button type="button" className="btn btn-green">
//             <i className="fas fa-spinner fa-spin-pulse"></i>
//           </button>
//         ) : (
//           <button type="submit" className="btn btn-green">
//             Reset Password
//           </button>
//         )}
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");  // Store the user's email
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setApiError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword }
      );
      navigate("/login"); // Redirect to login after successful password reset
    } catch (err) {
      setApiError(err.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Reset Your Password</h1>
      {apiError && (
        <div
          className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {apiError}
        </div>
      )}

      <form onSubmit={handleResetPassword}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter new password :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm new password :
          </label>
        </div>

        {loading ? (
          <button type="button" className="btn btn-green">
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button type="submit" className="btn btn-green">
            Reset Password
          </button>
        )}
      </form>
    </div>
  );
}
