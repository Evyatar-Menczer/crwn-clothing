import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './sign-in-form.styles.scss';
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetForFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetForFields();
        } catch (error) {
            console.log(
                error.code === 'auth/user-not-found'
                    ? 'User not found'
                    : error.code === 'auth/wrong-password'
                    ? 'Wrong password'
                    : 'Error'
            );
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit"> Sign In </Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={SignInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;
