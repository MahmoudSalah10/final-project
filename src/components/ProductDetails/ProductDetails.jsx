import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext.jsx';
import { WishlistContext } from '../../Context/WishlistContext.jsx';
import { Helmet } from "react-helmet";
export default function ProductDetails() {

  let { id } = useParams();
  const [details, setProductDetails] = useState({});
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, removeProductFromWishlist, wishlist } = useContext(WishlistContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  async function getProductDetails(id) {
    setLoading(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails(id);
    if (wishlist && wishlist.data && wishlist.data.products) {
      const isWishlisted = wishlist.data.products.some(product => product.id === id);
      setIsInWishlist(isWishlisted);
    }
  }, [id, wishlist]);

  const handleAddToCart = () => {
    addProductToCart(id);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeProductFromWishlist(id);
    } else {
      addProductToWishlist(id);
    }
    setIsInWishlist(prevStatus => !prevStatus);
  };

  return (
    <>
      <h2 className="text-3xl pt-4 ms-3 text-center text-green-500 font-semibold">Product Details</h2>
      <div className="flex items-center py-10">
        <div className="w-1/4 p-4">
          {details.images?.length > 1 ? (
            <Slider {...settings}>
              {details.images?.map((image, index) => (
                <img key={index} src={image} className="w-full" alt={`Product image ${index + 1}`} />
              ))}
            </Slider>
          ) : (
            <img src={details.imageCover} className="w-full" alt="Product cover" />
          )}
        </div>
        <div className="w-3/4">
          <div>
            <Helmet>
              <meta charSet="utf-8" />
              <title>{details.title}</title>
              <meta name="keywords" content={details.slug} />
            </Helmet>
            <h2>{details.title}</h2>
            <p className="my-6 text-gray-500">{details.description}</p>
            <h3>{details.category?.name}</h3>
            <div className="flex justify-between my-2">
              <h3>{details.price} EGP</h3>
              <h3 className="flex items-center space-x-2">
                <i className="fas fa-star rating-color"></i>
                {details.ratingAverage}
                <button
                  onClick={handleToggleWishlist}
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className={`ml-2 ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`}
                  disabled={loading}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </h3>
            </div>
            <button
              className="btn w-full bg-main text-white rounded py-1"
              onClick={handleAddToCart}
              disabled={loading}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

    </>
  );
}


