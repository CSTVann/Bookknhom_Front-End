import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import AddImage from "../../assets/image/add_image.png";
import '../../assets/style/upload/style.css';
import styles from '../../assets/style/CustomFileInput/style.css';
import Image from "next/image";
import axios from "axios";
import configs from '../../../configs.json';
import Navbar from "@/components/navbar";
import Link from "next/link";

const OwnerEditBook = () => {
    const router = useRouter();
    const { id } = router.query; // Get the book id from the URL
    const fileInputRef = useRef(null);

    const [bookDetails, setBookDetails] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [text, setText] = useState('');
    const [selectAuthor, setSelectAuthor] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);

    useEffect(() => {
        if (id) {
            fetchBookDetails(id);
            fetchAuthors();
            fetchCategories();
        }
        getCategory();
        getAuthor();
    }, [id]);

    const fetchBookDetails = async (id) => {
        try {
            const response = await axios.get(`${configs.host}/api/books/show/${id}`);
            if (response.status === 200) {
                const book = response.data.book;
                setBookDetails(book);
                setName(book.title);
                setAuthor(book.author.name);
                setCategory(book.category.id);
                setPrice(book.price);
                setText(book.description);
                setSelectedImage(book.image ? `data:image/jpeg;base64,${book.image}` : book.image_url);
            }
        } catch (error) {
            console.error("Error fetching book details", error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`${configs.host}/api/authors`);
            if (response.status === 200) {
                setSelectAuthor(response.data.authors);
            }
        } catch (error) {
            console.error("Error fetching authors", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${configs.host}/api/categories`);
            if (response.status === 200) {
                setSelectCategory(response.data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleNameChange = (e) => setName(e.target.value);
    const handleAuthorChange = (e) => setAuthor(e.target.value);
    const handleCategoryChange = (e) => setCategory(parseInt(e.target.value));
    const handlePriceChange = (e) => setPrice(parseFloat(e.target.value));
    const handleTextChange = (e) => setText(e.target.value);

    const actionSubmit = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        try {
            let authorId;
            if (author && author.trim() !== '') {
                const existingAuthors = await axios.get(`${configs.host}/api/authors`);
                const foundAuthor = existingAuthors.data.data.find(
                    a => a.name.toLowerCase() === author.toLowerCase()
                );
                
                if (foundAuthor) {
                    authorId = foundAuthor.id;
                } else {
                    const newAuthorResponse = await axios.post(`${configs.host}/api/authors`, {
                        name: author
                    });
                    
                    if (newAuthorResponse.data && newAuthorResponse.data.data) {
                        authorId = newAuthorResponse.data.data.id;
                    } else {
                        alert('Failed to create new author. Please try again.');
                        return;
                    }
                }
            } else {
                alert('Please enter an author name');
                return;
            }

            const updatedBook = {
                user_id: user.user.id,
                title: name,
                author_id: authorId,
                category_id: category,
                price: parseFloat(price),
                description: text,
                image: selectedImage ? selectedImage.split(',')[1] : null,
            };
            const response = await axios.put(`${configs.host}/api/books/update/${id}`, updatedBook);
            if (response.status) {
                alert("Book updated successfully!");
                router.push('/profile_for_themselve');
            }
        } catch (error) {
            console.error("Error updating book", error);
        }
    };

    const getCategory = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        try {
          const response = await axios.get(`${configs.host}/api/category`);
            if (response.status) {
                setSelectCategory(response.data.data)
            }
            console.log("getPopularBooks", response)
        } catch (error) {
            console.log("getPopularBooks", error)
        }
    }

    const getAuthor = async () => {
        const user = JSON.parse(localStorage.getItem('user'))  
        try {
          const response = await axios.get(`${configs.host}/api/authors`);
            if (response.status) {
                setSelectAuthor(response.data.data)
            }
            console.log("getPopularBooks", response)
        } catch (error) {
            console.log("getPopularBooks", error)
        }
    }

    return (
        <>
            <Navbar/>
            <div className="ul-container">
                <div className="ul-backtoprofile">
                    <Link href="/profile_for_themselve">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20" fill="none">
                            <path d="M8.7 19.1L0.275 10.7C0.175 10.6 0.104333 10.4917 0.0629997 10.375C0.0209997 10.2584 0 10.1334 0 10C0 9.86669 0.0209997 9.74169 0.0629997 9.62503C0.104333 9.50836 0.175 9.40003 0.275 9.30002L8.7 0.875024C8.93333 0.641691 9.225 0.525024 9.575 0.525024C9.925 0.525024 10.225 0.650024 10.475 0.900024C10.725 1.15002 10.85 1.44169 10.85 1.77502C10.85 2.10836 10.725 2.40002 10.475 2.65002L3.125 10L10.475 17.35C10.7083 17.5834 10.825 17.8707 10.825 18.212C10.825 18.554 10.7 18.85 10.45 19.1C10.2 19.35 9.90833 19.475 9.575 19.475C9.24167 19.475 8.95 19.35 8.7 19.1Z" fill="#090937" />
                        </svg>
                    </Link>
                    <p className="ul-profile-text">Profile</p>
                </div>
                <div className="ul-container-image-form">
                    <div className="ul-container-image">
                        <button className="ul-warning" onClick={handleClick}>
                            <div className={styles.container} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <input type="file" accept="image/*" ref={fileInputRef} className={styles.fileInput} style={{ display: 'none' }} onChange={handleImageChange} />
                                <Image src={selectedImage || AddImage} alt="Upload Image" width={100} height={100} style={{ width: '20vw', height: '55vh', cursor: 'pointer', borderRadius: "10px" }} className={styles.customButton} />
                            </div>
                        </button>
                    </div>
                    <div className="ul-container-form">
                        <div className="ul-container-form-input">
                            <p>Book</p>
                            <input type="text" placeholder="Book Title" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="ul-container-form-input">
                            <p>Author</p>
                            <input 
                                type="text" 
                                placeholder="Enter author name" 
                                value={author} 
                                onChange={handleAuthorChange} 
                            />
                        </div>
                        <div className="ul-container-form-input">
                            <p>Category</p>
                            <select className="select" value={category} onChange={handleCategoryChange}>
                                <option value="" disabled hidden>Select Category</option>
                                {selectCategory && selectCategory.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="ul-container-form-input">
                            <p>Price</p>
                            <input type="number" className="ul-price" placeholder="$$$" value={price} onChange={handlePriceChange} />
                        </div>
                        <div className="ul-container-form-input">
                            <p>Description</p>
                            <textarea
                                value={text}
                                onChange={handleTextChange}
                                cols="30"
                                rows="10"
                                placeholder="Write something..."
                            />
                        </div>
                        <div className="container-button">
                            <button className="upload" onClick={actionSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default OwnerEditBook;
