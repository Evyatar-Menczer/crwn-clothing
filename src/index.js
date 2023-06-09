import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>
                <UserProvider>
                    <ProductProvider>
                        <App />
                    </ProductProvider>
                </UserProvider>
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
