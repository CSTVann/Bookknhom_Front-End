import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../assets/style/admin/greate.css';
import { useLayoutEffect } from 'react';
import configs from '../../../configs.json';
import Navbar_admin from '@/components/navbar_admin';

const CreateBook = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [formData, setFormData] = useState({
    user_id: '1', // Default to admin user ID
    like: '0',
    image_url: '',
    title: '',
    author_id: '',
    author_name: '',
    description: '',
    price: '',
    category_id: '',
  });

  // Listen for sidebar collapse state change
  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail && typeof e.detail.collapsed !== 'undefined') {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };
    
    window.addEventListener('sidebarStateChange', handleSidebarChange);
    
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarChange);
    };
  }, []);

  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
  
    // Check if userData is not null and has the necessary structure
    if (userData && userData.user && userData.user.id !== undefined) {
      const userId = parseInt(userData.user.id, 10);
  
      console.log(userId); // Should print 4
  
      // Temporary condition to test redirection logic
      if (Number.isInteger(userId) && userId >= 3) {
        console.log('Redirecting to home'); // This should print if the condition is true
        router.push('/');
      }
    } else {
      // Handle the case where userData is null or has an unexpected structure
      console.error("userData is not in the expected format.");
      router.push('/');
    }
  }, [router]);

  // Fetch authors and categories when component mounts
  useEffect(() => {
    // Only fetch categories since we're using a text input for authors
    axios.get(`${configs.host}/api/categories`)
      .then(response => {
        console.log('Categories raw response:', response);
        
        let categoryData = [];
        // Handle different API response structures
        if (response.data && response.data.data) {
          categoryData = response.data.data;
        } else if (Array.isArray(response.data)) {
          categoryData = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // If it's an object with category entries
          categoryData = Object.values(response.data);
        } else {
          // Fallback categories if API doesn't return expected format
          categoryData = [
            { id: 1, name: 'Fiction' },
            { id: 2, name: 'Non-Fiction' },
            { id: 3, name: 'Mystery' },
            { id: 4, name: 'Romance' },
            { id: 5, name: 'Science Fiction' }
          ];
        }
        
        console.log('Processed categories:', categoryData);
        setCategories(categoryData);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        // Fallback categories if API request fails
        setCategories([
          { id: 1, name: 'Fiction' },
          { id: 2, name: 'Non-Fiction' },
          { id: 3, name: 'Mystery' },
          { id: 4, name: 'Romance' },
          { id: 5, name: 'Science Fiction' }
        ]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${configs.host}/api/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.image_url; // Assuming the API returns the image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      // Return a placeholder or fallback URL if upload fails
      return 'https://via.placeholder.com/150';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if a new one was selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }
      
      // Handle author (either get existing ID or create new author)
      let authorId = formData.author_id;
      if (formData.author_name && !formData.author_id) {
        try {
          // Check if author already exists
          const authorsResponse = await axios.get(`${configs.host}/api/authors`);
          let authors = [];
          
          if (authorsResponse.data && authorsResponse.data.data) {
            authors = authorsResponse.data.data;
          } else if (Array.isArray(authorsResponse.data)) {
            authors = authorsResponse.data;
          }
          
          // Find if author already exists
          const existingAuthor = authors.find(
            author => author.name.toLowerCase() === formData.author_name.toLowerCase()
          );
          
          if (existingAuthor) {
            // Use existing author ID
            authorId = existingAuthor.id;
            console.log(`Found existing author with ID: ${authorId}`);
          } else {
            // Create new author
            console.log('Creating new author:', formData.author_name);
            const createAuthorResponse = await axios.post(`${configs.host}/api/authors/store`, {
              name: formData.author_name
            });
            
            if (createAuthorResponse.data && createAuthorResponse.data.id) {
              authorId = createAuthorResponse.data.id;
            } else if (createAuthorResponse.data && createAuthorResponse.data.data && createAuthorResponse.data.data.id) {
              authorId = createAuthorResponse.data.data.id;
            } else {
              console.log('Author created but ID not returned, using default');
              authorId = 1; // Fallback to ID 1 if can't create author
            }
          }
        } catch (error) {
          console.error('Error handling author:', error);
          // Fallback to ID 1 if author handling fails
          authorId = 1;
        }
      }
      
      const data = {
        user_id: formData.user_id,
        like: formData.like,
        title: formData.title,
        author_id: authorId, // Use the author ID we got
        price: formData.price,
        description: formData.description,
        image_url: imageUrl,
        category_id: formData.category_id,
      };
      
      console.log("Submitting data:", data);
      
      await axios.post(`${configs.host}/api/books/store`, data);
      await axios.post(`${configs.host}/api/recorddata`, data);
      
      alert('Book created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Failed to create book. Please try again.');
    }
  };

  useEffect(() => {
    if (router.query.admin) {
      const parseData = JSON.parse(router.query.admin);
      console.log("parseData", parseData);
      
      // Fetch author name if we only have author_id
      const getAuthorName = async (authorId) => {
        try {
          const response = await axios.get(`${configs.host}/api/authors/${authorId}`);
          if (response.data && response.data.name) {
            return response.data.name;
          } else if (response.data && response.data.data && response.data.data.name) {
            return response.data.data.name;
          }
          return '';
        } catch (error) {
          console.error('Error fetching author name:', error);
          return '';
        }
      };
      
      const setupFormData = async () => {
        let authorName = parseData.author_name || '';
        
        // If we have author_id but no author_name, fetch the name
        if (parseData.author_id && !authorName) {
          authorName = await getAuthorName(parseData.author_id);
        }
        
        setFormData({
          user_id: parseData.user_id || '1',
          like: parseData.like || '0',
          image_url: parseData.image_url || '',
          title: parseData.title || '',
          author_id: parseData.author_id || '',
          author_name: authorName,
          description: parseData.description || '',
          price: parseData.price || '',
          category_id: parseData.category_id || '',
        });
        
        if (parseData.image_url) {
          setImagePreview(parseData.image_url);
        }
      };
      
      setupFormData();
    }
  }, [router.query.admin]);

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <Navbar_admin />
      
      <div className={`admin-page-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className='container-create-4admin'>
          <h2>Create New Book</h2>
          <form onSubmit={handleSubmit}>
            <div className='container-form-create-4admin'>
              <div className='container-first-form'>
                <div className='every-form'>
                  <label>Book Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Enter book title"
                    required
                  />
                </div>
                
                <div className='every-form'>
                  <label>Author Name</label>
                  <input 
                    type="text" 
                    name="author_name" 
                    value={formData.author_name} 
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                
                <div className='every-form'>
                  <label>Category</label>
                  <select 
                    name="category_id" 
                    value={formData.category_id} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className='every-form'>
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="Enter price"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className='container-first-form'>
                <div className='every-form'>
                  <label>Book Cover Image</label>
                  <div 
                    className="image-upload-container"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <i className="bi bi-cloud-arrow-up"></i>
                    <div className="image-upload-text">
                      Click to upload an image
                    </div>
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="image-preview"
                      />
                    )}
                  </div>
                </div>
                
                <div className='every-form'>
                  <label>Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange}
                    placeholder="Enter book description"
                    required
                  />
                </div>
                
                <div className='every-form create-button-submit'>
                  <button type="submit">
                    Save Book
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;



/*
// components/AdminUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminUploadForm = () => {

  const [formData, setFormData] = useState({
    user_id: '',
    image_url: '',
    title: '',
    author_name: '',
    detail_book: '',
    price: '',
    event_datetime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('./api/admin', formData);
      console.log('Data uploaded successfully');
      // Reset form after successful upload
      setFormData({
        user_id: '',
        image_url: '',
        title: '',
        author_name: '',
        detail_book: '',
        price: '',
        event_datetime: '',
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div>
      <h2>Upload Admin Data</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="number" name="user_id" value={formData.user_id} onChange={handleChange} />
        <label>Image URL:</label>
        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
        <label>title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        <label>Author Name:</label>
        <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} />
        <label>Detail:</label>
        <textarea name="detail_book" value={formData.detail_book} onChange={handleChange} />
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        <label>Event Date:</label>
        <input type="datetime-local" name="event_datetime" value={formData.event_datetime} onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminUploadForm;
*/