import {CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, RemoveButton, Value} from './checkout-item.styles.jsx';

import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemToCart, clearItemFromCart } from '../../store/cart/cart.reducer';

const CheckoutItem = ( {cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemHandler = () => dispatch(removeItemToCart(cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )

}

export default CheckoutItem