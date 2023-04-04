import {CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, RemoveButton, Value} from './checkout-item.styles.jsx';
const CheckoutItem = ( {cartItem, removeItem, removeItemToCart, addItemToCart}) => {
    const { name, imageUrl, price, quantity } = cartItem
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={() => removeItemToCart(cartItem)}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={() => addItemToCart(cartItem)}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={() => removeItem(cartItem)}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )

}

export default CheckoutItem