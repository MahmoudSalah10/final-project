import { useContext, useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext.jsx';
import { Helmet } from "react-helmet";

// List of valid cities in Egypt
const validCities = ["Cairo", "Alexandria", "Giza", "Maadi", "Mansoura", "Luxor", "Aswan", "Sharm El Sheikh", "Hurghada", "Tanta", "Ismailia", "Fayoum", "Port Said"];

export default function Checkout() {

  
  // const { getPayment } = useContext(CartContext);
  let { checkout } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number")
        .required("Phone number is required"),
      city: Yup.string()
        .oneOf(validCities, "City must be a valid city in Egypt")
        .required("City is required"),
      details: Yup.string()
        .required("Details are required")
    }),
    onSubmit: checkout
  });

  return (
    <>
      <div className="max-w-xl mx-auto py-4">
        <h2 className='text-3xl mb-4 pt-4'>Checkout:</h2>
      </div>

      <form onSubmit={formik.handleSubmit} className='max-w-xl mx-auto'>
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" 
            name="details" 
            id="details" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
            onChange={formik.handleChange} 
            value={formik.values.details} 
            onBlur={formik.handleBlur} 
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-red-500">{formik.errors.details}</div>
          ) : null}
          <label 
            htmlFor="details" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Details :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" 
            name="city" 
            id="city" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
            onChange={formik.handleChange} 
            value={formik.values.city} 
            onBlur={formik.handleBlur} 
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500">{formik.errors.city}</div>
          ) : null}
          <label 
            htmlFor="city" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your City :
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
            onChange={formik.handleChange} 
            value={formik.values.phone} 
            onBlur={formik.handleBlur} 
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500">{formik.errors.phone}</div>
          ) : null}
          <label 
            htmlFor="phone" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter Your Phone :
          </label>
        </div>

        <button type='submit' className='btn btn-green'>Pay Now</button>

      </form>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Checkout Page</title>
    </Helmet>
    </>
  );
}
