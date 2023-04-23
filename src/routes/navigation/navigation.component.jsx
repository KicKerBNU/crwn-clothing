import { Fragment, useContext } from 'react';
import { Outlet } from "react-router-dom" //Used to render the component before or after
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useSelector } from 'react-redux';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../context/cart.context';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx';
import { selectCurrentUser } from '../../store/user/user.selector';
const Navigation = () => {
    //Use the 'useSelector' to get the value of the currentUser on the Store
    const currentUser = useSelector(selectCurrentUser);    const { isCartOpen } = useContext(CartContext);
        return (
        <Fragment>
          <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo'></CrwnLogo>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        //You can use styled component with PROPS 'as' to choose other element
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink> )
                        : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )}
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
            </NavigationContainer>
          <Outlet></Outlet>
        </Fragment>
    )
  }
  
  export default Navigation;