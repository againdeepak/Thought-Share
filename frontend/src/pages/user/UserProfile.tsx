import React, { useEffect, useState } from 'react';
import { userInfoHook } from '../../hooks/userHook';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../lib/axiosInstance';
interface UserInfo {
  _id: string;
  userName: string;
  email: string;
  posts: string[];
  userPic: string;
  // Add other fields if needed
}

export const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [photo, setPhoto] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [picLoading, setPicLoading] = useState<boolean>(false);
  const [uploadBtn, setUploadBtn] = useState<boolean>(false);
  const [editProfilePic, setEditProfilePic] = useState<boolean>(false);

  let checkUserPic = "https://res.cloudinary.com/dxwcmq53m/image/upload/v1731397366/UploadPic_uhmgsf.png";
  const userInfoHandler = async () => {

    try {
      setLoading(true);
      const response = await userInfoHook();
      setUserInfo(response);
      setLoading(false);
    } catch (err) {
      toast.error(err as string);
    }
  };

  useEffect(() => {
    userInfoHandler();
  }, []);

  // Upload a picture...
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dxwcmq53m"); // Replace with your Cloudinary cloud name
    setUploadBtn(true);

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dxwcmq53m/image/upload", formData);
      setPicLoading(false);
      return response.data.url; // Get the image URL from Cloudinary response
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPicLoading(true);

    // Delete the existing photo of userProfile... If you are updating it again
    // Because we don't want to store the image on cloud
    if (editProfilePic) { // If this is true, delete first 
      if (userInfo?.userPic) {
        var urlImage = userInfo?.userPic.split('/');
        const publicId = urlImage[urlImage?.length - 1].split('.')[0];
        // Delete image with public id...
        await axiosInstance.post(`/cloud/image/delete`, { publicId }, { withCredentials: true });
      }
    }
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setPhoto(imageUrl); // Set the Cloudinary image URL in state
      }
    }
  };
  const updateUserPicHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = userInfo?._id;
    await axiosInstance.put(`/user/profile/${userId}/update`, { photo }, { withCredentials: true });
    // Fetch Updated image...
    userInfoHandler();
    setUploadBtn(false);
    setEditProfilePic(false);
  }
  const editProfileImageHandler = () => {
    setEditProfilePic(true);
  }
  return (
    <div className='user-information'>
      {(userInfo && !loading) ? (
        <>
          {
            ((userInfo.userPic === checkUserPic) || userInfo.userPic === "" || editProfilePic) ? (
              // Showing the input form...
              <div className="user-profile-pic mb-5" >
                <form onSubmit={updateUserPicHandler}>
                  <label htmlFor="file-input">
                    <div className='user-profile-pic' >
                      {
                        !picLoading ? (<img
                          src={uploadBtn ? photo : checkUserPic}
                          alt="user_pic"
                          className="profile-image"
                        />) : (<img src='Loading.gif' alt='userPicLoading' />)
                      }
                    </div>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }} // Hide the file input
                  />
                  <br />
                  {
                    <button type='submit' className='d-flex justify-content-center mt-3 btn btn-light' disabled={!uploadBtn}>Upload profile</button>
                  }
                </form>
              </div>
            ) : (
              // Showing the actual photo...After uploading of user...
              <>
                <div className='user-profile-pic' >
                  <img src={userInfo.userPic} alt='user_pic' />
                </div>

                <div>
                  <button className='btn btn-outline-light mt-3' onClick={editProfileImageHandler}>Edit Image</button>
                </div>
              </>

            )
          }
          <div className='userNameEmail'>
            <div>
              <strong>{userInfo.userName}</strong>
            </div>
            <div>
              <strong>Email</strong>: {userInfo.email}
            </div>
            <div>
              <strong>Posts</strong>: {userInfo.posts.length}
            </div>
            <div className='d-flex justify-content-between'>
              <span><strong>Follows</strong>: 0</span> <span><strong>Following</strong>: 0</span>
            </div>
          </div>
        </>
      ) : (
        <div className="card p-3" style={{ width: '18rem', height: '20rem', opacity: 0.8 }}>
          {/* Profile Picture Placeholder */}
          <div className="d-flex justify-content-center mb-3">
            <div
              className="rounded-circle bg-secondary placeholder-glow"
              style={{
                width: '80px',
                height: '80px',
              }}
            >
              <span className="placeholder col-12 h-100 w-100 rounded-circle" />
            </div>
          </div>

          {/* User Information Placeholder */}
          <div className="text-center">
            <h5 className="placeholder-glow">
              <span className="placeholder col-6" />
            </h5>
            <p className="placeholder-glow">
              <span className="placeholder col-4 me-1" />
              <span className="placeholder col-4" />
            </p>

            <div className="placeholder-glow">
              <span className="placeholder col-8 mb-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
