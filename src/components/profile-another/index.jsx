import React, { useState } from "react";
import '../../assets/style/profile-another/style.css'
import '../../assets/style/profile-another/responsive.css'

const profile_another = ({user, books}) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="pt-container">
            <div className="pt-container-profile">
                <div className="pt-image-container">
                    {user.image && !imageError ? (
                        <img 
                            className="pt-profileimage" 
                            src={`data:image/jpeg;base64,${user.image}`} 
                            alt={`${user.name}'s profile`} 
                            onError={handleImageError}
                        />
                    ) : (
                        <img 
                            className="pt-profileimage" 
                            src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" 
                            alt="Default profile" 
                        />
                    )}
                </div>
                
                <div className="pt-n">
                    <div className="pt-profilename-and-button">
                        <h4 className="pt-profilename">{user.name}</h4>
                        {/* <button className="pt-button">Message</button> */}
                    </div>
                    <div className="pt-nnnnn">
                        <div className="pt-image-point">
                            <svg className="pt-image" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M14.6996 7.6875C14.727 7.63127 14.7696 7.58388 14.8227 7.55073C14.8757 7.51758 14.937 7.5 14.9996 7.5C15.0621 7.5 15.1234 7.51758 15.1765 7.55073C15.2295 7.58388 15.2722 7.63127 15.2996 7.6875L16.4883 10.0969C16.5124 10.1454 16.5478 10.1875 16.5915 10.2194C16.6352 10.2514 16.686 10.2724 16.7396 10.2806L19.4021 10.6669C19.674 10.7062 19.7846 11.0419 19.5858 11.235L17.6621 13.1119C17.6235 13.15 17.5947 13.1968 17.5781 13.2483C17.5614 13.2999 17.5574 13.3547 17.5665 13.4081L18.0202 16.0594C18.0304 16.1206 18.0233 16.1834 17.9998 16.2409C17.9762 16.2983 17.9371 16.348 17.8868 16.3844C17.8366 16.4208 17.7772 16.4425 17.7153 16.447C17.6534 16.4516 17.5915 16.4387 17.5365 16.41L15.1552 15.1575C15.1074 15.1328 15.0543 15.12 15.0005 15.12C14.9467 15.12 14.8937 15.1328 14.8458 15.1575L12.4646 16.41C12.4096 16.4382 12.3479 16.4506 12.2863 16.4459C12.2247 16.4411 12.1657 16.4193 12.1157 16.383C12.0658 16.3466 12.0269 16.2971 12.0034 16.24C11.9799 16.1829 11.9728 16.1203 11.9827 16.0594L12.4365 13.4081C12.4457 13.3548 12.442 13.3001 12.4257 13.2486C12.4094 13.197 12.3809 13.1501 12.3427 13.1119L10.4115 11.235C10.3672 11.1916 10.3359 11.1367 10.3212 11.0765C10.3064 11.0163 10.3086 10.9531 10.3277 10.8941C10.3468 10.8352 10.3819 10.7826 10.4292 10.7425C10.4764 10.7024 10.5339 10.6762 10.5952 10.6669L13.2577 10.2806C13.3113 10.2724 13.362 10.2514 13.4058 10.2194C13.4495 10.1875 13.4849 10.1454 13.509 10.0969L14.6996 7.6875Z" fill="black"/>
                                <path d="M3.75 3.75C3.75 2.75544 4.14509 1.80161 4.84835 1.09835C5.55161 0.395088 6.50544 0 7.5 0L22.5 0C23.4946 0 24.4484 0.395088 25.1516 1.09835C25.8549 1.80161 26.25 2.75544 26.25 3.75V29.0625C26.2499 29.2321 26.2038 29.3985 26.1167 29.5439C26.0295 29.6894 25.9045 29.8085 25.755 29.8885C25.6055 29.9686 25.4371 30.0065 25.2677 29.9984C25.0983 29.9903 24.9343 29.9364 24.7931 29.8425L15 24.5644L5.20687 29.8425C5.0657 29.9364 4.90168 29.9903 4.7323 29.9984C4.56291 30.0065 4.3945 29.9686 4.245 29.8885C4.0955 29.8085 3.97051 29.6894 3.88334 29.5439C3.79617 29.3985 3.75009 29.2321 3.75 29.0625V3.75ZM7.5 1.875C7.00272 1.875 6.52581 2.07254 6.17417 2.42417C5.82254 2.77581 5.625 3.25272 5.625 3.75V27.3112L14.4806 22.6575C14.6345 22.5551 14.8152 22.5005 15 22.5005C15.1848 22.5005 15.3655 22.5551 15.5194 22.6575L24.375 27.3112V3.75C24.375 3.25272 24.1775 2.77581 23.8258 2.42417C23.4742 2.07254 22.9973 1.875 22.5 1.875H7.5Z" fill="black"/>
                            </svg>
                            <p className="pt-exchange"><span>{ books?.length || 0}</span> Total Books</p>
                        </div>
                        <div className="pt-info">
                            <p className="p1">Email Address: <span className="pt-space1">{user.email}</span></p>
                            <p>ID: <span className="pt-space3">{user.id}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default profile_another