import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../../assets/style/adminstyle/edit.css';
import { useLayoutEffect } from 'react';
import Link from 'next/link';
import configs from '../../../../configs.json';

const EditBook = () => {
  const router = useRouter();

  const [id, setId] = useState();
  const [formData, setFormData] = useState({
    user_id: '',
    like: '',
    image_url: '',
    title: '',
    author_id: '',
    description: '',
    price: '',
    category_id: '',
    event_datetime: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
  
    // Check if userData is not null and has the necessary structure
    if (userData && userData.user && userData.user.id !== undefined) {
      const userId = parseInt(userData.user.id, 10);
  
      // Temporary condition to test redirection logic
      if (Number.isInteger(userId) && userId >= 3) {
        router.push('/');
      }
    } else {
      // Handle the case where userData is null or has an unexpected structure
      console.error("userData is not in the expected format.");
      router.push('/');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = {
        user_id: formData.user_id,
        like: formData.like,
        title: formData.title,
        author_id: formData.author_id,
        category_id: formData.category_id,
        price: formData.price,
        description: formData.description,
        image_url: formData.image_url,
      }
      
      await axios.put(`${configs.host}/api/books/update/${id}`, data);
      await axios.put(`${configs.host}/api/recorddata/${id}`, data);
      
      setSuccessMessage('Book updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error uploading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.admin) {
      const parseData = JSON.parse(router.query.admin)
      setFormData({
        user_id: parseData.user_id,
        like: parseData.like,
        image_url: parseData.image_url,
        title: parseData.title,
        author_id: parseData.author_id,
        category_id: parseData.category_id,
        description: parseData.description,
        price: parseData.price,
        event_datetime: parseData.created_at,
      });
      setId(parseData.id);
    }
  }, [router.query.admin]);

  return (
    <div className='container-everything-edit-admin'>
      <form onSubmit={handleSubmit} className='container-admin-edit-form'>
        <div className='container-back-edit-admin'>
          <Link href="/admin">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 20" fill="none">
              <path d="M8.7 19.0999L0.275 10.6999C0.175 10.5999 0.104333 10.4916 0.0629997 10.3749C0.0209997 10.2582 0 10.1332 0 9.9999C0 9.86657 0.0209997 9.74157 0.0629997 9.6249C0.104333 9.50824 0.175 9.3999 0.275 9.2999L8.7 0.874902C8.93333 0.641569 9.225 0.524902 9.575 0.524902C9.925 0.524902 10.225 0.649902 10.475 0.899902C10.725 1.1499 10.85 1.44157 10.85 1.7749C10.85 2.10824 10.725 2.40002 10.475 2.65002L3.125 9.9999L10.475 17.3499C10.7083 17.5832 10.825 17.8706 10.825 18.2119C10.825 18.554 10.7 18.8499 10.45 19.0999C10.2 19.3499 9.90833 19.4749 9.575 19.4749C9.24167 19.4749 8.95 19.3499 8.7 19.0999Z" fill="#090937"/>
            </svg>
          </Link>
          <div className='admin-edit-id'>
            <label>User ID:</label>
            <span>{formData.user_id}</span>
          </div>
        </div>
        
        <h2 className='container-admin-edit'>Edit Book Details</h2>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <div className='container-form-edit-admin'>
          <div className='container-edit-form-hhh'>
            <div className='every-form'>
              <label>Book Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter book title"
              />
            </div>
            
            <div className='every-form'>
              <label>Image URL</label>
              <input 
                type="text" 
                name="image_url" 
                value={formData.image_url} 
                onChange={handleChange} 
                placeholder="Enter image URL"
              />
            </div>
            
            <div className='every-form'>
              <label>Author ID</label>
              <input 
                type="text" 
                name="author_id" 
                value={formData.author_id} 
                onChange={handleChange} 
                placeholder="Enter author ID"
              />
            </div>
            
            <div className='every-form'>
              <label>Category ID</label>
              <input 
                type="number" 
                name="category_id" 
                value={formData.category_id} 
                onChange={handleChange} 
                placeholder="Enter category ID"
              />
            </div>
          </div>
          
          <div className='container-edit-form-hhh'>
            <div className='every-form'>
              <label>Price ($)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="Enter price"
                step="0.01"
              />
            </div>
            
            <div className='every-form'>
              <label>Like Count</label>
              <input 
                type="number" 
                name="like" 
                value={formData.like} 
                onChange={handleChange} 
                placeholder="Enter like count"
              />
            </div>
            
            <div className='every-form'>
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter book description"
              />
            </div>
          </div>
        </div>
        
        <div className='edit-row-two create-button-submit'>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
