import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContect = createContext();

const ShopContextProvider = (props) => {

    const currency ='$';
    const delivery_fee = 10;

    const value = {
        products , currency , delivery_fee
    }

    return (
        <ShopContect.Provider value={value}>
            {props.children}
        </ShopContect.Provider>
    )
}

export default ShopContextProvider;