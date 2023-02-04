import React from 'react';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'
import {
    auth,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
const Authentication = () => {
    useEffect(() => {
        let user;
        const fetchData = async () => {
            user = await getRedirectResult(auth);
        };
        fetchData();
        if (user) {
            createUserDocumentFromAuth(user);
        }
    }, []);

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
