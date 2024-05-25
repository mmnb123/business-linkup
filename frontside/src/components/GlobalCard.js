import React, { useState } from 'react';
import { useSelector } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";
import GlobalFriendBtn from './GlobalFriendBtn';
import "../styles/GlobalCard.css";

const GlobalCard = ({ user }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showInfoAbout, setShowInfoAbout] = useState(false);
  const { auth } = useSelector(state => state);

  const toggleShowInfo = (infoType) => {
    if (infoType === 'showinfo') {
      setShowInfo(true);
      setShowInfoAbout(false);
    } else if (infoType === 'showinfoabout') {
      setShowInfo(false);
      setShowInfoAbout(true);
    }
  };

  return (
    <div className="globalcard">
      <div className="globalcard-content">
        <div className="globalcard-content-top">
          <img src={user.avatar} alt="User Avatar" />
        </div>
        <div className="globalcard-content-middle">
          <img src={user.avatar} alt="User Avatar" />
        </div>
        <Link to={`/profile/${user._id}`}>
          <div className="globalcard-content-middle-info">
            <h4>{user.fullname}</h4>
            <h6>@{user.username}</h6>
          </div>
        </Link>
        {showInfo && (
          <>
            <div className="globalcard-content-bottom">
              <div className="globalcard-content-bottom-stat">
                <h6>{user.friends.length}</h6>
                <p>Friends</p>
              </div>
              <div className="globalcard-content-bottom-stat">
                <h6>{user.following.length}</h6>
                <p>Following</p>
              </div>
              <div className="globalcard-content-bottom-stat">
                <h6>0</h6>
                <p>Posts</p>
              </div>
            </div>
            <div className="globalcard-content-bottom-gender">
              <PersonIcon style={{ color: user.gender === 'male' ? 'blue' : 'pink' }} />
            </div>
            {auth.user._id !== user._id && (
              <GlobalFriendBtn className="globalcard-content-bottom-btn" user={user} />
            )}
          </>
        )}
        {showInfoAbout && (
          <div className="globalcard-content-bottom-about">
            <p className="globalcard-content-bottom-about-story">{user.story}</p>
            <h4 className="globalcard-content-bottom-about-email">{user.email}</h4>
            <h5 className="globalcard-content-bottom-about-website">{user.website}</h5>
          </div>
        )}
        <div className="globalcard-content-bottom-navigate">
          <span onClick={() => toggleShowInfo('showinfo')}>o</span>
          <span onClick={() => toggleShowInfo('showinfoabout')}>o</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalCard;