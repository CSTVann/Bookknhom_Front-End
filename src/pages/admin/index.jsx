import { useState, useEffect } from 'react';
import '../../assets/style/admin/style.css';
import '../../assets/style/admin/responsive.css';
import '../../assets/style/adminstyle/edit.css';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import configs from '../../../configs.json';
import Navbar_admin from '@/components/navbar_admin';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';


const apiClient = axios.create({
  baseURL: `${configs.host}`,
  withCredentials: false, // This allows cookies to be sent across domains
});

export default function Admin() {
  const router = useRouter();
  
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState({ total_books: 0, total_authors: 0, total_users: 0, total_exchanges: 0 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    fetch('./api/admin')
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        setAdmins(data);
      })
      .catch(error => console.error('Error fetching posts:', error));
      
    // Fetch dashboard stats - update URL structure to match Laravel API routes
    fetch(`${configs.host}/api/dashboard/stats`)
      .then(response => response.json())
      .then(data => {
        console.log("Dashboard stats:", data);
        setStats(data);
      })
      .catch(error => console.error('Error fetching dashboard stats:', error));
  }, []);

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

  const handleDeleteAdmin = async (adminID) => {
    try {
      await fetch(`./api/admin?id=${adminID}`, {
        method: 'DELETE',
      });
      // apiClient.post('/api/books/store').then(res => {
      //   console.log("res", apiClient)
      // })
      window.location.reload();
      //comment only Optionally, you can fetch the updated list of companies after deletion
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />

      <Navbar_admin />
      
      <div className={`admin-page-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <Link href="/admin/Greate">
              <button className="create-new-btn">
                <i className="bi bi-plus-circle"></i> Add New Book
              </button>
            </Link>
          </div>
        </div>
        
        <div className="dashboard-stats-wrapper">
          <div className="dashboard-stats">
            <div className="stat-card books-card">
              <div className="stat-icon">
                <i className="bi bi-book"></i>
              </div>
              <div className="stat-info">
                <h3>Total Books</h3>
                <p>{stats.total_books}</p>
              </div>
            </div>
            
            <div className="stat-card authors-card">
              <div className="stat-icon">
                <i className="bi bi-person"></i>
              </div>
              <div className="stat-info">
                <h3>Total Authors</h3>
                <p>{stats.total_authors}</p>
              </div>
            </div>
            
            <div className="stat-card users-card">
              <div className="stat-icon">
                <i className="bi bi-people"></i>
              </div>
              <div className="stat-info">
                <h3>Total Users</h3>
                <p>{stats.total_users}</p>
              </div>
            </div>
            
            <div className="stat-card exchanges-card">
              <div className="stat-icon">
                <i className="bi bi-arrow-left-right"></i>
              </div>
              <div className="stat-info">
                <h3>Total Exchanges</h3>
                <p>{stats.total_exchanges}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2>Books Management</h2>
          </div>
          
          <div className="admin-table">
            <div className="admin-table-head">
              <div className="table-cell cell-id">ID</div>
              <div className="table-cell cell-username">User Name</div>
              <div className="table-cell cell-category">Category</div>
              <div className="table-cell cell-likes">Likes</div>
              <div className="table-cell cell-cover">Cover</div>
              <div className="table-cell cell-title">Book Title</div>
              <div className="table-cell cell-author">Author</div>
              <div className="table-cell cell-description">Description</div>
              <div className="table-cell cell-price">Price</div>
              <div className="table-cell cell-actions">Actions</div>
            </div>
            
            {admins?.map((admin) => (
              <div key={admin.id} className="admin-table-row">
                <div className="table-cell cell-id">{admin.id}</div>
                <div className="table-cell cell-username">{admin.user_name}</div>
                <div className="table-cell cell-category">{admin.category_name}</div>
                <div className="table-cell cell-likes">{admin.like}</div>
                <div className="table-cell cell-cover">
                  {admin.image ? (
                    <img 
                      className="book-cover" 
                      src={`data:image/jpeg;base64,${admin.image}`}
                      alt={admin.title || "Book cover"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-book.png";
                      }}
                    />
                  ) : admin.image_url ? (
                    <img 
                      className="book-cover" 
                      src={admin.image_url}
                      alt={admin.title || "Book cover"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-book.png";
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      No Image
                    </div>
                  )}
                </div>
                <div className="table-cell cell-title">{admin.title}</div>
                <div className="table-cell cell-author">{admin.author_name}</div>
                <div className="table-cell cell-description">
                  <div className="description-preview">
                    {admin.description && admin.description.length > 80 
                      ? admin.description.substring(0, 80) + '...' 
                      : admin.description}
                  </div>
                  {admin.description && admin.description.length > 80 && (
                    <div className="description-tooltip">
                      {admin.description}
                    </div>
                  )}
                </div>
                <div className="table-cell cell-price">${admin.price}</div>
                <div className="table-cell cell-actions">
                  <div className="action-buttons">
                    <Link href={{pathname: `/admin/Edit/${admin.id}`, query: { admin: JSON.stringify(admin) }}}>
                      <button className="action-btn edit-btn">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </Link>
                    <button className="action-btn delete-btn" onClick={() => handleDeleteAdmin(admin.id)}>
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
}
