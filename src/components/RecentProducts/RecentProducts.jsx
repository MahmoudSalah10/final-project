import React, { useContext, useState } from 'react';
import style from './RecentProducts.module.css';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import { CartContext } from '../../Context/CartContext.jsx';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function RecentProducts() {

  const { addProductToCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getProducts,
    select: (data) => data?.data.data,
  });

  const filteredProducts = data?.filter((product) => 
    product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="max-w-xl mx-auto py-4">
        <input 
          type="text" 
          className="w-full p-2 mb-4 border rounded " 
          placeholder="Search for products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!isLoading ? (
        <div className='flex flex-wrap'>
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            <div key={product.id} className='w-1/5 p-1'>
              <div className='product p-3'>
                <Link to={`/productdetails/${product.id}`}>
                  <img src={product.imageCover} className='w-full' alt={product.title} />
                  <h3 className='font-sm text-main font-semibold'>{product.category.name}</h3>
                  <h3 className='font-medium'>{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                  <div className="flex justify-between my-2">
                    <span>{product.price} EGP</span>
                    <span><i className='fas fa-star rating-color'></i>{product.ratingAverage}</span>
                  </div>
                </Link>
                <button onClick={() => addProductToCart(product.id)} className='btn w-full bg-main text-white rounded'>Add To Cart</button>
              </div>
            </div>
          )) : (
            <div className="w-full text-center">
              <p>No products found.</p>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}


