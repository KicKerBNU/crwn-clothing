import { Fragment } from 'react';
import { Outlet, Link } from "react-router-dom" //Used to render the component before or after
import './navigation.styles.scss';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
const Navigation = () => {
    return (
        <Fragment>
          <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className='logo'></CrwnLogo>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                <Link className="nav-link" to='/auth'>
                    SIGN IN
                </Link>
            </div>
          </div>
          <Outlet></Outlet>
        </Fragment>
    )
  }
  
  export default Navigation;