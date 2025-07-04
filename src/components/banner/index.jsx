import React, { useEffect } from "react";
import "../../assets/style/banner.css";
import Image from "next/image";
import slide1 from "../../assets/image/slide7.jpg";
import slide2 from "../../assets/image/slide8.jpg";
import slide3 from "../../assets/image/slide10.jpg";

const Banner = () => {
  useEffect(() => {
    let slideIndex = 0;
    showSlides();
    function showSlides() {
      let slides = document.getElementsByClassName("mySlides");
      if (slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
      }
    }
  }, []);

  return (
    <div className="banner">
      <div className="container">
        <div className="slideshow-container">
          <div className="mySlides fade">
            <Image className="image-banner" src={slide1} alt="Slide 1" />
            <h2>
              <strong style={{ color: "#F0B861" }}>Welcome to</strong>
              <br />
              E-Book Exchange !!!
            </h2>
          </div>
          <div className="mySlides fade">
            <Image className="image-banner" src={slide2} alt="Slide 2" />
            <h2>
              <strong style={{ color: "#F0B861" }}>Welcome to</strong>
              <br />
              E-Book Exchange !!!
            </h2>
          </div>
          <div className="mySlides fade">
            <Image className="image-banner" src={slide3} alt="Slide 3" />
            <h2>
              <strong style={{ color: "#F0B861" }}>Welcome to</strong>
              <br />
              E-Book Exchange !!!
            </h2>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Banner;
