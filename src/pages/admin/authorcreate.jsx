import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/style/author/style.css';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import Link from 'next/link';
import configs from '../../../configs.json';

const EditBook = () => {

  const router = useRouter();

  const [id, setId] = useState();
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: formData.name,
      }
      // console.log("data", data)
      await axios.post(`${configs.host}/api/authors`, data);
      // await axios.put('./../../api/admin', data);
      // console.log('Data uploaded successfully');
      setFormData({
        name: '',
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };
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

  useEffect(() => {
    if (router.query.admin) {
      const parseData = JSON.parse(router.query.admin)
      console.log("parseData", parseData)
      setFormData({
        title: parseData.title,
      });
      setId(parseData.id);
    }
  }, [router.query.admin]);
  const handleUploadClick = () => {
    // Navigate back to the previous page
    window.location.reload();
    router.back();
  };

  return (
    <div>
    <div className='okokok'>
        <Link href="/admin/author" className='aaaaaaa'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 11 20" fill="none">
            <path d="M8.7 19.0999L0.275 10.6999C0.175 10.5999 0.104333 10.4916 0.0629997 10.3749C0.0209997 10.2582 0 10.1332 0 9.9999C0 9.86657 0.0209997 9.74157 0.0629997 9.6249C0.104333 9.50824 0.175 9.3999 0.275 9.2999L8.7 0.874902C8.93333 0.641569 9.225 0.524902 9.575 0.524902C9.925 0.524902 10.225 0.649902 10.475 0.899902C10.725 1.1499 10.85 1.44157 10.85 1.7749C10.85 2.10824 10.725 2.3999 10.475 2.6499L3.125 9.9999L10.475 17.3499C10.7083 17.5832 10.825 17.8706 10.825 18.2119C10.825 18.5539 10.7 18.8499 10.45 19.0999C10.2 19.3499 9.90833 19.4749 9.575 19.4749C9.24167 19.4749 8.95 19.3499 8.7 19.0999Z" fill="#090937"/>
          </svg>
        </Link>

      </div>
    <div className='container-author-post'>
      <h2>Post Author</h2>
      <form onSubmit={handleSubmit} className='container-author-form'>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=' Name Author'/>
        <button type="submit"onClick={handleUploadClick} className='yyybbbyyy'>Upload</button>
      </form>
    </div>
    </div>
  );
};

export default EditBook;