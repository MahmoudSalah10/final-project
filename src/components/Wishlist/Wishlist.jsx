import React, { useContext, useEffect } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
export default function Wishlist() {
  
  const { getWishlist, wishlist, loading, removeProductFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist();
  }, []);

  console.log(wishlist)
  return (
    <>
      {loading ? <Loading /> : (
        <div>
          {wishlist && wishlist.data.length > 0 ? (
            <div className="relative overflow-x-auto w-3/4 mx-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.data.map((product) => (
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title}
                      </td>
                      <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => removeProductFromWishlist(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className='py-5 text-2xl text-green-600 font-semibold text-center'>Wishlist Is Empty</h2>
          )}
        </div>
      )}
      <Helmet>
      <meta charSet="utf-8" />
      <title>Wishlist Page</title>
    </Helmet>
    </>
  );
}
