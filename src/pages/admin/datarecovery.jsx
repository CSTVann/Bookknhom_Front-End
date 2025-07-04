import React, { useState, useEffect, useLayoutEffect } from 'react';
import Navbar_admin from '@/components/navbar_admin';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import configs from '../../../configs.json';
import Image from 'next/image'; // Import the Image component from next/image
import '../../assets/style/admin/style.css';
import '../../assets/style/admin/responsive.css';

const apiClient = axios.create({
    baseURL: `${configs.host}`,
    withCredentials: false, // This allows cookies to be sent across domains
});

function DataRecovery() { // Renamed the component to start with an uppercase letter
    const router = useRouter();
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetch('/api/recovery')
            .then(response => response.json())
            .then(data => {
                console.log("data", data.data);
                setAdmins(data.data);
            })
            .catch(error => console.error('Error fetching posts:', error));
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

    return (
        <div>
            <Navbar_admin />
            <h1 className='title-admin'>Admins List</h1>
            <div>
                <div className="container-head-admin container-head-adminone admin-id">
                    <p className='for-admin-all for-admin-id both-admin-id'>ID</p>
                    <p className='for-admin-all for-admin-image both-admin-id'>User ID</p>
                    <p className='for-admin-all for-admin-date both-admin-id'>Category ID</p>
                    <p className='for-admin-all for-admin-image both-admin-id'>Like</p>
                    <p className='for-admin-all for-admin-image both-admin-id'>Cover</p>
                    <p className='for-admin-all for-admin-name both-admin-id'>Book&apos;s Name</p> {/* Escaped the apostrophe */}
                    <p className='for-admin-all for-admin-image both-admin-id'>Author ID</p>
                    <p className='for-admin-all for-admin-detail both-admin-id'>Detail</p>
                    <p className='for-admin-all for-admin-price both-admin-id'>Price</p>
                    <div className='create-for-adminttt both-admin-id'>
                        <Link style={{ textDecoration: 'none' }} href="#">
                            <div className='create-for-admin-link both-admin-id'></div>
                        </Link>
                    </div>
                </div>
                {admins?.map((admin) => (
                    <div key={admin.id}>
                        <div className="container-body-admin admin-id container-head-admintwo">
                            <div className='for-admin-alls for-admin-id both-admin-id'>{admin.id}</div>
                            <div className='for-admin-alls for-admin-image both-admin-account'>{admin.user_id}</div>
                            <div className='for-admin-alls for-admin-date both-admin-account'>{admin.category_id}</div>
                            <div className='for-admin-alls for-admin-image both-admin-account'>{admin.like}</div>
                            <Image className='for-admin-alls for-admin-image both-admin-account' src={admin.image_url} alt={admin.title} width={50} height={50} /> {/* Replaced <img> with <Image /> */}
                            <div className='for-admin-alls for-admin-name both-admin-account'>{admin.title}</div>
                            <div className='for-admin-alls for-admin-image both-admin-account'>{admin.author_id}</div>
                            <div className='for-admin-alls for-admin-detail both-admin-account'>{admin.description}</div>
                            <div className='for-admin-alls for-admin-price both-admin-account'>{admin.price}</div>
                            <div className='create-for-adminsss both-admin-id container-edit-delete-admin'>
                                <div className='admin-delete admin-edit-delete admin-edit'>
                                    <Link style={{ textDecoration: 'none' }} href={{ pathname: `#${admin.id}`, query: { admin: JSON.stringify(admin) } }}>
                                        <div className='admin-delete admin-edit-delete admin-edit'></div>
                                    </Link>
                                </div>
                                <button className='admin-delete admin-edit-delete'></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataRecovery; // Exporting the component with the correct name
