import React, { useEffect, useState } from "react";
import "../../assets/style/bpopular.css";
import Link from 'next/link';
import axios from 'axios';
import configs from '../../../configs.json'

const Bpopular = () => {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);

    const getPopularBooks = async () => {
        try {
            const response = await axios.get(`${configs.host}/api/books/popular`);
            if (response.status === 200) {
                setBooks(response.data);
                setDisplayedBooks(response.data.slice(0, 4)); // Display only first 4 books initially
            }
            console.log("getPopularBooks", response)
        } catch (error) {
            console.log("getPopularBooks", error)
        }
    }

    useEffect(() => {
        getPopularBooks();
    }, []);

    // Update displayed books based on window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 791) {
                setDisplayedBooks(books.slice(0, 3)); // Display only first 3 books if window width is less than 791px
            } else if (window.innerWidth < 1191) {
                setDisplayedBooks(books.slice(0, 4)); // Display only first 4 books if window width is less than 1191px
            } else if (window.innerWidth < 1591) {
                setDisplayedBooks(books.slice(0, 6)); // Display first 6 books if window width is less than 1591px
            } else if (window.innerWidth < 1991) {
                setDisplayedBooks(books.slice(0, 4)); // Display first 8 books if window width is less than 1991px
            } else if (window.innerWidth < 2391) {
                setDisplayedBooks(books.slice(0, 5)); // Display first 10 books if window width is less than 2391px
            } else {
                setDisplayedBooks(books.slice(0, 6)); // Display first 12 books if window width is 2391px or more
            }
        };
    
        window.addEventListener("resize", handleResize);
        handleResize(); // Call it once to set the initial value based on the current window size
        return () => window.removeEventListener("resize", handleResize);
    }, [books]);

    const truncateTitle = (title) => {
        // Remove newlines and truncate the title
        const cleanTitle = title.replace(/[\r\n]+/g, " ");
        return cleanTitle.length > 12 ? cleanTitle.substring(0, 12) + "..." : cleanTitle;
    }

    const truncateDescription = (description) => {
        const cleanDescription = description?.replace(/[\r\n]+/g, " ");
        return cleanDescription?.length > 170 ? cleanDescription.substring(0, 170) + "..." : cleanDescription;
    }

    return (
        <div className="p-book">
            <div className="p-book-container">
                <div className="p-book-header">
                    <h1>Book Popular</h1>
                    <Link href="/book_listing" className="view-all">View All</Link>
                </div>
                <div className="list-p-book">
                    {displayedBooks.map((book, index) => (
                        <div key={index} className="p-book-content">
                            <Link className="view-detail" style={{ textDecoration: 'none' }} href={{ pathname: `/Book_Detail/${book.id}` }}>
                                <div className="p-book-card">
                                    {book.image ? (
                                        <img className="img-pf" src={`data:image/jpeg;base64,${book.image}`} alt="" />
                                    ) : (
                                        <img className="img-pf" src={book.image_url} alt="" />
                                    ) }
                                    <div className="box-detail">
                                        <h4 className="name-pf">{truncateTitle(book.title)}</h4>
                                        <p className="value-name">{book.category_name}</p>
                                        <p className="value-name">Author: {book.author_name}</p>
                                        <p className="description">{truncateDescription(book.description)}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bpopular;
