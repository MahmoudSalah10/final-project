import { useContext, useEffect, useState } from 'react';
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';
import { Helmet } from "react-helmet";

export default function Login() {

  
  let { setUserData } = useContext(UserContext)
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()

  async function handleLogin(values) {

    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      localStorage.setItem('userToken', data.token);
      navigate('/home');
      setUserData(data.token)

    }

    catch (err) {
      console.log(err.response.data.message)
      setApiError(err.response.data.message)
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email Is Required"),
    password: Yup.string().matches(/^[A-Z]\w{5,10}$/, "Invalid Password ex(Ahmed123)").required("Password Is Required")

  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <>
      <div className="max-w-xl mx-auto bg-white bg-opacity-30 border border-green-300 rounded-lg p-8 shadow-2xl backdrop-filter backdrop-blur-lg mt-5">
        <h2 className="text-3xl mb-6 text-center text-green-600 font-extrabold">Login Form</h2>
        {apiError && (
          <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-3 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your email :
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}

          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-3 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password :
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
          )}
          {loading ? (
            <button type="button" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75">
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75">Login</button>
          )}

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Login Page</title>
    </Helmet>


    </>
  )
}
