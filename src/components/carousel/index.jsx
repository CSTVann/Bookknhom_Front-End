import React, { useEffect, useState } from 'react';
import "../../assets/style/book_list_underP/style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import Swaperight from "../../assets/image/swape_right.svg";
import Swapeleft from "../../assets/image/swape_left.svg";
import axios from "axios";
import configs from '../../../configs.json';
import Link from 'next/link';

const Carousel = ({ user = {} , books}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const updateItemsPerSlide = () => {
    const width = window.innerWidth;
    if (width <= 654) {
      setItemsPerSlide(1);
    } else if (width < 1024) {
      setItemsPerSlide(2);
    } else if (width < 1440) {
      setItemsPerSlide(3);
    } else if (width >= 1440) {
      setItemsPerSlide(4);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getOwnedBooks = async () => {
    if (user && user.id) {
      try {
        const url = `${configs.host}/api/books/user/${user.id}`;
        console.log("Fetching URL:", url);
        const response = await axios.get(url);
        if (response.status === 200) {
          const booksData = response.data.books;
          console.log("Fetched Books Data:", booksData); // Log fetched data
          let slidesData = [];
          for (let i = 0; i < booksData.length; i += itemsPerSlide) {
            slidesData.push(booksData.slice(i, i + itemsPerSlide));
          }
          setSlides(slidesData);
        } else {
          console.error("Failed to fetch books, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    } else {
      console.log("User is not defined or user.id is missing");
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    if (user && user.id) {
      getOwnedBooks();
    }
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      getOwnedBooks();
    }
  }, [itemsPerSlide]);

  const truncateTitle = (title) => {
    // Remove newlines and truncate the title
    const cleanTitle = title.replace(/[\r\n]+/g, " ");
    return cleanTitle.length > 23 ? cleanTitle.substring(0, 23) + "..." : cleanTitle;
  }

  return (
    <div className='carousel'>
      <h2 className='carousel-title'>Book Listing</h2>
      <div className='carousel-container'>
        {slides.length > 0 && slides.map((slide, index) => (
          <div
            className='carousel-slide'
            key={index}
            style={{
              display: index === currentSlide ? 'flex' : 'none',
              width: '100%',
            }}
          >
            <button className='swape-left' onClick={prevSlide}>
              <i class="bi bi-chevron-left"></i>
              <Image className='swape-left-btn' src={Swapeleft} alt="Previous" />
            </button>
            <div className="card-container">
              {slide.map((book, i) => (
                <Link style={{textDecoration: "none"}} className="link-item" href={{ pathname: `/Book_Detail/${book.id}` }}>
                  <div className="card" key={i}>
                    <div className='book-details'>
                      {book.image ? (
                        <img className="image-card" src={`data:image/jpeg;base64,${book.image}`} alt="Book" />
                      ) : book.image_url ? (
                        <img className="image-card" src={book.image_url} alt="Book" />
                      ) : (
                        <img className="image-card" src="/path/to/default-image.jpg" alt="Default Book" /> // Use a valid default image path
                      )}
                      <p className="name-book">{truncateTitle(book.title)}</p>
                      <div className="flex-row">
                        <p className="author-book">{book.author?.name}</p>
                        <p className="price-book">${book.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <button className='swape-right' onClick={nextSlide}>
              <Image className="swape-left-btn" src={Swaperight} alt="Next" />
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        ))}
      </div>
      <div className='indicator'>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              cursor: 'pointer',
              margin: '0 5px',
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? '#EF6B4A' : '#ccc',
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
