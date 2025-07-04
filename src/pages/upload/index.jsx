import React, {useState, useEffect, useRef} from "react";
import { useRouter } from 'next/router';
import Navbar from "@/components/navbar";
import '../../assets/style/upload/style.css';
import '../../assets/style/upload/responsive.css';
import AddImage from "../../assets/image/add_image.png"
import axios from 'axios';
import configs from '../../../configs.json'
import styles from '../../assets/style/CustomFileInput/style.css';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";




console.log("configs.host", configs)

const apiClient = axios.create({
    baseURL: `${configs.host}`,
    withCredentials: false, // This allows cookies to be sent across domains
  });

const Upload = () => {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(AddImage);
    const [imageBase64, setImageBase64] = useState("");
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] = useState();
    const [author, setAuthor] = useState("")

    const [selectCategory, setSelectCategory] = useState([])
    const [selectAuthor, setSelectAuthor] = useState([])
    const defaultSvg = `data:image/svg+xml;base64,${btoa(`
    <svg width="420" height="570" viewBox="0 0 420 570" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="570" rx="4" fill="#F4F4FF"/>
      <rect x="0.5" y="0.5" width="419" height="569" rx="3.5" stroke="#090937" stroke-opacity="0.1"/>
      <path d="M172.516 225.59C162.917 227.71 155.153 235.954 153.169 246.109C152.722 248.386 152.697 250.27 152.697 285C152.697 319.73 152.722 321.614 153.169 323.891C155.103 333.758 162.098 341.453 171.673 344.227L173.657 344.803H209.5H245.343L247.451 344.201C255.736 341.819 262.26 335.407 264.988 327.006C266.278 322.975 266.303 322.635 266.303 296.856C266.303 273.589 266.278 272.909 265.807 271.94C264.368 268.93 260.474 268.983 258.886 272.045C258.539 272.752 258.464 274.714 258.365 289.973L258.241 307.089L247.302 293.872C241.3 286.623 235.768 280.106 235.049 279.425C233.585 278.038 230.931 276.599 228.848 276.075C227.111 275.63 223.663 275.63 221.902 276.075C219.918 276.573 217.09 278.091 215.676 279.452C214.982 280.106 211.038 284.738 206.871 289.737C202.704 294.762 199.256 298.871 199.231 298.871C199.181 298.871 198.015 297.405 196.626 295.6C193.451 291.543 191.69 289.816 189.631 288.743C187.201 287.46 185.018 287.015 182.215 287.172C179.263 287.355 177.304 288.062 174.873 289.763C173.236 290.915 172.293 291.988 166.886 298.871L160.759 306.67L160.684 277.986C160.61 245.768 160.511 247.574 162.446 243.387C163.264 241.581 163.884 240.717 165.72 238.807C167.53 236.87 168.349 236.242 170.061 235.352C173.955 233.363 172.739 233.441 197.867 233.441C211.832 233.441 220.612 233.337 221.133 233.18C222.299 232.839 223.589 231.452 223.912 230.248C224.358 228.469 223.44 226.296 221.902 225.459C221.282 225.119 218.008 225.066 197.916 225.093C176.435 225.093 174.476 225.145 172.516 225.59ZM228.228 284.686C229.592 285.419 230.063 285.968 244.351 303.189C251.296 311.538 257.224 318.683 257.571 319.076L258.167 319.756L257.77 321.955C257.497 323.342 256.951 325.017 256.207 326.587C255.289 328.629 254.719 329.44 253.057 331.167C250.825 333.523 249.138 334.674 246.409 335.721L244.599 336.428H209.5C171.524 336.428 174.029 336.506 170.954 335.119C168.002 333.784 164.827 330.827 163.041 327.765C162.073 326.09 161.032 323.002 160.784 321.117L160.635 319.939L166.737 312.088C179.04 296.28 178.395 297.065 179.933 296.306C181.917 295.364 183.877 295.364 185.812 296.359C187.077 297.039 187.672 297.667 191.665 302.771C194.196 305.99 196.502 308.686 197.048 309.026C198.214 309.785 199.925 309.706 201.116 308.816C201.562 308.476 206.077 303.216 211.112 297.091C216.172 290.993 220.637 285.707 221.059 285.366C221.481 285.026 222.25 284.555 222.795 284.346C224.16 283.796 226.938 283.979 228.228 284.686Z" fill="#CDCDD4"/>
      <path d="M244.45 225.668C243.978 225.982 243.358 226.768 243.06 227.422C242.515 228.521 242.49 228.861 242.49 235.195V241.816H235.942C229.592 241.816 229.393 241.843 228.575 242.418C227.359 243.256 226.516 245.166 226.739 246.553C226.962 247.941 228.327 249.563 229.542 249.93C230.063 250.061 233.163 250.191 236.487 250.191H242.49V256.525C242.49 260.032 242.614 263.303 242.738 263.853C243.085 265.136 244.623 266.575 245.938 266.811C247.252 267.046 249.063 266.156 249.857 264.874C250.403 264.01 250.427 263.801 250.427 257.101V250.191H256.703C262.706 250.191 263.028 250.165 264.07 249.589C264.69 249.275 265.434 248.621 265.732 248.124C266.799 246.423 266.302 243.727 264.715 242.523C263.971 241.973 263.673 241.947 257.249 241.816L250.552 241.686L250.427 234.619C250.303 227.841 250.279 227.527 249.758 226.741C248.617 225.066 246.062 224.543 244.45 225.668Z" fill="#CDCDD4"/>
      <path d="M179.536 242.183C174.401 243.518 169.887 248.386 168.845 253.803C167.853 258.854 169.217 263.853 172.566 267.596C175.22 270.527 178.246 272.045 182.116 272.359C190.698 273.039 198.164 265.162 197.519 256.106C197.42 254.929 197.197 253.411 196.999 252.73C195.485 247.627 191.417 243.518 186.556 242.209C184.795 241.738 181.372 241.738 179.536 242.183ZM185.836 250.82C187.97 251.866 189.656 254.562 189.656 256.918C189.656 260.555 187.052 263.618 183.629 263.984C178.693 264.507 174.997 258.985 177.105 254.248C177.75 252.756 179.561 250.924 180.776 250.532C182.289 250.008 184.447 250.139 185.836 250.82Z" fill="#CDCDD4"/>
    </svg>
    `)}`;

    const handleNameChange = (event) => {
        const inputText = event.target.value;
        setName(inputText);
    };

    const handleTextChange = (event) => {
        const inputText = event.target.value;
        setText(inputText);
    };

    const handlePriceChange = (event) => {
        const inputText = parseFloat(event.target.value);
        setPrice(inputText);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(parseInt(event.target.value));
    };
    const fileInputRef = useRef(null);

    const actionSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            
            // First, check if author exists or create a new one
            let authorId;
            if (author && author.trim() !== '') {
                // Check if author already exists
                const existingAuthors = await axios.get(`${configs.host}/api/authors`);
                const foundAuthor = existingAuthors.data.data.find(
                    a => a.name.toLowerCase() === author.toLowerCase()
                );
                
                if (foundAuthor) {
                    // Author exists, use its ID
                    authorId = foundAuthor.id;
                } else {
                    // Author doesn't exist, create a new one
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
            
            // Now proceed with book upload using the author ID
            const bookData = {
                user_id: user.user.id,
                title: name,
                price: price,
                description: text,
                author_id: authorId, // Use the numeric ID
                category_id: category,
                image: imageBase64,
            };

            console.log("Uploading book data:", bookData);
            
            const response = await axios.post(`${configs.host}/api/books/store`, bookData);
            if (response.status) {
                router.push('/profile_for_themselve');
            }
        } catch (error) {
            console.error("Error uploading book:", error);
            alert('Failed to upload book. Please try again.');
        }
    }

    const previewImage = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = () => {
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.src = reader.result;
            }
            
            reader.readAsDataURL(file);
        }
    }

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedImage(base64String);
                console.log("base64String.split(", base64String.split(",")[1])
                setImageBase64(base64String.split(",")[1]);
            };
            reader.readAsDataURL(file);
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

    useEffect(() => {
        getCategory();
        getAuthor();
    }, [])


    return (
        
        <div>
            <Navbar />

            {/* Upload page below of this comment */}
            <div className="ul-container">
                <div className="ul-backtoprofile">
                    <Link href="/profile_for_themselve">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20" fill="none">
                            <path d="M8.7 19.1L0.275 10.7C0.175 10.6 0.104333 10.4917 0.0629997 10.375C0.0209997 10.2584 0 10.1334 0 10C0 9.86669 0.0209997 9.74169 0.0629997 9.62503C0.104333 9.50836 0.175 9.40003 0.275 9.30002L8.7 0.875024C8.93333 0.641691 9.225 0.525024 9.575 0.525024C9.925 0.525024 10.225 0.650024 10.475 0.900024C10.725 1.15002 10.85 1.44169 10.85 1.77502C10.85 2.10836 10.725 2.40002 10.475 2.65002L3.125 10L10.475 17.35C10.7083 17.5834 10.825 17.8707 10.825 18.212C10.825 18.554 10.7 18.85 10.45 19.1C10.2 19.35 9.90833 19.475 9.575 19.475C9.24167 19.475 8.95 19.35 8.7 19.1Z" fill="#090937"/>
                        </svg>
                    </Link>
                    <p className="ul-profile-text">Profile</p>
                </div>
                <div className="ul-container-image-form">
                    <div className="ul-container-image">
                        <button className="ul-warning">
                            <div className={styles.container} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                <input type="file" accept="image/*" ref={fileInputRef} className={styles.fileInput} style={{ display: 'none' }} onChange={handleImageChange} />
                                <Image src={selectedImage || AddImage} alt="Upload Image" width={100} height={100} style={{ width: '20vw', height: '55vh', cursor: 'pointer', borderRadius: "10px"}} onClick={handleClick} className={styles.customButton} />
                            </div>
                            <i></i>
                            {/* <input className="ul-container-input"  accept=".jpg, .png"  type="file" id="uploadImage" name="uploadImage" onChange={previewImage}/> */}
                        </button>
                    </div>
                    <div className="ul-container-form">
                        <div className="ul-container-form-input">
                            <p>Book</p>
                            <input type="text" placeholder="Kin Chay Na" value={name} onChange={handleNameChange}/>
                        </div>
                        <div className="ul-container-form-input">
                            <p>Author</p>
                            <input type="text" placeholder="Enter author name" value={author} onChange={handleAuthorChange} />
                        </div>
                        <div className="ul-container-form-input">
                            <p>Category</p>
                            <select class="select" value={category} onChange={handleCategoryChange}>
                                <option value="" disabled selected hidden="">Select Category</option>
                                {selectCategory && selectCategory.map((author, i) => {
                                return (<>
                                    <option value={author.id}>{author.name}</option>
                                </>)
                                })}
                            </select>
                        </div>
                        <div className="ul-container-form-input">
                            <p>Price</p>
                            <input type="number" className="ul-price" placeholder="$$$" value={price} onChange={handlePriceChange}/>
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
                            <button className="upload" onClick={actionSubmit}>Upload</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Upload