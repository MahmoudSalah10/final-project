import React, { useEffect } from 'react';
import useCategories from '../../Hooks/useCategories'; // Adjust the path as necessary
import Loading from '../Loading/Loading.jsx'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Categories() {
  
  const { data, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return ( 
    <>
    <h1 className='text-center text-green-500 pt-4 font-bold brand-header' style={{ fontSize: '2.5rem' }}>All Categories</h1>
    <div className='flex flex-wrap p-4'>
      {data.map((category) => (
        <div key={category.id} className='w-1/3 p-2'>
          <Link to={`/categorydetails/${category.id}`} className='block p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
            <div className='image-container'>
              <img src={category.image} className='w-full object-cover' style={{ height: '18.75rem' }} alt={category.name} />
            </div>
            <h3 className='font-sm text-green-600 mt-2 font-semibold text-center' style={{ fontSize: '1.75rem' }}>{category.name}</h3>
          </Link>
        </div>
      ))}
    </div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Categories Page</title>
    </Helmet>
    </>
  );
}




