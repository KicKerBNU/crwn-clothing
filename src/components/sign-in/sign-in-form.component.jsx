import { useState } from "react";
import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignInContainer, ButtonContainer, H2} from "./sign-in-form.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

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
        }
        
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    return (
        <SignInContainer>
            <H2>Already have an account?</H2>
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
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} type="button">Google sign in</Button>
                </ButtonContainer>
                
            </form>
        </SignInContainer>
    )
}

export default SignInForm;