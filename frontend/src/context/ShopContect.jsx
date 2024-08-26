import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContect = createContext();

const ShopContextProvider = (props) => {

    const currency ='$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)

    const value = {
        products , currency , delivery_fee, search, setSearch, showSearch, setShowSearch
    }

    return (
        <ShopContect.Provider value={value}>
            {props.children}
        </ShopContect.Provider>
    )
}

export default ShopContextProvider;