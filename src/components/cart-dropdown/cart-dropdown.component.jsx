import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

const CartDropdown = () => {
    const navigate = useNavigate();
    const navigateToCheckout = () => {
        setShowCart(false)
        navigate('/checkout');
    };
    const { cartItems, setShowCart } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={navigateToCheckout}> GO TO CHECKOUT </Button>
        </div>
    );
};

export default CartDropdown;
