import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { NavigationContainer, NavLink, NavLinksConatainer, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { showCart } = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer>
                    <NavLink to="/">
                        <CrwnLogo className="logo" />
                    </NavLink>
                </LogoContainer>
                <NavLinksConatainer>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as="span" onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinksConatainer>
                {showCart && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
