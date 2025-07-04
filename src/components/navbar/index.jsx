import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../assets/style/nav_v2/style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import configs from '../../../configs.json';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import Link from "next/link";


const apiClient = axios.create({
    baseURL: `${configs.host}`,
    withCredentials: false, // This allows cookies to be sent across domains
});
const Navbar = ({
        ParamSearchTerm, 
        ParamSearchType, 
        searchHandler}) => {
    const router = useRouter();

    const [searchType, setSearchType] = useState(ParamSearchType || 'book');
    const [searchTerm, setSearchTerm] = useState(ParamSearchTerm);
    const [open, setOpen] = React.useState(false);
    const [suggestbook, setSuggestbook] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = () => {
        router.push({
            pathname: '/book_listing',
            query: { searchTerm, searchType }
        });
        if (router.pathname == '/book_listing') {
            searchHandler(searchTerm, searchType)
        }
        
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    useEffect(() => {
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarNav = document.querySelector(".navbar-nav");
      
        if (navbarToggler && navbarNav) {
          const toggleNavbar = () => {
            navbarNav.classList.toggle("active");
          };
      
          // Toggle navbar on navbar toggler click
          navbarToggler.addEventListener("click", toggleNavbar);
      
          apiClient.get('../../api/suggestbook')
            .then(response => {
              console.log(response.data.data);
              setSuggestbook(response.data.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
      
          // Cleanup function to remove event listener
          return () => {
            navbarToggler.removeEventListener("click", toggleNavbar);
          };
        }
      }, []);

    // =========================

    const [formData, setFormData] = useState({
        author_name: '',
        book_name: '',
        current_date: '2024-05-12 00:00:00',
        created_at: 'null',
        updated_at: 'null',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmits = async (e) => {
        e.preventDefault();
        try {
          await axios.post('/api/suggestionbook', formData);
          console.log('Data uploaded successfully');
          // Reset form after successful upload
          setFormData({
            author_name: '',
            book_name: '',
            current_date: '2024-05-12 00:00:00',
            created_at: 'null',
            updated_at: 'null',
          });
        } catch (error) {
          console.error('Error uploading data:', error);
        }
      };


    // =========================

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <nav className="navbar_v2">
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Suggest Book</DialogTitle>
                <DialogContent>
                <DialogContentText>Include Author's name and books</DialogContentText>
                    <form>
                        <TextField autoFocus required margin="dense" id="name" value={formData.author_name} onChange={handleChange} name="author_name" label="Author's name" type="text" fullWidth variant="standard"/>
                        <TextField autoFocus required margin="dense" id="name" value={formData.book_name} onChange={handleChange} name="book_name" label="Author's book" type="text" fullWidth variant="standard"/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <span onClick={handleSubmits}><Button onClick={handleClose} type="submit">Suggest</Button></span>       
                </DialogActions>
            </Dialog>
            <nav className="navbar">
                <Link className="navbar-brand" href="/">
                    <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.0423565 17.5349L13.9598 0.5L19.0648 0.507022L26.543 9.71226L21.4322 13.8121L16.5022 7.74351L6.78689 19.635L16.5172 32.0628L41.3431 0.545432L46.5168 0.547292L59.915 17.5822L60 21.4885L47.225 39.264L42.0665 39.5L34.0691 30.2948L39.0409 26.0295L44.308 32.0921L53.2285 19.6799L43.9273 7.85406L19.0955 39.3789L13.9174 39.3713L0 21.5958L0.0423565 17.5349Z" fill="#6251DD"/>
                    </svg>
                </Link>
                <div className="search-container search-button-menu" style={{display: "flex", alignItems: "center"}}>
                    <input 
                        className="search" 
                        type="text" 
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="search-for">Search for</div>
                    <select className="search-type" value={searchType} onChange={handleSearchTypeChange}>
                        <option value="book">Book's Name</option>
                        <option value="author">Author's Name</option>
                        <option value="category">Category</option>
                    </select>
                </div>
                <ul className="navbar-nav">
                    <li>
                        <Link href="/profile_for_themselve" className="user-function">
                            <div className="bi bi-person"></div>
                            <span className="icon-text">Profile</span>
                        </Link>
                    </li>
                    <li className="item-none">
                        <svg version="1.0" style={{width: "17px", height: "17px", padding: "12px"}} xmlns="http://www.w3.org/2000/svg"
                        width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M2379 4655 c-629 -119 -986 -785 -739 -1378 92 -222 305 -435 527
                        -527 144 -60 221 -74 398 -74 176 1 243 14 388 74 221 92 426 295 523 520 64
                        148 77 215 77 400 0 137 -3 178 -21 242 -51 186 -135 332 -267 463 -132 133
                        -281 218 -463 266 -102 27 -317 34 -423 14z m386 -210 c223 -62 415 -222 514
                        -428 62 -128 75 -191 75 -347 0 -156 -13 -219 -74 -346 -100 -208 -294 -368
                        -520 -431 -91 -24 -309 -24 -400 0 -227 63 -429 231 -524 437 -48 106 -66 179
                        -73 300 -21 392 244 737 632 824 88 20 283 15 370 -9z"/>
                        <path d="M3115 2515 c-333 -166 -767 -168 -1103 -5 -46 22 -89 40 -97 40 -7 0
                        -64 -23 -126 -50 -481 -215 -844 -522 -1079 -913 -171 -286 -270 -663 -270
                        -1032 l0 -125 1145 0 c1233 0 1187 -2 1215 49 20 39 12 91 -19 122 l-29 29
                        -1057 0 -1057 0 6 78 c60 695 451 1234 1135 1565 117 57 126 60 155 47 79 -32
                        258 -90 326 -105 45 -10 144 -19 250 -22 252 -8 390 18 661 123 l46 18 89 -38
                        c107 -46 173 -82 278 -153 95 -64 132 -69 177 -24 38 38 40 96 6 133 -24 26
                        -139 105 -217 150 -45 26 -225 105 -310 137 l-45 16 -80 -40z"/>
                        <path d="M4149 2040 c-25 -4 -65 -18 -90 -30 -61 -30 -953 -919 -980 -975 -17
                        -36 -19 -68 -19 -322 l0 -283 271 0 c177 0 286 4 313 12 35 10 108 78 494 462
                        250 248 466 469 481 491 38 55 55 109 54 181 -1 97 -27 140 -166 282 -129 131
                        -178 166 -242 177 -22 4 -47 8 -55 10 -8 1 -36 -1 -61 -5z m208 -312 c110
                        -110 131 -146 113 -194 -6 -16 -203 -221 -448 -466 l-437 -438 -162 0 -163 0
                        0 164 0 164 446 441 c248 244 456 441 468 443 47 8 83 -14 183 -114z"/>
                        </g>
                        </svg>
                        <Link className="pt-button pt-btn" href="/edit-profile">Edit Profile</Link>
                    </li>
                    <li className="item-none">
                        <i class="bi bi-upload"></i>
                        <Link href="/upload" className="pt-button pt-button-upload">Upload Book</Link>
                    </li>
                    <li>
                        <Link href="#" className="user-function" onClick={handleClickOpen}>
                            <div className="bi bi-chat-square-text"></div>
                            <span className="icon-text">Suggest</span>
                            
                        </Link>
                    </li>
                    <li>
                        <Link href="/book_listing" className="user-function">
                            <div class="bi bi-book"></div>
                            <span className="icon-text">List All Book</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/exchange_request" className="shopping-function">
                            <div class="bi bi-arrow-left-right"></div>
                            <span className="icon-text">Swape Book</span>
                        </Link>
                    </li>
                    <li className="item-none">
                        <i class="bi bi-box-arrow-left"></i>
                        {isLoggedIn ? (
                            <Link href="/" className="logout" onClick={handleLogout}>Log Out</Link>
                                ) : (
                            <Link href="/login" className="logout">Login</Link>
                        )}
                    </li>
                </ul>
                
                <button className="navbar-toggler" style={{ zIndex: 99 }}>&#9776;</button>
            </nav>
        </nav>
    );
};

export default Navbar;
