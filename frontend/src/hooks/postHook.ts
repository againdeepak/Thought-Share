import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

export const getAllPostHook = async (): Promise<any> =>{
    try{
        const response = await axiosInstance.get('/user/all-posts',{withCredentials:true})
        return response.data.allPosts;
    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data.error;
          } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
          }
    }
}

interface createPostData{
  photo:string;
  description:string;
  location:string;
}
interface createPostResponse{
  message:string;
}
export const createPostHook = async (data: createPostData): Promise<createPostResponse | void> =>{
  try{
    const response = await axiosInstance.post('/user/create/post',data,{withCredentials:true})
    return response.data;
  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const userPostHook = async (): Promise<any> =>{
  try{
    const response = await axiosInstance.get('/user/posts',{withCredentials:true})
    return response.data.userPosts.posts;
  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const getPostHook = async (postId : string): Promise<any> =>{
  try{
    const response = await axiosInstance.get(`/user/post/${postId}`,{withCredentials:true});
    return response.data.postData;

  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}


interface editPostData{
  photo:string;
  description:string;
  location:string;
}
export const editPostHook = async (postId: string, data: editPostData): Promise<any> =>{
  try{
    const response = await axiosInstance.put(`/user/post/${postId}/edit`,data,{withCredentials:true})
    return response.data;
  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}