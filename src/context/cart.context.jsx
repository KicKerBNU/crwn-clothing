import { createContext, useEffect, useReducer } from "react";

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

const sumAllValues = (cartItems) => {
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
    sumItems: 0,
})

export const CartActionTypes = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    REMOVE_ALL_ITEM: 'REMOVE_ALL_ITEM',
    TOGGLE_CART: 'TOGGLE_CART',
    SUM_ITEMS: 'SUM_ITEMS',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addCartItem(state.cartItems, payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, payload)
            }
        case CartActionTypes.REMOVE_ALL_ITEM:
            return {
                ...state,
                cartItems: removeAllItem(state.cartItems, payload)
            }
        case CartActionTypes.TOGGLE_CART:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CartActionTypes.SUM_ITEMS:
            return {
                ...state,
                sumItems: sumAllValues(state.cartItems)
            }
        case CartActionTypes.SET_COUNT_CART_ITEMS:
            return {
                ...state,
                countCartItems: payload
            }
        default:
            throw new Error(`Unhandled action type: ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    countCartItems: 0,
    sumItems: 0,
}


export const CartProvider  = ({children}) => {
    const [ {isCartOpen, cartItems, countCartItems, sumItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    
    const setIsCartOpen = () =>
        dispatch({ type: CartActionTypes.TOGGLE_CART });
    
    const addItemToCart = (productToAdd) => 
        dispatch({ type: CartActionTypes.ADD_ITEM, payload: productToAdd });

    const removeItemToCart = (productToRemove) => 
        dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: productToRemove });
        
    const removeAllItems = (productToRemove) => 
        dispatch({ type: CartActionTypes.REMOVE_ALL_ITEM, payload: productToRemove });

    const setCountCartItems = (countCartItems) => {
        dispatch({ type: CartActionTypes.SET_COUNT_CART_ITEMS, payload: countCartItems });
        dispatch({ type: CartActionTypes.SUM_ITEMS, payload: countCartItems });
    }
        
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCountCartItems(newCartCount);
    }, [cartItems])

    

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart, removeAllItems, countCartItems, sumItems, setCountCartItems};
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}