import React, { useEffect, useState } from 'react';
import "../../assets/style/carousel2.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';
import Swaperight from "../../assets/image/swape_right.svg";
import Swapeleft from "../../assets/image/swape_left.svg";
import axios from "axios";
import configs from '../../../configs.json';
import Link from 'next/link';

const BooksColumn = ({ user, books }) => {
  const [slides, setSlides] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateItemsPerSlide = () => {
    const width = window.innerWidth;
    if (width <= 654) {
      setItemsPerSlide(1);
    } else if (width < 1024) {
      setItemsPerSlide(2);
    } else if (width < 1440) {
      setItemsPerSlide(3);
    } else {
      setItemsPerSlide(4);
    }
  };

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  useEffect(() => {
    let slidesData = [];
    for (let i = 0; i < books.length; i += itemsPerSlide) {
      slidesData.push(books.slice(i, i + itemsPerSlide));
    }
    setSlides(slidesData);
  }, [books, itemsPerSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const truncateTitle = (title) => {
    // Remove newlines and truncate the title
    const cleanTitle = title.replace(/[\r\n]+/g, " ");
    return cleanTitle.length > 25 ? cleanTitle.substring(0, 25) + "." : cleanTitle;
  }

  return (
    <div className='carousel2'>
      <h2 className='carousel-title'>Books Listing</h2>
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
            <button className='swape-left' onClick={prevSlide} aria-label="Previous Slide">
              <i className="bi bi-chevron-left"></i>
              <Image className='swape-left-btn' src={Swapeleft} alt="Previous" />
            </button>
            <div className="card-container">
              {slide.map((book, i) => (
                <Link style={{textDecoration: "none"}} className="link-item" href={{ pathname: `/Book_Detail_Owner/${book.id}` }}>
                  <div className="card" key={i}>
                    <div className="book-details">
                      {book.image ? (
                        <img className="image-card" src={`data:image/jpeg;base64,${book.image}`} alt="Book" />
                      ) : (
                        <img className="image-card" src={book.image_url} alt="Book" />
                      )}
                      <p className="name-book">{truncateTitle(book.title)}</p>  
                    </div>
                    <div className='dsjff' style={{display:'flex'}}>
                        <div className="flex-row" style={{flexDirection: "column"}}>
                          <p className="author-book">Category: {book.category?.name}</p>
                          <p className="author-book">Author: {book.author?.name}</p>
                        </div>
                        <div className="flex-end">
                          <p className="price-book">${book.price}</p>
                        </div>
                        
                      </div>
                  </div>
                </Link>   
              ))}
            </div>
            <button className='swape-right' onClick={nextSlide} aria-label="Next Slide">
              <Image className="swape-left-btn" src={Swaperight} alt="Next" />
              <i className="bi bi-chevron-right"></i>
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

export default BooksColumn;
