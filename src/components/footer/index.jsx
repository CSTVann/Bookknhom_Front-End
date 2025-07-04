import React from "react";
import "../../assets/style/footer.css";
import Image from "next/image";
import facebook from "../../assets/image/facebook.svg";
import twitter from "../../assets/image/twitter.svg";
import instagram from "../../assets/image/instagram.svg";
import telegram from "../../assets/image/telegram.svg";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="about">
                    <h3>About</h3>
                    <p>Our book exchange website enables users to trade books by listing titles they own. Members browse listings, request trades, and communicate securely, fostering a community of book lovers with shared literary interests.</p>
                </div>
                <div className="quick-link">
                    <h3>Quick Links</h3>
                    <p>Privacy</p>
                    <p>Policy</p>
                    <p>FAQ</p>
                </div>
                <div className="developer">
                    <h3>Developer</h3>
                    <p>Thouen Sothieliya</p>
                    <p>Cheaoun Raneth</p>

                </div>
                <div className="contact-us">
                    <h3>Contact Us</h3>
                    <Link href="">sothieliya@gmail.com</Link>
                    <Link href="">cheaounraneth@gmail.com</Link>
                </div>
            </div>
            <hr />
            <div className="description">
                <div className="left-side">
                    <p>Copyright © 2025 E-Book Exchange <br />all rights reserved</p>
                </div>
                <div className="right-side">
                    <Image className="icon" src={facebook}></Image>
                    <Image className="icon" src={twitter}></Image>
                    <Image className="icon" src={instagram}></Image>
                    <Image className="icon" src={telegram}></Image>
                </div>
            </div>
        </div>
    );
}
export default Footer;