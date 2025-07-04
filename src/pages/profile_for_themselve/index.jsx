import React, { useEffect, useState } from "react";
import axios from "axios";
import configs from '../../../configs.json';
import Head from 'next/head';
import Navbar from "@/components/navbar";
import Profile_Themselve from "@/components/profile_themselve";
import Carousel from "@/components/carousel";

import BookColumn from "../../components/booksColumn";

const Profile_For_Themselve = () => {
    const [books, setBooks] = useState([]);

    const getUserInfo = async () => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            console.log("getUserInfo", user.user.id);
            try {
                const response = await axios.get(`${configs.host}/api/books/user/${user.user.id}`);
                if (response.status === 200) {
                    console.log("API response", response.data); // Log the entire response
                    setBooks(response.data.books);
                } else {
                    console.error("Unexpected response status:", response.status);
                }
            } catch (error) {
                console.log("Error fetching books", error);
            }
        } else {
            console.error("No user data found in localStorage");
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
            <Head>
        <title>Bookknhom</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, dashboard, popular, banner" />
        <meta name="author" content="Your Name" />
        <meta name="description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta property="og:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="SEO for Developers: 10 Best Practices to Know"/>
        <meta property="og:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta property="og:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="semrush.com"/>
        <meta property="twitter:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
        <meta name="twitter:title" content="SEO for Developers: 10 Best Practices to Know"/>
        <meta name="twitter:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta name="twitter:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>


      </Head>
            <Navbar />
            <Profile_Themselve />
            <BookColumn books={books} />
        </div>
    );
};

export default Profile_For_Themselve;
