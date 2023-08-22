import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.util';

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
    totalPrice: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
};

const INITIAL_STATE = {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
    showCart: false,
};
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return {
                ...state,
                showCart: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};
export const CartProvider = ({ children }) => {
    const [{ showCart, cartItems, totalItems, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const updateCartItemsReducer = (newCartItems) => {
        const totalItems = newCartItems.reduce((total, curr) => total + curr.quantity, 0);
        const totalPrice = newCartItems.reduce((total, curr) => total + curr.quantity * curr.price, 0);
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                totalItems: totalItems,
                totalPrice: totalPrice,
                cartItems: newCartItems,
            })
        );
    };

    const addItemToCart = (prodcut) => {
        const newCartItems = addCartItem(cartItems, prodcut);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (prodcut) => {
        const newCartItems = removeCartItem(cartItems, prodcut);
        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = (prodcut) => {
        const newCartItems = deleteCartItem(cartItems, prodcut);
        updateCartItemsReducer(newCartItems);
    };

    const setShowCart = (showCart) => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, showCart ));
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
