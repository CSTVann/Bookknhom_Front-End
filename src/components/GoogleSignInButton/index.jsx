// GoogleSignInButton.js
import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "../../assets/style/login/style.css";

const GoogleSignInButton = ({ onSuccess }) => {
    const SignInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            onSuccess();
        } catch (error) {
            console.log("Error signing in with Google", error.message);
        }
    }

    return (
        <button onClick={SignInWithGoogle} className='sign-in-with-gg'>Sign in with Google</button>
    );
}

export default GoogleSignInButton;
