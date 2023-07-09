import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const cartItem = cartItems.find((item) => item.id === productToAdd.id);
    if (cartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, prodcut) => {
    if (prodcut.quantity === 1) {
        return cartItems.filter((item) => item.id !== prodcut.id);
    }

    return cartItems.map((item) => {
        if (item.id === prodcut.id) item.quantity -= 1;
        return item;
    });
};

const deleteCartItem = (cartItems, prodcut) => {
    return cartItems.filter((item) => item.id !== prodcut.id);
};

export const CartContext = createContext({
    showCart: false,
    setShowCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    totalItems: 0,
    totalPrice: 0
});

export const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const totalItems = cartItems.reduce((total, curr) => total + curr.quantity, 0);
        const totalPrice = cartItems.reduce((total, curr) => total + curr.quantity * curr.price, 0);
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
    }, [cartItems]);

    const addItemToCart = (prodcut) => {
        setCartItems(addCartItem(cartItems, prodcut));
    };

    const removeItemFromCart = (prodcut) => {
        setCartItems(removeCartItem(cartItems, prodcut));
    };

    const deleteItemFromCart = (prodcut) => {
        setCartItems(deleteCartItem(cartItems, prodcut));
    };

    const value = {
        showCart,
        setShowCart,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        totalItems,
        totalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
