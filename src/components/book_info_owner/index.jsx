import React from "react";
import { useState, useEffect } from "react";
import '../../assets/style/book_info/style.css';
import '../../assets/style/book_info/media-queries.css';
import Router, { useRouter } from "next/router";
import Link from 'next/link';
import Modal from 'react-modal';
import configs from '../../../configs.json';
import axios from "axios";


Modal.setAppElement('#__next'); // This is important for screen readers

const AlertDialog = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Alert Dialog"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      <h2>Are you sure?</h2>
      <div>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};


const Book_Info = ({book}) =>{
    const router = useRouter()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };
    
    const handleConfirm = async () => {
        setModalIsOpen(false);
        console.log("Book updated successfully!");
        try {
            const response = await axios.delete(`${configs.host}/api/books/destroy/${book.id}`);
            if (response.status) {
                    router.push('/profile_for_themselve');
            }
            console.log("reponse", response)
        } catch (err) {
            console.log("reponse", err)

        }
    };

    return (
        <div className="all-container">
            <AlertDialog
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onConfirm={handleConfirm}
            />
            <div>
                <Link href={'/'} className="custom-link">
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
                                <img 
                                    src={`data:image/jpeg;base64,${book.image}`} 
                                    alt={book?.title || "Book cover"} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-book.png";
                                    }}
                                />
                            ) : book?.image_url ? (
                                <img 
                                    src={book.image_url} 
                                    alt={book?.title || "Book cover"} 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-book.png";
                                    }}
                                />
                            ) : (
                                <div className="no-image-placeholder">
                                    <span>No Image Available</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="nest-detail">
                        <div className="owner-edit-btn">
                            <Link style={{textDecoration: "none"}} className="link-item" href={{ pathname: `/owner-edit-book/${book.id}` }}>
                                    <i class="bi bi-pencil-square"></i>
                            </Link>
                            <button className="owner-delete-btn" onClick={openModal}>
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                        <div className="mest-info-detail">
                            <h5 className="book-name">{book?.title}</h5>
                            <h6 className="book-category">{book?.category?.name}</h6>
                            <h6 className="book-author">Author: {book?.author?.name}</h6>
                            <h6 className="book-price">Price: $ {book?.price}</h6>
                            <p className="book-description">{book?.description}</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        <div>
            <p className="break-line"></p>
        </div>

        
        </div>
    );
}

export default Book_Info;