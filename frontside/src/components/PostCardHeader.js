import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { ALERT_TYPES } from "../redux/actions/alertActions";
import { deletePost } from '../redux/actions/postActions';
import { BASE_URL } from "../utils/config";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import "../styles/PostCard.css";

const PostCardHeader = ({ pos }) => {
    const { auth, socket } = useSelector(state => state);
    const [showDrop, setShowDrop] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    if (!pos || !pos.user) {
        // Handle case when `pos` or `pos.user` is null or undefined
        return null;
    }

    const handleEdit = () => {
        dispatch({ type: ALERT_TYPES.STATUS, payload: { ...pos, edit: true } });
        setShowDrop(false);
    };

    const handleDeletePost = () => {
        dispatch(deletePost({ pos, auth, socket }));
        setShowDrop(false);
        history.push('/');
    };

    const handleCopyPostLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${pos._id}`);
        setShowDrop(false);
    };

    const handleReportPost = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ postId: pos._id, reason: reportReason }),
            });

            if (!response.ok) {
                throw new Error('Failed to report post');
            }

            dispatch({
                type: ALERT_TYPES.ALERT,
                payload: { success: 'Post reported successfully' },
            });
            setOpenReport(false);
            setReportReason('');
        } catch (error) {
            console.error('Error reporting post:', error.message);
            dispatch({
                type: ALERT_TYPES.ALERT,
                payload: { error: 'Failed to report post. Please try again later.' },
            });
        }
    };

    return (
        <div className="postcardheader">
            <Link to={`/profile/${pos.user._id}`}>
                <div className="postcardheadertop">
                    <img className="postcardheadertopavatar" src={pos.user?.avatar} alt={pos.user.fullname} />
                    <div className="postcardheaderinfo">
                        <h6>{pos.user?.fullname} <span style={{ color: 'gray', fontSize: '14px', fontWeight: '600' }}> posted </span>{pos.images?.length} {pos.images?.length > 1 ? " images" : " image"} </h6>
                        <h4> {moment(pos.createdAt).fromNow()}</h4>
                    </div>
                </div>
            </Link>
            <div className="postcardheaderdown">
                <p onClick={() => setShowDrop(!showDrop)}>...</p>
                {showDrop && (
                    <div className="postcarddropdown">
                        {auth?.user._id === pos.user._id ? (
                            <>
                                <h6 onClick={() => handleEdit(pos)}>Update Post</h6>
                                <h6 onClick={handleDeletePost}>Delete Post</h6>
                                <h6 onClick={handleCopyPostLink}>Copy Link</h6>
                            </>
                        ) : (
                            <>
                                <h6 onClick={handleCopyPostLink}>Copy Link</h6>
                                <h6 onClick={() => setOpenReport(true)}>Report Post</h6>
                            </>
                        )}
                    </div>
                )}
            </div>
            <Dialog open={openReport} onClose={() => setOpenReport(false)}>
                <DialogTitle>Report Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please provide a reason for reporting this post:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason"
                        type="text"
                        fullWidth
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenReport(false)} color="primary">Cancel</Button>
                    <Button onClick={handleReportPost} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostCardHeader;