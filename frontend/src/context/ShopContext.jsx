import { createContext, useEffect } from 'react';
// import { products } from '../assets/assets';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 40;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            console.log('add to cartdata', cartData);
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            console.log(token)

            try {
                const res = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                console.log("set cart item", res);

            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                let itemInfo = products.find((product) => product._id === items);
                if (!itemInfo) continue; // ← skip if item not found yet
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const respose = await axios.get(backendUrl + '/api/product/list');

            if (respose.data.success) {
                setProducts(respose.data.products);
            } else {
                toast.error(respose.data.message);
            }
        } catch (error) {
            console.log(error);
            console.log('hello')
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {
        try {
            const respose = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

            if (respose.data.success) {
                setCartItems(respose.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;