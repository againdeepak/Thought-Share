import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostHook } from "../../hooks/postHook";
import { editPostHook } from "../../hooks/postHook";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
export const EditPost: React.FC = () => {
    const [photo, setPhoto] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [uploadBtn, setUploadBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { postId } = useParams();
    const navigate = useNavigate();
    // First fetch the previous data based on PostId
    const getPostData = async () => {
        const postData = await getPostHook(postId as string);
        setPhoto(postData?.photo);
        setDescription(postData?.description);
        setLocation(postData?.location);
    }
    const editPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await editPostHook(postId as string, { photo, description, location });
            toast.success(data.message);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            toast.error(err as string);
            console.log("Error", err);
        }
    }

    useEffect(() => {
        getPostData();
        // eslint-disable-next-line
    }, [])

    // First delete the Image stored on cloudinary... and Then upload this...
    const uploadImage = async (file: File) => {
        // If we are updating the image... please make sure to delete from the cloud...
        if(photo){
            var urlImage = photo.split('/');
            const publicId = urlImage[urlImage?.length-1].split('.')[0];
            // Delete image with public id...
            console.log("public id:",publicId);
           const response =  await axiosInstance.post(`/cloud/image/delete`,{publicId},{withCredentials:true});
           console.log(response);
        }
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadBtn(true);
            const imageUrl = await uploadImage(file);
            setUploadBtn(false);
            if (imageUrl) {
                setPhoto(imageUrl); // Set the Cloudinary image URL in state
            }
        }
    };
    return (
        loading ? (
            <div className='d-flex justify-content-center align-items-center pt-2 text-white'>
            Post is being updated...
          </div>
        ) : (
            <form onSubmit={editPostHandler} className="container mt-4 p-4 rounded text-white">
            <h3 className="mb-4 text-center">Edit Post</h3>


            <div className="mb-3 d-flex justify-content-center">
                <img src={photo} alt="postPic" width={"100px"} className="border radius-sm" />
            </div>

            <div className="mb-3 row d-flex justify-content-center text-sm-end">
                <label htmlFor="photo" className="col-sm-4 col-form-label">Update photo:</label>
                <div className="col-sm-8 inputBoxSize">
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="mb-3 row align-items-center">
                <label htmlFor="desc" className="col-sm-4 col-form-label text-sm-end">Description:</label>
                <div className="col-sm-8 inputBoxSize">
                    <textarea
                        id="desc"
                        name="desc"
                        rows={4}
                        placeholder="About a post"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="mb-3 row align-items-center">
                <label htmlFor="location" className="col-sm-4 col-form-label text-sm-end">Location:</label>
                <div className="col-sm-8 inputBoxSize">
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="City, State"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mt-3">
                <button type="submit" className="btn btn-light px-5" disabled={uploadBtn}>{uploadBtn?"Pic Uploading":"Update post"}</button>
            </div>
        </form>
        )
        
    )
}