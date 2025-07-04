import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import styles from '../../assets/style/CustomFileInput/style.css';
import '../../assets/style/edit-profile/style.css';
import '../../assets/style/edit-profile/responsive.css';
import { useRouter } from 'next/router';
import Link from "next/link";
import configs from '../../../configs.json';


const Edit_Profile = () => {
    const router = useRouter(); 
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState("https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png");
    const [imageBase64, setImageBase64] = useState("");
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const fileInputRef = useRef(null);

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
                setImageBase64(base64String.split(",")[1]); // Extract base64 part after the comma
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setIsSaving(true);
        
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${accessToken}` };
    
            // Upload image
            if (imageBase64) {
                await axios.post(`${configs.host}/api/uploadImage`, { image: imageBase64 }, { headers });
                console.log("Image uploaded successfully");
    
                // Store the image in local storage after successful upload
                localStorage.setItem('profileImage', selectedImage);
            }
    
            // Update name and phone number
            const userData = {};
            if (name) {
                const response = await axios.put(`${configs.host}/api/user/name`, { name }, { headers });
                console.log("Name updated successfully:", response.data);
            }
            if (phone) {
                const response = await axios.put(`${configs.host}/api/user/${user.id}/phone`, { phone }, { headers });
                console.log("Phone number updated successfully:", response.data);
            }
            if (Object.keys(userData).length > 0) {
                const response = await axios.put(`${configs.host}/api/users`, userData, { headers });
                console.log("Profile updated successfully:", response.data);
            }
    
            // Change password
            if (currentPassword && newPassword && newPassword === confirmNewPassword) {
                await axios.put(`${configs.host}/api/user/password`, {
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmNewPassword
                }, { headers });
                console.log("Password changed successfully");
            }
    
            // Fetch updated user data
            fetchUserData();
            
            // Navigate back to the profile page
            router.back();
    
        } catch (error) {
            console.error("Error updating profile:", error.response ? error.response.data : error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhone(e.target.value)
    }

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${accessToken}` };

            const response = await axios.get(`${configs.host}/api/users/getAuth`, { headers });
            console.log("User data:", response.data);
            setUser(response.data.user);
            
            // Set initial form values
            if (response.data.user.name) {
                setName(response.data.user.name);
            }
            if (response.data.user.phone) {
                setPhone(response.data.user.phone);
            }
            
            // Retrieve the image from local storage if it exists
            const storedImage = localStorage.getItem('profileImage');
            if (storedImage) {
                setSelectedImage(storedImage);
            } else if (response.data.user.image) {
                setSelectedImage(`data:image/jpeg;base64,${response.data.user.image}`);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="edit-profile">
                <div className="edit-container-text">
                    <Link href="/profile_for_themselve">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
                            <path d="M8.7 19.0999L0.275 10.6999C0.175 10.5999 0.104333 10.4916 0.0629997 10.3749C0.0209997 10.2582 0 10.1332 0 9.9999C0 9.86657 0.0209997 9.74157 0.0629997 9.6249C0.104333 9.50824 0.175 9.3999 0.275 9.2999L8.7 0.874902C8.93333 0.641569 9.225 0.524902 9.575 0.524902C9.925 0.524902 10.225 0.649902 10.475 0.899902C10.725 1.1499 10.85 1.44157 10.85 1.7749C10.85 2.10824 10.725 2.3999 10.475 2.6499L3.125 9.9999L10.475 17.3499C10.7083 17.5832 10.825 17.8706 10.825 18.2119C10.825 18.5539 10.7 18.8499 10.45 19.0999C10.2 19.3499 9.90833 19.4749 9.575 19.4749C9.24167 19.4749 8.95 19.3499 8.7 19.0999Z" fill="#090937"/>
                        </svg>
                    </Link>
                    
                    <p className="edit-text">Edit Profile</p>
                </div>
                    
                <div className="form-edit-container">
                    <div className="profile-image-container">
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleImageChange} 
                        />
                        <img 
                            src={selectedImage} 
                            alt="Profile" 
                            className="profile-image" 
                            onClick={handleClick} 
                        />
                        <div className="image-overlay">Click to change profile picture</div>
                    </div>
                    
                    <form className="edit-container-form" onSubmit={handleUpload}>
                        <div className="edit-form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        
                        <div className="edit-form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        
                        <div className="edit-form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder={user ? user.email : ''} 
                                value={user ? user.email : ''} 
                                readOnly 
                            />
                        </div>
                        
                        <div className="password-section">
                            <h3 className="password-section-title">Change Password</h3>
                            
                            <div className="edit-form-group">
                                <label htmlFor="current-password">Current Password</label>
                                <input 
                                    type="password" 
                                    id="current-password" 
                                    name="current-password" 
                                    placeholder="Enter current password" 
                                    value={currentPassword} 
                                    onChange={handleCurrentPasswordChange} 
                                />
                            </div>
                            
                            <div className="edit-form-group">
                                <label htmlFor="new-password">New Password</label>
                                <input 
                                    type="password" 
                                    id="new-password" 
                                    name="new-password" 
                                    placeholder="Enter new password" 
                                    value={newPassword} 
                                    onChange={handleNewPasswordChange} 
                                />
                            </div>
                            
                            <div className="edit-form-group">
                                <label htmlFor="confirm-password">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    name="confirm-password" 
                                    placeholder="Confirm new password" 
                                    value={confirmNewPassword} 
                                    onChange={handleConfirmNewPasswordChange} 
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="save-change" 
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Edit_Profile;
