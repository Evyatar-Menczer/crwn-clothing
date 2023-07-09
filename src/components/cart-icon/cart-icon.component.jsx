import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
    const { showCart, setShowCart, totalItems } = useContext(CartContext);

    const toggleShowCart = () => {
        setShowCart(!showCart);
    };
    return (
        <div className="cart-icon-container" onClick={toggleShowCart}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{totalItems}</span>
        </div>
    );
};

export default CartIcon;
