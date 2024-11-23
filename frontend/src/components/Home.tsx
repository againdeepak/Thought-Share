import React, { useContext } from "react";
import { UserProfile } from "../pages/user/UserProfile";
import { AllPost } from "../pages/post/AllPost";
import { AppContext } from "../Context/AppContext";
export const Home: React.FC = () =>{
    const context = useContext(AppContext);
    if(!context){
        throw new Error("Error in AppContext");
    }
    const{ authUser} = context;
    return(
        <div className="home d-flex justify-content-center">
            {authUser &&<UserProfile/>}
           <AllPost/>
        </div>
    )
}