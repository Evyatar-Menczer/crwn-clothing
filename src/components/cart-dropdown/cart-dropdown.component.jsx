import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

const CartDropdown = () => {
    const navigate = useNavigate();
    const navigateToCheckout = () => {
        setShowCart(false);
        navigate('/checkout');
    };
    const { cartItems, setShowCart } = useContext(CartContext);
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage> Your cart is empty </EmptyMessage>
                )}
            </CartItems>
            <Button onClick={navigateToCheckout}> GO TO CHECKOUT </Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
