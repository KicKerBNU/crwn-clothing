import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {SignUpContainer, H2} from "./sign-up-form.styles.jsx";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

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
        if(password !== confirmPassword){
            console.log("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormField();
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                console.log("Cannot create user, email already in use");
            }else{
                console.log("Error when authenticating ",error.message);
            }
        }
        
    }

    return (
        <SignUpContainer>
            <H2>Don't have an account?</H2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />
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
                <FormInput
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                    label="Confirm Password"
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;