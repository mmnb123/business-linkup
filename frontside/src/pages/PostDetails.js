import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/PostDetails.css";

const PostDetails = () => {
    const { id } = useParams(); // Correctly getting the id from the URL
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Post ID from URL:', id); // Log the ID to ensure it is correctly retrieved

        const fetchPost = async () => {
            if (!id) {
                setError('Invalid post ID');
                return;
            }
            try {
                const token = localStorage.getItem('adminAccessToken');
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPost(res.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError(err.response ? err.response.data.msg : 'Error fetching post');
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-details-container">
            <div className="post-header">
                <div className="post-user">
                    <img src={post.user.avatar} alt={post.user.fullname} />
                    <div className="post-user-info">
                        <h3>{post.user.fullname}</h3>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="post-image">
                <img src={post.images[0]?.secure_url} alt="Post" />
            </div>
            <div className="post-content">
                {post.content}
            </div>
            <div className="post-interactions">
                <div className="likes">
                    <svg> {/* Like icon SVG */} </svg>
                    <span>{post.likes?.length} likes</span>
                </div>
                <div className="comments">
                    <span>{post.comments?.length} comments</span>
                </div>
            </div>
            <div className="comments-section">
                <h4>Comments</h4>
                {post.comments?.map(comment => (
                    <div key={comment._id} className="comment">
                        <img src={comment.user.avatar} alt={comment.user.fullname} />
                        <div className="comment-content">
                            <div className="comment-user-info">
                                <strong>{comment.user.fullname}</strong>
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;