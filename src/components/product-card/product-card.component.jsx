import {ProductCardContainer, Footer, Name, Price} from './product-card.styles.jsx';
import Button, {BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer.js';

const ProductCard = ({product}) => {
    const { name, price, imageUrl} = product;
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(product));


    return (<ProductCardContainer>
            <img alt={`${name}`} src={imageUrl}  />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </ProductCardContainer>)
}

export default ProductCard;