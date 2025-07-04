import React, { useState, useEffect } from "react";
import "../../assets/style/ppopular.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from "next/link";
import configs from '../../../configs.json';
import axios from 'axios';

const Ppopular = () => {
    const [users, setUsers] = useState([]);
    const [screenWidth, setScreenWidth] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get(`${configs.host}/api/popularUser`);
            if (response.status) {
                setUsers(response.data);
            }
            console.log("users pop", response);
        } catch (error) {
            console.log("users pop err", error);
        }
    };

    useEffect(() => {
        getUsers();

        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth);

            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    let displayedUsers = users;
    if (screenWidth !== null) {
        if (screenWidth < 654) {
            displayedUsers = users.slice(0, 4);
        } else if (screenWidth < 879) {
            displayedUsers = users.slice(0, 6);
        } else if (screenWidth < 1103) {
            displayedUsers = users.slice(0, 8);
        } else if (screenWidth < 1329) {
            displayedUsers = users.slice(0, 5)
        } else if (screenWidth < 1554) {
            displayedUsers = users.slice(0, 6)
        } else if (screenWidth < 1779) {
            displayedUsers = users.slice(0, 7)
        } else if (screenWidth < 2004) {
            displayedUsers = users.slice (0, 8)
        } else if (screenWidth < 2229) {
            displayedUsers = users.slice (0, 9)
        }
    }

    return (
        <div className="p-people">
            <div className="p-people-container">
                <div className="p-people-header">
                    <h1>Popular People</h1>
                </div>
                <div className="list-p-people">
                    {displayedUsers.map((people, index) => (
                        <div key={index} className="p-people-content">
                            <div className="p-people-card">
                                {people.image ? (
                                    <img className="img-pf" src={`data:image/jpeg;base64,${people.image}`} alt="" />
                                ) : (
                                    <img className="img-pf" src={'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'} alt="" />

                                )} 
                                <h4 className="name-pf">{people.name}</h4>
                                <p className="value-name">Total Books{'\n'}{people.books_count}</p>
                                <Link href={{ pathname: `/name-profile/${people.id}` }} className="view-detail">View Detail</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ppopular;
