import React, { useState } from 'react';
import "../styles/PostCard.css";

const PostCardBody = ({ pos }) => {
  const [readMore, setReadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const showNextImage = () => {
    if (currentImage < pos.images.length - 1) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const showPrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  return (
    <div className="postcardbody">
      <div className="postcardbodycontent">
        {pos.content && pos.content.length < 60 ? (
          pos.content
        ) : readMore ? (
          pos.content + '...'
        ) : (
          pos.content.slice(0, 60) + '..... '
        )}
        {pos.content && pos.content.length > 60 && (
          <span
            className="read-more"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? 'Hide' : 'Show'}
          </span>
        )}
      </div>
      <div className="postcardbodyimage">
        <button
          className="postcardbodyimageprev"
          onClick={showPrevImage}
          disabled={currentImage === 0}
          aria-label="Show previous image"
        >
          &lt;
        </button>
        {pos.images && pos.images.length > 0 && pos.images.map((image, index) => (
          index === currentImage && (
            <div className="postcardbodyimages" key={index}>
              {image.secure_url.match(/video/i) ? (
                <video controls src={image.secure_url} alt={pos.user?.fullname} />
              ) : (
                <img src={image.secure_url} alt={pos.user?.fullname} />
              )}
            </div>
          )
        ))}
        <button
          className="postcardbodyimagenext"
          onClick={showNextImage}
          disabled={currentImage === pos.images.length - 1}
          aria-label="Show next image"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PostCardBody;