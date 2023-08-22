import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { showCart, setShowCart, totalItems } = useContext(CartContext);

    const toggleShowCart = () => {
        setShowCart(!showCart);
    };
    return (
        <CartIconContainer onClick={toggleShowCart}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{totalItems}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
