import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentsList from '../CommentsList/index.jsx';
import "../../assets/style/comment_v2/style.css"
import configs from "../../../configs.json"

const CommentsContainer = ({ book }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [user, setUser] = useState(null);
    const bookId = book ? book.id : null;

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const headers = { 'Authorization': `Bearer ${accessToken}` };
                const response = await axios.get(`${configs.host}/api/users/getAuth`, { headers });
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Fetch comments based on bookId
    useEffect(() => {
        const fetchComments = async () => {
            if (!bookId) return;
            try {
                const response = await axios.get(`${configs.host}/api/comments/book/${bookId}`);
                setComments(response.data.comments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [bookId]);


    // Handle comment submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            console.error("User not loaded yet");
            return;
        }
        if (!bookId) {
            console.error("Book ID not available");
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${accessToken}` };
            const newComment = {
                name: user.name,
                comment: commentText,
                commenter_id: user.id,
                user_id: user.id,
                book_id: bookId
            };

            if (!newComment.comment) {
                console.error("Comment cannot be blank");
                return;
            }

            const response = await axios.post(`${configs.host}/api/comments`, newComment, { headers });
            const addedComment = response.data.comment;
            setComments([addedComment, ...comments]);
            setCommentText('');
        } catch (error) {
            if (error.response) {
                console.error('Error adding comment:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };

    return (
        <div className="add-cmt">
            <div className='add-cmt-container'>
                <h3 className='add-cmt-title'>Add a Comment</h3>
                <form onSubmit={handleSubmit} className='form-cmt'>
                    <textarea
                        className='input-cmt'
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Your Comment"
                        required
                    />
                    <button type="submit" className='submit-cmt'>Submit</button>
                </form>
            </div>
            <CommentsList comments={comments} />
        </div>
    );
};

export default CommentsContainer;
