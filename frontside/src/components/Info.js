import React, { useState } from 'react';
import "../styles/ProfileInfo.css"
import EditProfile from './EditProfile';
import GlobalFriendBtn from "./GlobalFriendBtn";


const Info = ({ userData, dispatch, auth, profile, post, id }) => {
    const [onEdit, SetOnEdit] = useState(false);

    return (
        <div className="profileinfo">
            {userData.length > 0 && userData.map(user => (
                <div className="profileinfo-container" key={user._id}>
                    <div className="profileinfo-top">
                        <img src={user.avatar} alt="" />
                    </div>
                    <div className="profileinfo-center">
                        <div className="profileinfo-buttons">
                            <a href="/dashboard" className="profileinfo-statistics-link">Show Statistics</a>
                            {user && auth && user?._id === auth.user._id ? (
                                <button className="profileinfo-centerbutton" onClick={() => SetOnEdit(true)}>EDIT PROFILE</button>
                            ) : (
                                <GlobalFriendBtn classbtn="profileinfo-centerbutton" user={user} />
                            )}
                        </div>
                        <img className="profileinfo-centeravatar" src={user.avatar} alt="" />
                    </div>
                    <div className="profileinfo-bottom">
                        <div className="profileinfo-bottomleft">
                            <div className="profileinfo-stat">
                                <h6 className="profileinfo-statnumber">{user.friends.length}</h6>
                                <h6 className="profileinfo-statdesc">FRIENDS</h6>
                            </div>
                            <div className="profileinfo-stat">
                                <h6 className="profileinfo-statnumber">{user.following.length}</h6>
                                <h6 className="profileinfo-statdesc">FOLLOWING</h6>
                            </div>
                        </div>
                        <div className="profileinfo-bottomcenter">
                            <h3 className="profileinfo-fullname">{user.fullname}</h3>
                            <h5 className="profileinfo-username">{user.username}</h5>
                        </div>
                        <div className="profileinfo-bottomright">
                            <div className="profileinfo-stat">
                                <h6 className="profileinfo-statnumber">{post ? post.length : 0}</h6>
                                <h6 className="profileinfo-statdesc">POSTS</h6>
                            </div>
                        </div>
                    </div>
                    {onEdit && <EditProfile user={user} SetOnEdit={SetOnEdit} />}
                </div>
            ))}
        </div>
    );
};

export default Info;