import axiosInstance from "../lib/axiosInstance";
import axios from "axios";
// Define the shape of the request data
interface SignUpData {
  userName: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  data: object;
  token: string;
}

export const userSignUpHook = async (data: SignUpData): Promise<SignUpResponse | void> => {
  try {
    const response = await axiosInstance.post<SignUpResponse>('/user/signup', data, {
      withCredentials: true,
    });
    const { token } = response.data;
    localStorage.setItem('usertoken', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};


interface LoginData{
  email:string;
  password:string;
}
interface LoginResponse{
  message:string;
  token:string;
}
export const userLoginHook = async (data: LoginData): Promise<LoginResponse | void> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/user/login', data, {
      withCredentials: true,
    });
    const { token } = response.data;
    localStorage.setItem('usertoken', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

interface userLogoutResponse{
  message:string;
}
export const userLogoutHook = async ():Promise<userLogoutResponse | void> =>{
  try{
    const response = await axiosInstance.post('/user/logout',{},{
      withCredentials:true,
    })
    const keyToRemove: string = "usertoken";
    localStorage.removeItem(keyToRemove);
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

export const userInfoHook = async ():Promise<any> =>{
  try{
    const response = await axiosInstance.get('/user/info',{
      withCredentials:true,
    })
    return response.data.userInfo;
  }catch(error){
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data.error;
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}


