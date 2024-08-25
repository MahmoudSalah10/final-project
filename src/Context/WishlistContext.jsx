// import axios from 'axios';
// import React, { useEffect, useState, createContext } from 'react';
// import toast from 'react-hot-toast';

// export let WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//     let headers = {
//         token: localStorage.getItem('userToken'),
//     };

//     const [wishlist, setWishlist] = useState(null);
//     const [loading, setLoading] = useState(false);

//     async function getWishlist() {
//         try {
//             setLoading(true);
//             let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                 headers,
//             });
//             setWishlist(data);
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     async function addProductToWishlist(productId) {
//         try {
//             setLoading(true);
//             let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                 productId,
//             }, {
//                 headers,
//             });
//             toast.success(data.message, {
//                 duration: 1500,
//             });
//             setWishlist(data);
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     async function removeProductFromWishlist(productId) {
//         try {
//             setLoading(true);
//             let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
//                 headers,
//             });
//             setWishlist(data);
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         getWishlist();
//     }, []);

//     return (
//         <WishlistContext.Provider value={{ wishlist, loading, addProductToWishlist, removeProductFromWishlist, getWishlist }}>
//             {children}
//         </WishlistContext.Provider>
//     );
// }


// import axios from 'axios';
// import React, { useEffect, useState, createContext } from 'react';
// import toast from 'react-hot-toast';

// export let WishlistContext = createContext();

// export default function WishlistContextProvider({ children }) {
//     let headers = {
//         token: localStorage.getItem('userToken'),
//     };

//     const [wishlist, setWishlist] = useState(null);
//     const [loading, setLoading] = useState(false);

//     async function getWishlist() {
//         try {
//             setLoading(true);
//             let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                 headers
//             });
//             setWishlist(data);
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     async function addProductToWishlist(productId) {
//         try {
//             setLoading(true);
//             let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
//                 productId,
//             }, {
//                 headers,
//             });
//             toast.success(data.message, {
//                 duration: 1500,
//             });
//             setWishlist(data) 
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     async function removeProductFromWishlist(productId) {
//         try {
//             setLoading(true);
//             let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
//                 headers,
//             });
//             setWishlist(data) 
//             setLoading(false);
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         getWishlist();
//     }, []);

//     return (
//         <WishlistContext.Provider value={{ wishlist, loading, addProductToWishlist, removeProductFromWishlist,getWishlist }}>
//             {children}
//         </WishlistContext.Provider>
//     );
// }


import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import toast from 'react-hot-toast';

export let WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem('userToken'),
    };

    const [wishlist, setWishlist] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0); // Add state for wishlist count
    const [loading, setLoading] = useState(false);

    async function getWishlist() {
        try {
            setLoading(true);
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers
            });
            setWishlist(data);
            setWishlistCount(data.count); // Set the count from API response
        } catch (err) {
            console.error("Error fetching wishlist", err);
        } finally {
            setLoading(false);
        }
    }

    async function addProductToWishlist(productId) {
        if (!productId) {
            console.error("Product ID is undefined or null");
            return;
        }

        try {
            setLoading(true);
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
                productId,
            }, {
                headers,
            });
            toast.success(data.message, {
                duration: 1500,
            });
            setWishlist(data);
            setWishlistCount(data.count); // Update count after adding
        } catch (err) {
            console.error("Error adding product to wishlist", err);
        } finally {
            setLoading(false);
        }
    }

    async function removeProductFromWishlist(productId) {
        if (!productId) {
            console.error("Product ID is undefined or null");
            return;
        }

        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers,
            });
            setWishlist(data);
            setWishlistCount(data.count); // Update count after removing
        } catch (err) {
            console.error("Error removing product from wishlist", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlist, wishlistCount, loading, addProductToWishlist, removeProductFromWishlist, getWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
