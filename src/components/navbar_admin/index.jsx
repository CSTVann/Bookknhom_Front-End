import React, { useState, useEffect } from "react";
import "../../assets/style/admin/navbar_admin.css"
import Link from "next/link";
import { useRouter } from 'next/router';

function Navbar_admin() {
    const router = useRouter();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    // Handle responsive navigation for mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
        };
        
        // Set initial state
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Notify about sidebar state changes
    useEffect(() => {
        // Create and dispatch custom event for sidebar state
        const event = new CustomEvent('sidebarStateChange', {
            detail: {
                collapsed: isCollapsed,
                visible: isNavVisible
            }
        });
        window.dispatchEvent(event);
    }, [isCollapsed, isNavVisible]);
    
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };
    
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    
    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        
        // Redirect to login page
        router.push('/login');
    };
    
    return (
        <>
            <button className="navbar-toggle" onClick={toggleNav}>
                <i className="bi bi-list"></i>
            </button>
            
            <div className={`container-admin-navbar ${isNavVisible ? 'show' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="logo-section">
                    <h3>E-Book</h3>
                    <button className="collapse-btn" onClick={toggleCollapse}>
                        <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
                    </button>
                </div>
                
                <Link href="/admin">
                    <button><i className="bi bi-book"></i> <span>Books</span></button>
                </Link>
                <Link href="/admin/author">
                    <button><i className="bi bi-person"></i> <span>Authors</span></button>
                </Link>
                <Link href="/admin/category">
                    <button><i className="bi bi-tags"></i> <span>Categories</span></button>
                </Link>
                <Link href="/admin/suggestbookpage">
                    <button><i className="bi bi-lightbulb"></i> <span>Suggestions</span></button>
                </Link>
                <Link href="/admin/user">
                    <button><i className="bi bi-people"></i> <span>Users</span></button>
                </Link>
                {/* <Link href="/admin/datarecovery"><button><i className="bi bi-arrow-counterclockwise"></i> <span>Recovery</span></button></Link> */}
                
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
                </button>
            </div>
        </>
    );
}

export default Navbar_admin