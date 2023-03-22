import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        //confirm password match
        try {
            let response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            response.user.displayName = displayName;    
            await createUserDocumentFromAuth(response.user);

        } catch (error) {
            console.log("Error when authenticating ",error.message);
        }
        
    }

    return (
        <div>
            <h1>
                Sign up with your email and password
            </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <label htmlFor="">Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>
                <label htmlFor="">Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>
                <label htmlFor="">Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;