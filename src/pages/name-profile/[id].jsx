import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";
import Profile_another from "@/components/profile-another";
import Carousel from "@/components/carousel";
// import Comment from "@/components/comment";
import Comment_V2 from "@/components/comment_v2";
import axios from "axios";
import configs from '../../../configs.json';

const NameProfile = () => {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);

    const getInfo = async () => {
        if (!id) {
            console.log("ID is not defined");
            return;
        }
        
        try {
            const response = await axios.get(`${configs.host}/api/books/user/${id}`);
            if (response.status === 200) {
                setBooks(response.data.books);
                setUser(response.data.user);
            } else {
                console.log(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Error Get Book", error.response.status, error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        }
    };

    useEffect(() => {
        getInfo();
    }, [id]);

    return (
        <div>
            <Navbar />
            <Profile_another user={user} books={books} />
            <Carousel user={user} books={books} />
            {/* <Comment /> */}
            {/* <Comment_V2 /> */}
        </div>
    );
};

export default NameProfile;
