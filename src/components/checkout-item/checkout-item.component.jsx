import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ checkoutItem }) => {
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    const { name, quantity, imageUrl, price } = checkoutItem;
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={() => removeItemFromCart(checkoutItem)}>
                    &#10094;
                </span>
                <span className="value"> {quantity}</span>
                <span className="arrow" onClick={() => addItemToCart(checkoutItem)}>
                    &#10095;
                </span>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={() => deleteItemFromCart(checkoutItem)}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
