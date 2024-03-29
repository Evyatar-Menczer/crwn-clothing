import { CartItemContainer, Name, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <Name> {name} </Name>
                <div>
                    <span>
                        {quantity} x ${price}
                    </span>
                </div>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;
