import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar"
import Book_Info from "@/components/book_info_owner"
import Profile_View from "@/components/profile_view"
import Carousel from "@/components/carousel";
import Comment_V2 from "@/components/comment_v2";
import axios from "axios";
import configs from '../../../configs.json'


const Book_Detail = () => {
    const router  = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState({})
    const [user, setUser] = useState({})
    // router.query.admin

    const getBooks = async () => {
      if (id) {
        console.log("bool+++++", id)
        try {
            const response = await axios.get(`${configs.host}/api/books/show/${id}`);
            if (response.status) {
              setBook(response?.data?.book)
              console.log("book res+++++++++++", response.data.book)
              setUser(response?.data?.user)
            }
        } catch (error) {
            console.log("Error Get Book", error)
        }
      }
    }

    useEffect(() => {
      getBooks();
    }, [id]);
      
    return (
        <div>
            <Navbar />
            <Book_Info book={book} />
            <Profile_View book={book} user={user}/>
            <Carousel user={user}/>
            <Comment_V2 book={book}/>
        </div>
    );
}

export default Book_Detail;