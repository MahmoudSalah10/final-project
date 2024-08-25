import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Layout from './components/Layout/Layout.jsx'
import Cart from './components/Cart/Cart.jsx'
import Products from './components/Products/Products.jsx'
import WishlistContextProvider from './Context/WishlistContext.jsx';
import Categories from './components/Categories/Categories.jsx'
import Brands from './components/Brands/Brands.jsx'
import Login from './components/Login/Login.jsx'
import Notfound from './components/Notfound/Notfound.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import Register from './components/Register/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast';
import Allorders from './components/Allorders/Allorders.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'
import ChangePassword from './components/ChangePassword/ChangePassword.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'




let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'change-password', element: <ChangePassword /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])

let query = new QueryClient()

function App() {

  return <QueryClientProvider client={query}>
    <CartContextProvider>
      <UserContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ReactQueryDevtools />
          <Toaster />
        </WishlistContextProvider>
      </UserContextProvider>
    </CartContextProvider>
  </QueryClientProvider>


}

export default App


