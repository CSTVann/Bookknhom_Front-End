import React, { useState, useEffect } from "react";
import '../../assets/style/book_info/style.css';
import '../../assets/style/book_info/media-queries.css';
import Link from 'next/link';
import Popup_Exchange from "../popup_exchange";


const Book_Info = ({ book }) => {
    const [user, setUser] = useState({});
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering

    useEffect(() => {
        setIsClient(true); // Set isClient to true on component mount
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData).user;
            setUser(parsedUser);
        }
    }, []);



    return (
        <div className="all-container">
            <div>
                <Link href={'/book_listing'} className="custom-link">
                    <div className="back-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="50" viewBox="0 0 10 17" fill="none">
                            <path d="M7.604 16.0834L0.58317 9.08335C0.499837 9.00002 0.440948 8.90974 0.406504 8.81252C0.371504 8.7153 0.354004 8.61113 0.354004 8.50002C0.354004 8.38891 0.371504 8.28474 0.406504 8.18752C0.440948 8.0903 0.499837 8.00002 0.58317 7.91669L7.604 0.895854C7.79845 0.701409 8.0415 0.604187 8.33317 0.604187C8.62484 0.604187 8.87484 0.708354 9.08317 0.916687C9.2915 1.12502 9.39567 1.36808 9.39567 1.64585C9.39567 1.92363 9.2915 2.16669 9.08317 2.37502L2.95817 8.50002L9.08317 14.625C9.27761 14.8195 9.37484 15.0589 9.37484 15.3434C9.37484 15.6284 9.27067 15.875 9.06234 16.0834C8.854 16.2917 8.61095 16.3959 8.33317 16.3959C8.05539 16.3959 7.81234 16.2917 7.604 16.0834Z" fill="#090937"/>
                        </svg>
                        <p className="back-text">Book Detail</p> 
                    </div>
                </Link>
                <div className="container-img-detail">
                    <div className="nest-book-img">
                        <div className="book-img">
                            {book.image ? (
                                <img src={`data:image/jpeg;base64,${book.image}`} alt="Book" />
                            ) : (
                                <img src={book.image_url} alt="Book" />
                            )}
                        </div>
                    </div>
                    <div className="nest-detail">
                        <div className="mest-info-detail">
                            <h5 className="book-name">{book?.title}</h5>
                            <h6 className="book-category">{book?.category?.name}</h6>
                            <h6 className="book-author">Author: {book?.author?.name}</h6>
                            <h6 className="book-price">Price: $ {book?.price}</h6>
                            <p className="book-description">Description: {book?.description}</p>
                        </div>
                    </div>
                </div>
                
                {user.id !== book.user_id &&
                    <Popup_Exchange toExchangeBook={book} />}
            </div>
            <div>
                <p className="break-line"></p>
            </div>
        </div>
    );
}

export default Book_Info;
