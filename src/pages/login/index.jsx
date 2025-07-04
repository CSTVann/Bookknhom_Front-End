"use client";

import React, { useState, useEffect } from "react";
import app from "../../../config";
import { useRouter } from 'next/router';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../assets/style/login/style.css';
import '../../assets/style/login/media-queries.css';
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Link from "next/link";
import configs from "../../../configs.json"


const apiClient = axios.create({
  baseURL: configs.host,
  withCredentials: false, // This allows cookies to be sent across domains
});

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // Initialize state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await apiClient.post('/api/users/login', {
                email,
                password,
            });
            console.log(response.data);
            // Save the access token to local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('userName', response.data.name);

            // Set success message
            setSuccess('Login successful!');

            // Navigate to home page or any other page you want
            router.push('/');

        } catch (error) {
            setError('Failed to log in. Please check your email and password.');
        }
    };


    return (
        <div className="container">
            <Link href="/" class="bi bi-chevron-left"></Link>
            <div className="container-nested">
                <div className="container-form">
                <svg clipRule="evenodd" className="logo" xmlns="http://www.w3.org/2000/svg" width="120" height="78" viewBox="0 0 120 78" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.0847129 34.0698L27.9196 0L38.1296 0.0140442L53.086 18.4245L42.8645 26.6242L33.0044 14.487L13.5738 38.2701L33.0345 63.1256L82.6863 0.0908642L93.0336 0.0945839L119.83 34.1644L120 41.977L94.4499 77.528L84.1331 78L68.1383 59.5896L78.0818 51.0591L88.616 63.1842L106.457 38.3598L87.8546 14.7081L38.1911 77.7578L27.8348 77.7427L0 42.1917L0.0847129 34.0698Z" fill="#6251DD" />
                </svg>

                    <div className="nest-letter">
                        <h6>Welcome back!</h6>
                        <h5>Login to your account</h5>
                    </div>
                    <form className="container-form-input" onSubmit={handleLogin}>
                        <div className="nest-email">
                            <p>E-mail</p>
                            <input
                                className="email-box"
                                type="email"
                                placeholder="Email@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="nest-password">
                            <p>Password</p>
                            <input
                                className="password-box"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error" style={{color: "#EF6B4A"}}>{error}</p>}
                        {success && <p className="success" style={{color: "#6251DD"}}>{success}</p>}
                        <div className="nest-button">
                            <button className="login" type="submit">Login</button>
                            <Link className="register" type="button" href= "./register">Register</Link>
                        </div>
                        <p className="or" style={{textAlign: "center", width: "100%"} }>Or</p>
                        <GoogleSignInButton onSuccess={() => router.push('/')} />
                    </form>
                    
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Login;
