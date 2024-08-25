import { useContext, useEffect, useState } from 'react';
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';
import { Helmet } from "react-helmet";

export default function Register() {

  
  let { setUserData } = useContext(UserContext)
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)


  let navigate = useNavigate()

  async function handleRegister(values) {

    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      localStorage.setItem('userToken', data.token);
      navigate('/login');
      setUserData(data.token)

    }

    catch (err) {
      console.log(err.response.data.message)
      setApiError(err.response.data.message)
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "min length is 3").max(10, "max length is 10").required("Name Is Required"),
    email: Yup.string().email("Invalid Email").required("Email Is Required"),
    password: Yup.string().matches(/^[A-Z]\w{5,10}$/, "Invalid Password ex(Ahmed123)").required("Password Is Required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Password and Confirmation Password Doesn't Match ").required("Confirmation Password Is Required"),
    phone: Yup.string().matches(/^(002|\+2)?01[0125][0-9]{8}$/, "we need egyption phone number").required("Phone Is Required"),

  })

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <>
      <div className="max-w-xl mx-auto bg-white bg-opacity-30 border border-green-300 rounded-lg p-8 shadow-2xl backdrop-filter backdrop-blur-lg">
        <h1 className='text-4xl font-bold text-center mb-8 text-green-600'>Registeration Form</h1>
        {apiError && (
          <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-3 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your name :
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
            </div>
          )}

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

          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-3 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your confirmation password :
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.rePassword}
            </div>
          )}

          <div className="relative z-0 w-full group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-3 px-0 w-full text-sm text-green-900 bg-transparent border-0 border-b-2 border-green-400 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-green-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your phone :
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
          )}

          {loading ? (
            <button type="button" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75">
              <i className="fas fa-spinner fa-spin-pulse"></i>
            </button>
          ) : (
            <button type="submit" className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75">Register</button>
          )}
        </form>
      </div>

    </>
  )
}
