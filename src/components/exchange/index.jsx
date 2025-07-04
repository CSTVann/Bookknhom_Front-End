import React, {useState, useEffect} from "react";
import "../../assets/style/exchange.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from "next/image";
import Swape from "../../assets/image/swape.svg";
import axios from "axios";
import configs from '../../../configs.json'
import Empty from "../../assets/image/empty.png"
import { useRouter } from 'next/router';
import Link from "next/link";


const ExchangeBook = () => {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [req, setReq] = useState([])
    const [rec, setRec] = useState([])

    const getExchanges = async () => {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          try {
            const response = await axios.get(`${configs.host}/api/exchanges/user/${user.user.id}`);
            if (response.status) {
              setReq(response?.data?.send)
              setRec(response?.data?.receive)
            }
          } catch (error) {
            console.log("Error Get Book", error)
          }
              
        } else {
          router.push('/login');
        }
    };

    const handleAccept = async (id) => {
        try {
            const response = await axios.put(`${configs.host}/api/exchanges/accept/${id}`);
            if (response.status) {
                setState(!state);
            }
        } catch (error) {
            console.log("Error Get Book", error)
        }
    }
    const handleReject = async (id) => {
        try {
            const response = await axios.put(`${configs.host}/api/exchanges/reject/${id}`);
            if (response.status) {
                setState(!state);
            }
        } catch (error) {
            console.log("Error Get Book", error)
        }
    }

    useEffect(() => {
        let isMounted = true;
  
        if (isMounted) {
          getExchanges()
        }
        return () => {
          isMounted = false;
        }
    }, [state])

    const truncateTitle = (title) => {
        // Remove newlines and truncate the title
        const cleanTitle = title.replace(/[\r\n]+/g, " ");
        return cleanTitle.length > 25 ? cleanTitle.substring(0, 25) + "..." : cleanTitle;
    }

    const truncateDescription = (description) => {
        const cleanDescription = description?.replace(/[\r\n]+/g, " ");
        return cleanDescription?.length > 170 ? cleanDescription.substring(0, 170) + "..." : cleanDescription;
    }

    return (
        <div className="exchange">
            <div className="exchange-container">
                <div className="exchange-header">
                    <Link href="/">
                      <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M12.604 18.0834L5.58317 11.0834C5.49984 11 5.44095 10.9097 5.4065 10.8125C5.3715 10.7153 5.354 10.6111 5.354 10.5C5.354 10.3889 5.3715 10.2847 5.4065 10.1875C5.44095 10.0903 5.49984 10 5.58317 9.91669L12.604 2.89585C12.7984 2.70141 13.0415 2.60419 13.3332 2.60419C13.6248 2.60419 13.8748 2.70835 14.0832 2.91669C14.2915 3.12502 14.3957 3.36808 14.3957 3.64585C14.3957 3.92363 14.2915 4.16669 14.0832 4.37502L7.95817 10.5L14.0832 16.625C14.2776 16.8195 14.3748 17.0589 14.3748 17.3434C14.3748 17.6284 14.2707 17.875 14.0623 18.0834C13.854 18.2917 13.6109 18.3959 13.3332 18.3959C13.0554 18.3959 12.8123 18.2917 12.604 18.0834Z" fill="#090937"/>
                      </svg>
                    </Link>
                    <h1 className="back-to-home">Exchange</h1>
                </div>
                <div className="exchange-contain">
                    <h3 className="exchange-title">Received Requests</h3>
                    {rec.length ? (

                        <div className="container-swipe-card">
                            {rec.map((book, index) => (
                                <div key={index} className="card-book-swipe">
                                    <div className="cards">
                                        <div className="card1">
                                            {book.send_book?.image ? (
                                                <img className="img-pf" src={`data:image/jpeg;base64,${book.send_book?.image}`} alt="" />
                                            ) : (
                                                <img className="img-pf" src={book.send_book?.image_url} alt="" />
                                            ) }
                                            <div className="box-detail">
                                                <h4 className="name-pf">{truncateTitle(book.send_book?.title)}</h4>
                                                <p className="value-name">{book.send_book?.category?.name}</p>
                                                <p className="value-name">Author: {book.send_book?.author?.name}</p>
                                                <p className="book-detail">{truncateDescription(book.send_book?.description)}</p>
                                                <h5 className="user-name">Owner: {book.send_user?.name}</h5>
                                            </div>
                                        </div>
                                        <Image src={Swape} className="swape-cmp"></Image>
                                        <div className="card2">
                                            {book.receive_book?.image ? (
                                                <img className="img-pf" src={`data:image/jpeg;base64,${book.receive_book?.image}`} alt="" />
                                            ) : (
                                                <img className="img-pf" src={book.receive_book?.image_url} alt="" />
                                            ) }
                                            <div className="box-detail">
                                                <h4 className="name-pf">{truncateTitle(book.receive_book?.title)}</h4>
                                                <p className="value-name">{book.receive_book?.category?.name}</p>
                                                <p className="value-name">Author: {book.receive_book?.author?.name}</p>
                                                <p className="book-detail">{truncateDescription(book.receive_book?.description)}</p>
                                                <h5 className="user-name">Owner: {book.receive_user?.name}</h5>
                                                <p className="phone-number">Phone: {book.receive_user?.phone}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="below-card">
                                        <div className="left-item">
                                            <h5 className="date">Date: {book.date}</h5>
                                            <h5 className="chat">Request: {book.description}</h5>
                                        </div>
                                        <div className="right-item">
                                            <p className="status">
                                            {book.accept ? (
                                                book.reject ? (
                                                    <>
                                                        <span className="circle red"></span>Rejected
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="circle green"></span>Accepted
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <span className="circle yellow"></span>Waiting
                                                </>
                                            )}
                                            </p>
                                            { !book.accept && !book.reject &&
                                                <div className="btn-ar">
                                                    <button className="btn-reject" onClick={()=> handleReject(book.id)}>Reject</button>
                                                    <button className="btn-accept" onClick={()=> handleAccept(book.id)}>Accept</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ): (
                        <div className="empty-container">
                            <Image src={Empty} className="image-empty"></Image>
                            <h1 className="empty">Empty</h1>
                        </div>
                    )}
                </div>
                <div className="exchange-contain">
                    <h3 className="exchange-title">Sent Requests</h3>
                    {req.length ? (
                        <div className="container-swipe-card">
                            {req.map((book, index) => (
                                <div key={index} className="card-book-swipe">
                                    <div className="cards">
                                        <div className="card1">
                                            {book.send_book?.image ? (
                                                <img className="img-pf" src={`data:image/jpeg;base64,${book.send_book?.image}`} alt="" />
                                            ) : (
                                                <img className="img-pf" src={book.send_book?.image_url} alt="" />
                                            ) }
                                            <div className="box-detail">
                                                <h4 className="name-pf">{truncateTitle(book.send_book?.title)}</h4>
                                                <p className="value-name">{book.send_book?.category?.name}</p>
                                                <p className="value-name">Author: {book.send_book?.author?.name}</p>
                                                <p className="book-detail">{truncateDescription(book.send_book?.description)}</p>
                                                <h5 className="user-name">Owner: {book.send_user?.name}</h5>
                                            </div>
                                        </div>
                                        <Image src={Swape} className="swape-cmp"></Image>
                                        <div className="card2">
                                            {book.receive_book?.image ? (
                                                <img className="img-pf" src={`data:image/jpeg;base64,${book.receive_book?.image}`} alt="" />
                                            ) : (
                                                <img className="img-pf" src={book.receive_book?.image_url} alt="" />
                                            ) }
                                            <div className="box-detail">
                                                <h4 className="name-pf">{truncateTitle(book.receive_book?.title)}</h4>
                                                <p className="value-name">{book.receive_book?.category?.name}</p>
                                                <p className="value-name">Author: {book.receive_book?.author?.name}</p>
                                                <p className="book-detail">{truncateDescription(book.receive_book?.description)}</p>
                                                <h5 className="user-name">Owner: {book.receive_user?.name}</h5>
                                                <p className="phone-number">Phone: {book.receive_user?.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="below-card">
                                        <div className="left-item">
                                            <h5 className="date">Date: {book.date}</h5>
                                            <h5 className="chat">Request: {book.description}</h5>
                                        </div>
                                        <div className="right-item">
                                            <p className="status">
                                            {book.accept ? (
                                                book.reject ? (
                                                    <>
                                                        <span className="circle red"></span>Rejected
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="circle green"></span>Accepted
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    <span className="circle yellow"></span>Waiting
                                                </>
                                            )}
                                            </p>
                                            { book.accept &&
                                                <h4 className="name-pf">{book.receive_user?.phone}</h4>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-container">
                            <Image src={Empty} className="image-empty"></Image>
                            <h1 className="empty">Empty</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ExchangeBook;