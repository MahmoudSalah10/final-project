import React, { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext.jsx';
import { CartContext } from '../../Context/CartContext.jsx';
import { WishlistContext } from '../../Context/WishlistContext.jsx'; // Import WishlistContext

export default function Navbar() {
  let navigate = useNavigate();
  let { userData, setUserData } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext); // Use WishlistContext
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  
  const cartCount = cart?.numOfCartItems || 0;
 
  return (
    <nav className="bg-gray-200 py-2 capitalize text-center md:fixed top-0 inset-x-0 z-50">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center space-x-3">
          {/* Toggle Button for Mobile */}
          <button
            type="button"
            className="inline-flex items-center p-2 ms-auto text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 absolute right-0"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          <img src={logo} width={120} alt="logo" className="mb-1" />
        </div>

        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full md:flex md:items-center md:w-auto`}
          id="navbar-default"
        >
          {userData && (
            <ul className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 mt-4 md:mt-0 mx-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="categories">Categories</NavLink></li>
              <li><NavLink to="brands">Brands</NavLink></li>
            </ul>
          )}
          <ul className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 mt-4 md:mt-0 items-center">
            {userData ? (
              <>
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <NavLink to="cart">
                    <i className="fa-solid fa-xl fa-cart-shopping"></i>
                  </NavLink>
                  <span className="sr-only">Cart</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {cartCount}
                  </div>
                </button>

                {/* Wishlist Icon */}
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <NavLink to="wishlist">
                    <i className="fa-solid fa-xl fa-heart"></i>
                  </NavLink>
                  <span className="sr-only">Wishlist</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {wishlistCount}
                  </div>
                </button>

                <li onClick={logOut} className="cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="login">Login</NavLink>
                </li>
              </>
            )}
            <li className="flex space-x-2 text-black">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


