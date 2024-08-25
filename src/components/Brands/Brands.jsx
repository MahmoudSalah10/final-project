import React from 'react';
import useBrands from '../../Hooks/useBrands'; // Adjust the path as necessary
import Loading from '../Loading/Loading.jsx'; // Adjust the path as necessary
import { Helmet } from 'react-helmet';

export default function Brands() {
  const { data, isLoading, isError, error } = useBrands();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className='text-center text-green-500 pt-4 font-bold brand-header mb-11' style={{ fontSize: '2.5rem' }}>All Brands</h1>
      <div className='flex flex-col items-center justify-center cursor-pointer'>
        <div className='flex flex-wrap justify-center'>
          {data.map((brand) => (
            <div key={brand.id} className='w-1/4 p-2 transition-transform transform hover:scale-105'>
              <div className='brand p-3 bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h3 className='font-medium text-center mb-2'>{brand.name}</h3>
                <img src={brand.image} className='w-full object-cover' alt={brand.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
      </Helmet>
    </>
  );
}
