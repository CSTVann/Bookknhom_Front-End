import React, { useState, useEffect } from "react";
import axios from "axios";
import configs from '../../../configs.json'
import "../../assets/style/popup_exchange/style.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Popup_Exchange = ({toExchangeBook}) => {
  const router = useRouter();

  const [books, setBooks] = useState([])

  const [selectBook, setSelectBook] = useState();
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);
  };

  const handleBookChange = (event) => {
    setSelectBook(parseInt(event.target.value));
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');
    
    if (userData) {
      const user = JSON.parse(userData);
      try {
        const data = {
          send_user_id: user.user.id,
          receive_user_id: toExchangeBook.user_id,
          send_book_id: selectBook,
          receive_book_id:  toExchangeBook.id,
          accept:false,
          reject:false, 
          date: formatDate(new Date()),
          description: text
        }
        const response = await axios.post(`${configs.host}/api/exchanges/store`, data);
        if (response.status) {
          console.log("getPopularBooks", response)
        }
      } catch (error) {
        console.log("getPopularBooks", error)
      } 
          
    } else {
      router.push('/login');
    }

  };


// =========================


  let [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      try {
        const response = await axios.get(`${configs.host}/api/books/user/${user.user.id}`);
        if (response.status) {
          setBooks(response?.data?.books)
        }
      } catch (error) {
        console.log("Error Get Book", error)
      }
      
      setOpen(true);

    } else {
      router.push('/login');
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };


  // useEffect(() => {
  // }, [])
  return (
    <div className="popup-exchange">
      <Link href="#" className="user-function" onClick={handleClickOpen}>
          <button className="exchange-btn">Exchange Request</button>
      </Link>
      <Dialog open={open} onClose={handleClose} className="exchange-popup" PaperProps={{style: {width: '50%', maxWidth: 'none', gap: "20px"},}}>
          <DialogTitle className="exchange-title">Exchange Request</DialogTitle>
            <div className="info-container">
              <div>
                <select
                value={selectBook} 
                onChange={handleBookChange}
                name="form-select" id="" className="select-form" required>
                  <option value="" disabled selected>Select Book</option>
                  { books.map((book, i) => {
                    return (
                      <option key={book.id} value={book.id}>{book.title} {"[ "}{book?.author?.name}{" ]"}</option>
                    )
                  })}
                </select>
              </div>
              <div>
                <textarea 
                  value={text}
                  onChange={handleTextChange}
                  className="input-form" 
                  name="input-form" 
                  id="" 
                  placeholder="Why you want to exchange the book and why should they exchange for your book?" style={{height: "20vh"}}></textarea>
              </div>
            </div>  
          <DialogActions className="action-form">
              <Button onClick={handleClose} className="cancel-btn">Cancel</Button>
              <Button onClick={handleSubmits} className="submit-btn">Submit</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup_Exchange;
