import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userLoginHook } from "../../hooks/userHook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
export const UserLogin: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    if(!context){
      throw new Error("Error in AppContext");
    }
    const {setAuthUser} = context;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        try{
            const data = await userLoginHook({ email, password});
            console.log(data);
            setAuthUser(true);
            navigate('/')
            if(data){
                toast.success(data.message as string);
            }
        }
        catch(error){
           toast.error(error as string || "Error in Login");
        }
    }
    return (
        <form onSubmit={userLoginHandler} className="container mt-4 p-4 rounded  text-white">
        <h3 className="mb-4 text-center">User Login</h3>     
        <div className="mb-3 row d-flex justify-content-center">
          <label htmlFor="email" className="col-sm-4 col-form-label text-sm-end">Email:</label>
          <div className="col-sm-8">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="xyz@gmail.com"
              className="form-control w-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
      
        <div className="mb-3 row align-items-center">
          <label htmlFor="password" className="col-sm-4 col-form-label text-sm-end">Password:</label>
          <div className="col-sm-8">
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter a strong password"
              className="form-control w-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
      
        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mt-3">
          <button type="submit" className="btn btn-primary ">Login</button>
          <Link className="haveAccount"  to='/signup'>Already Have an account</Link>
        </div>
      </form>
      
      
    )
}