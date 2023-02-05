import { useState, useContext} from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetForFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setCurrentUser(user);
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

    const SignInWithGooglew = async () => {
        const { user } = await signInWithGooglePopup();
        const userDoc = await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

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
                    <Button
                        type="button"
                        onClick={SignInWithGooglew}
                        buttonType="google">
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;
