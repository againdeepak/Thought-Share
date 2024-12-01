import axiosInstance from "../lib/axiosInstance";
import axios from "axios";

export const postLikeHook = async (postId: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(`user/post/${postId}/like`, {}, { withCredentials: true })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response)
      throw error.response.data.message || error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const postUnLikeHook = async (postId: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`user/post/${postId}/unlike`, { withCredentials: true })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response)
      throw error.response.data.message || error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export const likesOfPostHook = async (postId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`user/post/${postId}/likes`,{withCredentials:true})
    return response.data.likesOfPost.likes.length;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response)
      throw error.response.data.message || error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}


export const likeStatusHook = async (postId: string) : Promise<any>=>{
  try{
    const response = await axiosInstance.get(`user/post/${postId}/like/status`,{withCredentials:true})
    return response.data.likeStatus;
  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      // console.log(error.response)
      throw error.response.data.message || error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
