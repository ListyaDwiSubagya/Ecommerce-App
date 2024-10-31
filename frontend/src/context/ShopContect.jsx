import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContect = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        setCartItem((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId] = updatedCart[itemId] || {};
            updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
            return updatedCart;
        });
    };

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItem).forEach((item) =>
            Object.values(item).forEach((qty) => {
                totalCount += qty;
            })
        );
        return totalCount;
    };

    const updateQuantity = (itemId, size, quantity) => {
        setCartItem((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[itemId][size] = quantity;
            return updatedCart;
        });
    };

    const getCartAmount = () => {
        return Object.keys(cartItem).reduce((totalAmount, itemId) => {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                Object.values(cartItem[itemId]).forEach((qty) => {
                    totalAmount += itemInfo.price * qty;
                });
            }
            return totalAmount;
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if(response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken
    };

    return (
        <ShopContect.Provider value={value}>
            {props.children}
        </ShopContect.Provider>
    );
};

export default ShopContextProvider;
