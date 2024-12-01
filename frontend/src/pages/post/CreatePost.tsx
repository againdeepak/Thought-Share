import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { createPostHook } from '../../hooks/postHook';

export const CreatePost: React.FC = () => {
  const [photo, setPhoto] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadBtn, setUploadBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error in AppContext");
  }
  const { authUser } = context;

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dxwcmq53m"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dxwcmq53m/image/upload", formData);
      return response.data.url; // Get the image URL from Cloudinary response
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Failed to upload image.");
      return null;
    }
  };

  const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("You are not authenticated");
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const result = await createPostHook({ photo, description, location });
      if (result) toast.success(result.message);
      setLoading(false);
      navigate('/');
    } catch (err) {
      toast.error(String(err));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadBtn(true);
      const imageUrl = await uploadImage(file);
      console.log("upload now",imageUrl);
      if (imageUrl) {
        setUploadBtn(false);
        setPhoto(imageUrl); // Set the Cloudinary image URL in state
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center pt-2'>
          {/* Loading UI */}
        </div>
      ) : (
        <form onSubmit={createPostHandler} className="container mt-4 p-4 rounded text-white">
          <h3 className="mb-4 text-center">Create Post</h3>
          <div className="mb-3 row d-flex justify-content-center text-sm-end">
            <label htmlFor="photo" className="col-sm-4 col-form-label">Upload photo:</label>
            <div className="col-sm-8">
              <input
                type="file"
                id="photo"
                name="photo"
                className="form-control w-50"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <label htmlFor="desc" className="col-sm-4 col-form-label text-sm-end">Description:</label>
            <div className="col-sm-8">
              <textarea
                id="desc"
                name="desc"
                rows={4}
                placeholder="About a post"
                className="form-control w-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label htmlFor="location" className="col-sm-4 col-form-label text-sm-end">Location:</label>
            <div className="col-sm-8">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="City, State"
                className="form-control w-50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-light px-5" disabled={uploadBtn}>{uploadBtn?"Pic uploading":"Post"}</button>
          </div>
        </form>
      )}
    </>
  );
};
