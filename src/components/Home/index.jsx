// Home.js
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getAuth } from "firebase/auth";
import Dashboard from "@/components/dashboard";
import GoogleSignInButton from "../GoogleSignInButton";

const Home = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const router = useRouter();

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                {user ? (
                    <Dashboard user={user} />
                ) : (
                    <GoogleSignInButton onSuccess={() => router.push('/')} />
                )}
            </div>
        </div>
    );
}

export default Home;
