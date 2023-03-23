import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from  'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCO7N-nxj-gfWuDgMYDFAFi_xVu-WX0Ew8",
    authDomain: "crwn-clothing-db-1b665.firebaseapp.com",
    projectId: "crwn-clothing-db-1b665",
    storageBucket: "crwn-clothing-db-1b665.appspot.com",
    messagingSenderId: "1056321254922",
    appId: "1:1056321254922:web:849ff6c8e095d9f89e91f3"
  };
  
  // Initialize Firebase
  //const firebaseApp = initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);

  const googleProvier = new GoogleAuthProvider();
  googleProvier.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvier);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvier);

  export const db = getFirestore();



  export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid );

    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation = {}})
      } catch (error) {
        console.log("Error creating the user", error.message)
      }
    }

    //check if user data exists
    //if user data does not exist, create / set the document with the data from userAuth in my collection

    //else return user docref
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  