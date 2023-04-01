import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity +1} : 
            cartItem)
    }
    //Return new array with modified cartItems/ new cart itemw
    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    if(existingCartItem.quantity === 1){
        return cartItems.filter(x => x.id !== productToRemove.id);
    }else{
        return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity -1} : 
            cartItem)
    }
}

const removeAllItem = (cartItems, productToRemove) => {
    return cartItems.filter(x => x.id !== productToRemove.id);
}

const sumAllItems = (cartItems) => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
}

export const CartContext = createContext({
    addItemToCart: () => {},
    cartItems: [],
    countCartItems: 0,
    isCartOpen: false,
    removeItemToCart: () => {},
    removeItem: () => {},
    setIsCartOpen: () => {},
    sumItems: () => {},
})

export const CartProvider  = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [countCartItems, setCountCartItems] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCountCartItems(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const removeItem = (productToRemove) => {
        setCartItems(removeAllItem(cartItems, productToRemove))
    };

    const sumItems = (cartItems) => { 
        return sumAllItems(cartItems);
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, removeItem, cartItems, countCartItems, sumItems};
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}