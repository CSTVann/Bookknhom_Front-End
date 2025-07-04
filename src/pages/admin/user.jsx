import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import configs from '../../../configs.json';
import Navbar_admin from '@/components/navbar_admin';
import Link from 'next/link';
import '../../assets/style/admin/style.css';
import '../../assets/style/admin/responsive.css';


const User = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // The issue is that we're using /api/users but that endpoint isn't implemented in the backend
      // Instead, we'll use the getUsersWithBookCount endpoint which is implemented
      
      const apiUrl = `${configs.host}/api/users/with-book-count`;
      
      // Directly try with axios
      const response = await axios.get(apiUrl);
      
      if (response.data) {
        // This endpoint should return an array directly
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          // Try to find any array in response to use
          const keys = Object.keys(response.data);
          
          for (const key of keys) {
            if (Array.isArray(response.data[key])) {
              setUsers(response.data[key]);
              break;
            }
          }
          
          if (users.length === 0) {
            setError("API response format is not as expected. Check console for details.");
          }
        }
      } else {
        setError("API returned empty response");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      
      // More detailed error information
      if (error.response) {
        setError(`Server error: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        setError("No response from server. Check your network connection.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${configs.host}/api/users/${userId}`);
      // Refresh user list after deletion
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      <Navbar_admin />
      
      <div className={`admin-page-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-header">
          <h1>Users Management</h1>
          
          <div className="admin-actions">
            <button 
              className="create-new-btn" 
              onClick={fetchUsers}
            >
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
        </div>
        
        <div className="admin-table-container">
          <div className="admin-table-header">
            <h2>All Users</h2>
          </div>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <div className="loading-indicator">Loading users...</div>
          ) : (
            <div className="admin-table">
              <div className="admin-table-head">
                <div className="table-cell cell-id">ID</div>
                <div className="table-cell cell-username">Username</div>
                <div className="table-cell cell-email">Email</div>
                <div className="table-cell cell-books">Books</div>
                <div className="table-cell cell-actions">Actions</div>
              </div>
              
              {users && users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="admin-table-row">
                    <div className="table-cell cell-id">{user.id}</div>
                    <div className="table-cell cell-username">{user.name}</div>
                    <div className="table-cell cell-email">{user.email}</div>
                    <div className="table-cell cell-books">{user.books_count || 0}</div>
                    <div className="table-cell cell-actions">
                      <div className="action-buttons">
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data-message">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
