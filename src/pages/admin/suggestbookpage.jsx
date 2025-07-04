import React, { useState, useLayoutEffect, useEffect } from 'react';
import axios from 'axios';
import configs from '../../../configs.json';
import '../../assets/style/admin/style.css';
import '../../assets/style/admin/responsive.css';
import Navbar_admin from '@/components/navbar_admin';
import { useRouter } from 'next/router';

const apiClient = axios.create({
    baseURL: `${configs.host}`,
    withCredentials: false, // This allows cookies to be sent across domains
});

export default function SuggestBookPage() {
    const [suggestbook, setSuggestbook] = useState([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const router = useRouter();
    
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
        apiClient.get('./api/suggestbook')
            .then(response => {
                console.log(response.data.data);
                setSuggestbook(response.data.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
            <Navbar_admin />
            
            <div className={`admin-page-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="admin-header">
                    <h1>Book Suggestions</h1>
                </div>
                
                <div className="admin-table-container">
                    <div className="admin-table-header">
                        <h2>Received Suggestions</h2>
                    </div>
                    
                    <div className="admin-table">
                        <div className="admin-table-head">
                            <div className="table-cell cell-id">ID</div>
                            <div className="table-cell cell-author">Author</div>
                            <div className="table-cell cell-title">Book Name</div>
                            <div className="table-cell cell-date">Date</div>
                        </div>
                        
                        {suggestbook.map(book => (
                            <div key={book.id} className="admin-table-row">
                                <div className="table-cell cell-id">{book.id}</div>
                                <div className="table-cell cell-author">{book.author_name}</div>
                                <div className="table-cell cell-title">{book.book_name}</div>
                                <div className="table-cell cell-date">{book.current_date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
