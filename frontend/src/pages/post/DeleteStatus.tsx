import React from "react";
import { useNavigate } from "react-router-dom";
export const DeleteStatus: React.FC = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/user-posts')
    }, 2000);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">

            <div className="text-center">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-light">Your post is being deleted...</p>
            </div>

        </div>

    )
}