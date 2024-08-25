import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading.jsx'
import { CartContext } from '../../Context/CartContext.jsx'
import useProducts from '../../Hooks/useProducts.jsx'
import { Helmet } from "react-helmet";
export default function Products() {

 
  const { addProductToCart } = useContext(CartContext);
  let { data, isLoading, isFetching, isError, error } = useProducts()

  return <>

    {!isLoading ? <div className='flex flex-wrap'>
      {data.map((product) => <div key={product.id} className='w-1/5 p-1'>

        <div className='product p-3 mt-4'>
          <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-full' alt={product.title} />
            <h3 className='font-sm text-main'>{product.category.name}</h3>
            <h3 className='font-medium'>{product.title.split(' ').slice(0, 3).join(' ')}</h3>
            <div className="flex justify-between my-2">
              <span>{product.price} EGP</span>
              <span><i className='fas fa-star rating-color'></i>{product.ratingAverage}</span>
            </div>
          </Link>
          <button onClick={() => addProductToCart(product.id)} className='btn w-full bg-main text-white rounded'>Add To Cart</button>
        </div>


      </div>)}
    </div> : <Loading />}
    <Helmet>
      <meta charSet="utf-8" />
      <title>Products Page</title>
    </Helmet>
  </>

}

