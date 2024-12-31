import React from 'react';
import './PostSkeleton.css'; // Add CSS for skeleton styling

const PostSkeleton = () => {
  return (
    <div className='post-container skeleton'>

      <div className='user-pic-information'>
        <div className='leftSideUserProfile'>
          <div className='userImage skeleton-box'></div>

          <div className='userInformation'>
            <div className='skeleton-line short'></div>
            <div className='skeleton-line very-short'></div>
          </div>
        </div>

        <div className='rightSideUserProfile'>
          <div className='skeleton-button'></div>
          <div className='skeleton-button'></div>
        </div>
      </div>

      <div className='postImage skeleton-box'></div>

      <div className='description'>
        <div className='skeleton-line'></div>
        <div className='skeleton-line'></div>
      </div>

      <div className='createAndUpdate description'>
        <div className='skeleton-line short'></div>
      </div>

      <div className='like-comment-share'>
        <div className='skeleton-line short'></div>
        <div className='skeleton-line short'></div>
        <div className='skeleton-line short'></div>
      </div>

      <div className='comment-section'>
        <div className='skeleton-line'></div>
        <div className='skeleton-line'></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
