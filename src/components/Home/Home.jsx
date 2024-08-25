import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts.jsx';
// import Loading from '../Loading/Loading.jsx';
import CategoriesSlider from '../categoriesSlider/categoriesSlider.jsx';
import MainSlider from '../mainSlider/mainSlider.jsx';
import { Helmet } from "react-helmet";


export default function Home() {





  return <>
    <MainSlider />

    <CategoriesSlider />

    <RecentProducts />
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home Page</title>
    </Helmet>

  </>
}


