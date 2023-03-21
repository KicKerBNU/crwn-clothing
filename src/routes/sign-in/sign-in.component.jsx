import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
    useEffect(() => {
        async function fetchData(){
            const response = await getRedirectResult(auth);
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        fetchData();
    }, []);
    
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log(user);
    }
    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
}

export default SignIn;