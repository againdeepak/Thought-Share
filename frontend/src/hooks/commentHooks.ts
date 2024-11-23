import axiosInstance from "../lib/axiosInstance"
import axios from "axios";
interface postCommentData{
    comment:string;
}
export const postCommentHook = async (postId: string, data:postCommentData) =>{
    try{
        const response = await axiosInstance.post(`/user/post/${postId}/comment`,data,{withCredentials:true});
        console.log("Ohh", response.data);
        return response.data;
    }
    catch(error){
        if (axios.isAxiosError(error) && error.response) {
            console.log(error.response)
            throw error.response.data.message || error.response.data.error;
          } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
          }
    }
}

export const commentsOfPostHook = async (postId: string) =>{
    try{
        const response = await axiosInstance.get(`/user/post/${postId}/comments`,{withCredentials:true});
        return response.data.comments.comments;
        
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            console.log(error.response)
            throw error.response.data.message || error.response.data.error;
          } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
          }
    }
}
interface editCommentData{
    comment:string;
}
export const editCommentHook = async (commentId: string, data:editCommentData ) =>{
    try{
        const response = await axiosInstance.put(`/user/post/comment/${commentId}/edit`,data,{withCredentials:true})
        return response.data;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            console.log(error.response)
            throw error.response.data.message || error.response.data.error;
          } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
          }
    }
}