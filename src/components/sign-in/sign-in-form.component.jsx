import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup;
        await createUserDocumentFromAuth(user);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        //confirm password match
        try {
            await signInAuthWithEmailAndPassword(email, password);
            resetFormField();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    console.log("Incorrect password for email")
                    break;
                case 'auth/user-not-found':
                    console.log("No user associated with this email")
                    break;
                default:
                    console.log(error);
                    break;
            }
            
            console.log(error);
        }
        
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                    label="Email"
                />
                <FormInput 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                    label="Password"
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle} type="button">Google sign in</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;