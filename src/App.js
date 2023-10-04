import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

import { setCurrentUser } from './store/user/user.reducer';

import { Routes, Route } from 'react-router-dom';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';

import './App.css';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsibscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            console.log(setCurrentUser(user));
            dispatch(setCurrentUser(user));
        });

        return unsibscribe;
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
