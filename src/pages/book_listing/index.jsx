import React, {useEffect, useState} from "react";
import "../../assets/style/booklisting.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import head from "next/head";
import Link from "next/link";
import axios from "axios";
import configs from '../../../configs.json';
import { useRouter } from 'next/router';

const Ppopular = () => {
    const router = useRouter();

    const { searchTerm, searchType } = router.query;
    const [searchingTerm, setSearchingTerm] = useState(searchTerm);
    const [searchingType, setSearchingType] = useState(searchType || 'book');
    const [books, setBooks] = useState([]);

    const [category, setCategory] = useState();
    const [author, setAuthor] = useState()

    const [selectCategory, setSelectCategory] = useState([]);
    const [selectAuthor, setSelectAuthor] = useState([]);

    const handleLike = async (bookId, event) => {
        // Stop event propagation to prevent navigation
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        try {
            const token = localStorage.getItem('accessToken');
            
            if (!token) {
                console.error('No authentication token found. Redirecting to login page...');
                // You can redirect to the login page or display a message here
                return;
            }
            
            const response = await axios.post(`${configs.host}/api/books/${bookId}/like`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (response.status === 200 || response.status === 409) {
                setBooks(books.map(book =>
                    book.id === bookId ? { ...book, liked: true, like: book.like + 1 } : book
                ));
    
                // Update local storage with the new liked status and like count
                const updatedBooks = books.map(book =>
                    book.id === bookId ? { ...book, liked: true, like: book.like + 1 } : book
                );
                localStorage.setItem('books', JSON.stringify(updatedBooks));
            }
        } catch (error) {
            console.error('Error liking the book:', error);
            console.error('Error message:', error.message);
            console.error('Error response:', error.response);
            // Add more error handling logic here if needed
        }
    };

    const handleAuthorChange = (event) => {
      setAuthor(parseInt(event.target.value));
      getBooks(searchingTerm, searchingType, parseInt(event.target.value), category)
    };

    const handleCategoryChange = (event) => {
      setCategory(parseInt(event.target.value));
      getBooks(searchingTerm, searchingType, author, parseInt(event.target.value))
    };

    const getBooks = async (searchName = searchingTerm || 'all', type = searchingType, filterAuthor=author, filterCategory=category) => {
      try {
          let response;
          console.log("searchingTerm", searchName, type, filterAuthor, filterCategory);
          if ((searchName && type) || filterAuthor || filterCategory) {
            response = await axios.post(`${configs.host}/api/books/search/${searchName}/${type}`, {
              author_id: filterAuthor,
              category_id: filterCategory,
            });
          } else {
            response = await axios.get(`${configs.host}/api/books/index`);
          }
          if (response.status) {
              setBooks(response.data);
          }
          console.log("getPopularBooks", response);
      } catch (error) {
          console.log("getPopularBooks", error);
      }
    }

    const getCategory = async () => {
        // const user = JSON.parse(localStorage.getItem('user'))  
        try {
          const response = await axios.get(`${configs.host}/api/category`);
            if (response.status) {
                setSelectCategory(response.data.data)
            }
        } catch (error) {
        }
    }
    const getAuthor = async () => {
        // const user = JSON.parse(localStorage.getItem('user'))  
        try {
          const response = await axios.get(`${configs.host}/api/authors`);
            if (response.status) {
                setSelectAuthor(response.data.data)
            }
        } catch (error) {
        }
    }

    const truncateTitle = (title) => {
      // Remove newlines and truncate the title
      const cleanTitle = title.replace(/[\r\n]+/g, " ");
      return cleanTitle.length > 20 ? cleanTitle.substring(0, 20) + "." : cleanTitle;
    }

    useEffect(() => {
      let isMounted = true;

      if (isMounted) {
        getBooks();
        getAuthor();
        getCategory();
      }
      return () => {
        isMounted = false;
      }
    }, []);

    return (
        <div>
          <title>Bookknhom</title>
          <meta name="description" content="This is the home page description" />
          <meta name="keywords" content="home, dashboard, popular, banner" />
          <meta name="author" content="Your Name" />
          <meta name="description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
          <meta property="og:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="SEO for Developers: 10 Best Practices to Know"/>
          <meta property="og:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
          <meta property="og:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta property="twitter:domain" content="semrush.com"/>
          <meta property="twitter:url" content="https://www.semrush.com/blog/seo-for-developers/"/>
          <meta name="twitter:title" content="SEO for Developers: 10 Best Practices to Know"/>
          <meta name="twitter:description" content="Using SEO best practices for web developers ensures more people see your site in search engines."/>
          <meta name="twitter:image" content="https://static.semrush.com/blog/uploads/media/53/82/5382a8d356a1848d5ec1dfaeb387f9db/a7ae53b9828c45f801ab5be8a0f4b030/seo-for-developers-sm.png"/>
          <Navbar 
            ParamSearchTerm={searchingTerm} 
            ParamSearchType={searchingType} 
            SetParamSearchTerm={setSearchingTerm} 
            SetParamSearchType={setSearchingType} 
            searchHandler={getBooks} 
          />
            <div className="booklisting">
              <div className="booklisting-container">
                  <div className="booklisting-header">
                      <div className="book-title">
                        <Link href="/">
                          <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <path d="M12.604 18.0834L5.58317 11.0834C5.49984 11 5.44095 10.9097 5.4065 10.8125C5.3715 10.7153 5.354 10.6111 5.354 10.5C5.354 10.3889 5.3715 10.2847 5.4065 10.1875C5.44095 10.0903 5.49984 10 5.58317 9.91669L12.604 2.89585C12.7984 2.70141 13.0415 2.60419 13.3332 2.60419C13.6248 2.60419 13.8748 2.70835 14.0832 2.91669C14.2915 3.12502 14.3957 3.36808 14.3957 3.64585C14.3957 3.92363 14.2915 4.16669 14.0832 4.37502L7.95817 10.5L14.0832 16.625C14.2776 16.8195 14.3748 17.0589 14.3748 17.3434C14.3748 17.6284 14.2707 17.875 14.0623 18.0834C13.854 18.2917 13.6109 18.3959 13.3332 18.3959C13.0554 18.3959 12.8123 18.2917 12.604 18.0834Z" fill="#090937"/>
                          </svg>
                        </Link>
                        <h1>All Book for Exchange</h1>
                      </div>
                      <div style={{display: "flex"}}>
                        <select className="search-type" value={author} onChange={handleAuthorChange}>
                            <option value="" disabled selected hidden="">Select Author</option>
                            {selectAuthor && selectAuthor.map((author, i) => {
                              return (<>
                                  <option value={author.id}>{author.name}</option>
                              </>)
                            })}
                        </select>
                        <select className="search-type" value={category} onChange={handleCategoryChange}>
                            <option className="option" value="" disabled selected hidden="">Select Category</option>
                            {selectCategory && selectCategory.map((categ, i) => {
                              return (<>
                                  <option className="option" value={categ.id}>{categ.name}</option>
                              </>)
                            })}
                        </select>
                      </div>
                  </div>
                  <div className="list-booklisting">
                      {books.map((book, index) => (
                          <div key={index} className="booklisting-content">
                            <Link href={{pathname: `/Book_Detail/${book.id}`}} className="book-link">
                              <div className="booklisting-card">
                                  {book.image ? (
                                    <img 
                                      className="img-pf" 
                                      src={`data:image/jpeg;base64,${book.image}`} 
                                      alt={book.title || "Book cover"} 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-book.png";
                                      }}
                                    />
                                  ) : book.image_url ? (
                                    <img 
                                      className="img-pf" 
                                      src={book.image_url} 
                                      alt={book.title || "Book cover"} 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-book.png";
                                      }}
                                    />
                                  ) : (
                                    <div className="img-pf placeholder-image">
                                      <span>No Image Available</span>
                                    </div>
                                  )}
                                  <div className="box">
                                  <h4 className="name-book">{truncateTitle(book.title)}</h4>
                                  </div>
                                  <p className="category-name">Category: {book.category_name}</p>
                                  <p className="author-name">Author: {book.author_name}</p>
                                  <div className="box">
                                    <img 
                                      className="author-pf" 
                                      src={book.user_image ? `data:image/jpeg;base64,${book.user_image}` : "/placeholder-user.png"} 
                                      alt="User profile" 
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-user.png";
                                      }}
                                    />
                                    <div className="left">
                                      <div>
                                        <p className="user-name">{book.user_name}</p>
                                      </div>
                                    </div>
                                    <div className="right">
                                        <button
                                            onClick={(event) => handleLike(book.id, event)}
                                            disabled={book.liked}
                                            style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: book.liked ? 'not-allowed' : 'pointer',
                                            opacity: book.liked ? 0.5 : 1
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M0.777109 6.63351C0.469185 6.75132 0.286579 6.93754 0.186324 7.23396C0.111134 7.46579 0.111134 15.0437 0.189905 15.2793C0.265096 15.5111 0.397575 15.6745 0.608825 15.7999C0.733122 15.8721 0.874302 15.9102 1.01804 15.9102H2.2666C3.69881 15.9102 3.73819 15.9064 3.87783 15.8303C4.06044 15.7239 4.20366 15.5719 4.30391 15.3781C4.35337 15.2781 4.3791 15.1681 4.3791 15.0565V11.2927C4.3791 8.05864 4.37194 7.33277 4.32898 7.21116C4.26811 7.02495 4.0676 6.78932 3.88141 6.68291C3.73819 6.60311 3.69523 6.59931 2.32031 6.59171C1.22109 6.58411 0.877363 6.59171 0.777109 6.63351Z" fill="#38385F"/>
                                                    <path d="M9.30623 0.446635C9.16659 0.632853 9.12005 0.997685 9.0556 2.35821C9.02337 3.02327 9.01621 3.06507 8.91238 3.2893C8.71187 3.72633 8.44333 4.01896 7.02903 5.33388C5.94055 6.34477 5.46076 6.89962 5.33545 7.29866C5.30322 7.39367 5.29248 8.46157 5.29248 11.308V14.9796C5.29248 15.1171 5.32178 15.253 5.37841 15.3782C5.48225 15.61 5.61473 15.7468 5.83314 15.8494C5.99068 15.9254 6.10526 15.9292 9.44945 15.9711C11.3471 15.9939 13.0228 16.0053 13.1732 15.9977C13.6566 15.9673 14.0289 15.6936 14.2366 15.2148C14.4299 14.7701 14.3404 14.1887 14.0253 13.8315C13.9638 13.7643 13.9865 13.6566 14.0698 13.6198L14.0898 13.611C14.3583 13.4932 14.5803 13.269 14.7164 12.9764C14.8131 12.7674 14.831 12.6838 14.831 12.4557C14.8345 12.1023 14.745 11.8363 14.5481 11.6045L14.534 11.5877C14.4627 11.5035 14.4932 11.3743 14.5947 11.3308C14.8381 11.2206 15.0888 10.9698 15.2105 10.7038C15.2857 10.5442 15.3 10.4567 15.3 10.1527C15.3 9.83349 15.2893 9.76889 15.1998 9.59407C15.146 9.48386 15.0565 9.33945 14.9957 9.26724C14.9433 9.20205 14.967 9.10491 15.0435 9.0712L15.0816 9.05442C15.3143 8.95181 15.5399 8.72759 15.6652 8.46917C15.8013 8.18794 15.8228 7.7167 15.7118 7.40887C15.6187 7.13905 15.368 6.83882 15.1246 6.70201C15.0048 6.63471 14.8699 6.59904 14.7325 6.59837L12.6254 6.588C11.3471 6.5842 10.3052 6.56519 10.3052 6.54999C10.3052 6.53479 10.3875 6.32577 10.4878 6.08635C10.7563 5.43649 10.9748 4.76763 11.1287 4.12917C11.6264 2.04658 11.2254 0.708858 10.0152 0.404831C9.88986 0.374428 9.69293 0.347826 9.58193 0.347826C9.40649 0.347826 9.37068 0.359227 9.30623 0.446635Z" fill="#38385F"/>
                                                </svg>
                                        </button>
                                        <p className="count">{book.like}</p>
                                    </div>
                                  </div>
                              </div>
                            </Link>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          <Footer />
        </div>
    );
}
export default Ppopular;
