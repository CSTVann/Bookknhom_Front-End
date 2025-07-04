import React, { useState } from 'react';
import '../../assets/style/register/style.css';
import '../../assets/style/register/media-queries.css';
import Link from 'next/link';
import axios from 'axios';
import configs from '../../../configs.json';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create an object with the form data
        const userData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation, // Make sure this matches the state variable
        };

        try {
            // Send a POST request to your server's endpoint
            const response = await axios.post(`${configs.host}/api/register`, userData);

            // Check the response status
            if (response.status === 201) {
                // Registration successful, handle the response
                const data = response.data;
                setMessage('User registered successfully!');
                setErrors({});
                console.log('User registered successfully:', data);
                // You can add further actions here (e.g., redirecting the user to the login page)
            } else {
                const data = response.data;
                setErrors(data.errors);
                console.log('Failed to register user:', data);
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                setErrors(error.response.data.errors || {});
                console.log('Error response data:', error.response.data);
            } else if (error.request) {
                // No response was received from the server
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="container-nested">
                <div className="container-form">
                <svg clipRule="evenodd" className="logo" xmlns="http://www.w3.org/2000/svg" width="120" height="75" viewBox="0 0 120 78" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.0847129 34.0698L27.9196 0L38.1296 0.0140442L53.086 18.4245L42.8645 26.6242L33.0044 14.487L13.5738 38.2701L33.0345 63.1256L82.6863 0.0908642L93.0336 0.0945839L119.83 34.1644L120 41.977L94.4499 77.528L84.1331 78L68.1383 59.5896L78.0818 51.0591L88.616 63.1842L106.457 38.3598L87.8546 14.7081L38.1911 77.7578L27.8348 77.7427L0 42.1917L0.0847129 34.0698Z" fill="#6251DD" />
                </svg>
                    <h5 className="title">E-Book Exchange</h5>
                    <div className="nest-letter">
                        <h6>Welcome back!</h6>
                        <h5>Register to Login</h5>
                    </div>
                    <form className="container-form-input" onSubmit={handleSubmit}>
                        <div className="nest-email">
                            <p>Name</p>
                            <input
                                className="email-box"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors?.name && <p className="error">{errors?.name}</p>}
                        </div>
                        <div className="nest-email">
                            <p>E-mail</p>
                            <input
                                className="email-box"
                                type="email"
                                placeholder="Email@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors?.email && <p className="error">{errors?.email}</p>}
                        </div>
                        <div className="nest-password">
                            <p>Password</p>
                            <input
                                className="password-box"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors?.password && <p className="error">{errors?.password}</p>}
                        </div>
                        <div className="nest-password">
                            <p>Confirm Password</p>
                            <input
                                className="password-box"
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            {errors?.password_confirmation && <p className="error">{errors?.password_confirmation}</p>}
                        </div>
                        <div className="nest-button">
                            <button className="register" style={{ cursor: 'pointer' }} type="submit">
                                Register
                            </button>
                            <Link href="/login">
                                <button className="login" style={{ cursor: 'pointer' }} type="button">
                                    Login
                                </button>
                            </Link>
                        </div>
                        {message && <p className="success">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
