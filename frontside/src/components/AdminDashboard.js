import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'reactstrap'; // You can use any UI library like Material-UI, Bootstrap, Ant Design, etc.
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [reports, setReports] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem('adminAccessToken');
                const res = await axios.get('http://localhost:5000/api/reports', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const sortedReports = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReports(sortedReports);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            const token = localStorage.getItem('adminAccessToken');
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReports(reports.filter(report => report.post?._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAccessToken');
        history.push('/admin/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="header">
                <h2>Admin Dashboard</h2>
                <Button color="danger" onClick={handleLogout}>Logout</Button>
                {/* Add Link to Manage Users page */}
                <Link to="/admin/manage-users">Manage Users</Link>
            </div>
            <div className="reports-section">
                <h3>Reported Posts</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Post User</th>
                            <th>Reason</th>
                            <th>Action</th>
                            <th>View Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports && reports.length > 0 ? (
                            reports.map(report => (
                                <tr key={report._id}>
                                    <td>
                                        {report.user ? (
                                            <Link to={`/profile/${report.user._id}`}>{report.user.fullname}</Link>
                                        ) : (
                                            "User not available"
                                        )}
                                    </td>
                                    <td>
                                        {report.post?.user ? (
                                            <Link to={`/profile/${report.post.user._id}`}>{report.post.user.fullname}</Link>
                                        ) : (
                                            "Post user not available"
                                        )}
                                    </td>
                                    <td>{report.reason}</td>
                                    <td>
                                        {report.post ? (
                                            <Button color="danger" onClick={() => handleDeletePost(report.post._id)}>Delete Post</Button>
                                        ) : (
                                            "Post already deleted"
                                        )}
                                    </td>
                                    <td>
                                        {report.post ? (
                                            <Link to={`/post/${report.post._id}`}><Button color="info">View Post</Button></Link>
                                        ) : (
                                            "Post not available"
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No reported posts</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AdminDashboard;