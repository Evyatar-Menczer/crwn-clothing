import React from 'react'
import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
const SignIn = () => {

    useEffect(() => {
        let user;
        const fetchData = async () => {
            user = await getRedirectResult(auth);

        }
        fetchData();
        if(user) {
            createUserDocumentFromAuth(user)
        }
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }



    return (
        <div className="sign-in">
            <h1>Sign In</h1>
            <button onClick={signInWithGooglePopup}>Sign In With Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn
