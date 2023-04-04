import {CartIconContainer, ShoppingIconStyle, ItemCount} from "./cart-icon.styles.jsx";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, countCartItems} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconStyle />
            <ItemCount>{countCartItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;