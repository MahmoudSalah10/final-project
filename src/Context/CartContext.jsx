import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import toast from 'react-hot-toast';

export let CartContext = createContext();



export default function CartContextProvider({ children }) {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [cartId, setCartId] = useState(null)

    async function checkout(shippingAddress) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers
            })
            window.location.href = data.session.url
            setLoading(false)

        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    async function addProductToCart(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers
            })
            console.log(data);
            toast.success(data.message, {
                duration: 1500
            });
            setCart(data);
            setLoading(false)


        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    async function clearCart() {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {

                headers
            })
            // console.log(data);
            setCart(null);
            setLoading(false)


        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }
    async function deleteProduct(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {

                headers
            })
            // console.log(data);
            setCart(data);
            setLoading(false)


        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    async function updateProductCount(productId, count) {
        if (count > 0) {
            try {
                setLoading(true);
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                    count
                }, {
                    headers
                })
                // console.log(data);
                setCart(data);
                setLoading(false)

            }
            catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            deleteProduct(productId)
        }

    }

    async function getCart() {
        try {
            setLoading(true)
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });
            // console.log(data);
            setCart(data);
            setLoading(false)


        }
        catch (err) {
            console.log(err);
            setLoading(false)

        }
    }



    useEffect(() => {
        getCart()
    }, [])


    return <CartContext.Provider value={{ loading, updateProductCount, addProductToCart, getCart, cart, setCart, deleteProduct, checkout, clearCart }}>
        {children}
    </CartContext.Provider>
}


