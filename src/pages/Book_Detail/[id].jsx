import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";
import Book_Info from "@/components/book_info";
import Profile_View from "@/components/profile_view";
import Carousel from "@/components/carousel";
import Comment_V2 from "@/components/comment_v2";
import Head from 'next/head';
import axios from "axios";
import configs from '../../../configs.json';

const Book_Detail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState({});
    const [user, setUser] = useState({});

    const getBooks = async (bookId) => {
        try {
            const response = await axios.get(`${configs.host}/api/books/show/${bookId}`);
            if (response.status === 200) {
                setBook(response.data.book);
                setUser(response.data.user);
            }
            console.log("getBooks Response:", response);
        } catch (error) {
            console.log("Error Get Book", error);
        }
    };

    useEffect(() => {
        if (id) {
            getBooks(id);
        }
    }, [id]);

    return (
        <div>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, dashboard, popular, banner" />
        <meta name="author" content="Your Name" />
        <meta name="description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
        <meta property="og:url" content="http://localhost:3000/Book_Detail/"/>
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
            <Navbar />
            <Book_Info book={book} />
            <Profile_View book={book} user={user} />
            {/* <Carousel user={user} /> */}
            <Comment_V2 book={book} />
        </div>
    );
};

export default Book_Detail;
