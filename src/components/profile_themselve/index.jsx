import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import '../../assets/style/profile_themselve/style.css';
import styles from '../../assets/style/CustomFileInput/style.css';
import Link from "next/link";
import configs from '../../../configs.json';


const Profile_Themselve = () => {
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState("https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png");
    const [imageBase64, setImageBase64] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageError, setImageError] = useState(false);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsLoading(true);
            setImageError(false);
            
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large. Please select an image smaller than 5MB.");
                setIsLoading(false);
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setSelectedImage(base64String);
                setImageBase64(base64String.split(",")[1]); // Extract base64 part after the comma
                setIsLoading(false);
            };
            reader.onerror = () => {
                setImageError(true);
                setIsLoading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!imageBase64 || isLoading) return;
        
        try {
            setIsLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${accessToken}` };

            const response = await axios.post(`${configs.host}/api/uploadImage`, { image: imageBase64 }, { headers });
            console.log("Image uploaded successfully:", response.data);

            // Store the image in local storage after successful upload
            localStorage.setItem('profileImage', selectedImage);
            setIsLoading(false);
            alert("Profile image updated successfully!");
        } catch (error) {
            setIsLoading(false);
            console.error("Error uploading image:", error.response ? error.response.data : error.message);
            alert("Failed to upload image. Please try again.");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    setIsLoggedIn(true);
                    const headers = { 'Authorization': `Bearer ${accessToken}` };

                    const response = await axios.get(`${configs.host}/api/users/getAuth`, { headers });
                    setUser(response.data.user);

                    // Retrieve the image from local storage if it exists
                    const storedImage = localStorage.getItem('profileImage');
                    if (storedImage) {
                        setSelectedImage(storedImage);
                    } else if (response.data.user.image) {
                        setSelectedImage(`data:image/jpeg;base64,${response.data.user.image}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    const handleImageError = () => {
        setImageError(true);
        setSelectedImage("https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png");
    };

    return (
        <div className="pt-container">
            <div className="edit-container-text">
                <Link href="/" style={{marginLeft: "10%",display: "flex",alignItems: "center", textDecoration: "none", gap: "10px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
                        <path d="M8.7 19.0999L0.275 10.6999C0.175 10.5999 0.104333 10.4916 0.0629997 10.3749C0.0209997 10.2582 0 10.1332 0 9.9999C0 9.86657 0.0209997 9.74157 0.0629997 9.6249C0.104333 9.50824 0.175 9.3999 0.275 9.2999L8.7 0.874902C8.93333 0.641569 9.225 0.524902 9.575 0.524902C9.925 0.524902 10.225 0.649902 10.475 0.899902C10.725 1.1499 10.85 1.44157 10.85 1.7749C10.85 2.10824 10.725 2.3999 10.475 2.6499L3.125 9.9999L10.475 17.3499C10.7083 17.5832 10.825 17.8706 10.825 18.2119C10.825 18.5539 10.7 18.8499 10.45 19.0999C10.2 19.3499 9.90833 19.4749 9.575 19.4749C9.24167 19.4749 8.95 19.3499 8.7 19.0999Z" fill="#090937"/>
                    </svg>
                    <p className="edit-text" style={{fontSize: "20px", fontWeight:"bold", color: "black"}}>My Profile</p>
                </Link>        
            </div>
            <h5 className="pt-profile">My Profile</h5>
            <div className="pt-container-profile">
                <div className={styles.container} style={{display: "flex", justifyContent: "center", flexDirection: "column", marginRight: "3%", position: "relative"}}>
                    <input type="file" accept="image/*" ref={fileInputRef} className={styles.fileInput} style={{ display: 'none' }} onChange={handleImageChange} />
                    
                    <div className="profile-image-container" style={{ 
                        position: "relative", 
                        width: '150px', 
                        height: '150px', 
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "3px solid #f0f0f0",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                        cursor: "pointer"
                    }} onClick={handleClick}>
                        {isLoading && (
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(255,255,255,0.6)",
                                zIndex: 2
                            }}>
                                Loading...
                            </div>
                        )}
                        
                        <img 
                            src={imageError ? "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" : selectedImage} 
                            alt="Profile" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                            onError={handleImageError}
                        />
                        
                    </div>
                    
                    {imageBase64 && (
                        <button 
                            onClick={handleUpload} 
                            disabled={isLoading}
                            style={{
                                marginTop: "10px",
                                padding: "5px 10px",
                                backgroundColor: "#6251DD",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: isLoading ? "not-allowed" : "pointer",
                                opacity: isLoading ? 0.7 : 1
                            }}
                        >
                            {isLoading ? "Uploading..." : "Save Image"}
                        </button>
                    )}
                </div>
                <div className="pt-n">
                    <div className="pt-profilename-and-button">
                        <h4 className="pt-profilename">{user ? user.name : 'Guest'}</h4>
                        <div className="pt-button-container">
                            <Link className="pt-button pt-btn" href="/edit-profile">Edit Profile</Link>
                            <Link href="/upload" className="pt-button pt-button-upload">Upload New Book</Link>
                            {isLoggedIn ? (
                                <Link href="/" className="logout" onClick={handleLogout}>Log Out</Link>
                            ) : (
                                <Link href="/login" className="logout">Login</Link>
                            )}
                        </div>
                    </div>
                    <div className="pt-nnnnn">
                        <div className="pt-info">
                            <p className="p1">Email: <span className="pt-space1">{user ? user.email : '...'}</span></p>
                            <p className="p1">Phone: <span className="pt-space1">{user ? user.phone : "..."}</span></p>
                            <p>ID: <span className="pt-space3">{user ? user.id : '...'}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile_Themselve;
