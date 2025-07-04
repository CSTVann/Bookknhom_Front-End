import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../../assets/style/author/style.css';
import '../../assets/style/admin/style.css';
import '../../assets/style/admin/responsive.css';
import configs from '../../../configs.json';
import Navbar_admin from '@/components/navbar_admin';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';


const apiClient = axios.create({
    baseURL: `${configs.host}`,
    withCredentials: false, // This allows cookies to be sent across domains
});

const Author = () => {
    const router = useRouter();
    const [authors, setAuthors] = useState([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    
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
    
    useEffect(() => {
      fetch('/api/author')
        .then(response => response.json())
        .then(data => {
          console.log(data.data);
          setAuthors(data.data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleDeleteAuthor = async (authorID) => {
      try {
        await apiClient.delete(`/api/authors/${authorID}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    };


    return (
        <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
            <Navbar_admin />
            
            <div className={`admin-page-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
              <div className="admin-header">
                <h1>Authors Management</h1>
                <div className="admin-actions">
                  <Link href="/admin/authorcreate">
                    <button className="create-new-btn">
                      <i className="bi bi-plus-circle"></i> Add New Author
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h2>Authors</h2>
                </div>
                
                <div className="admin-table">
                  <div className="admin-table-head">
                    <div className="table-cell cell-id">ID</div>
                    <div className="table-cell cell-author">Name</div>
                    <div className="table-cell cell-actions">Actions</div>
                  </div>
                  
                  {authors?.map((author) => (
                    <div key={author.id} className="admin-table-row">
                      <div className="table-cell cell-id">{author.id}</div>
                      <div className="table-cell cell-author">{author.name}</div>
                      <div className="table-cell cell-actions">
                        <div className="action-buttons">
                          <Link href={{pathname: `/admin/Author/${author.id}`, query: { author: JSON.stringify(author) }}}>
                            <button className="action-btn edit-btn">
                              <i className="bi bi-pencil"></i>
                            </button>
                          </Link>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={() => handleDeleteAuthor(author.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
    );
};

export default Author;