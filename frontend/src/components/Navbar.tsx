import { Link } from "react-router-dom";
import { FaSlideshare } from "react-icons/fa";
import { userLogoutHook } from "../hooks/userHook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
export const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const context = useContext(AppContext);
    // Handle the case where context is undefined
    if (!context)
        throw new Error("Navbar must be used within an AppContextProvider");

    const { authUser, setAuthUser } = context;
    const userLogoutHandler = async () => {
        try {
            const data = await userLogoutHook();
            setAuthUser(false);
            navigate('/');
            if (data)
                toast.success(data?.message);
        } catch (error) {
            toast.error(error as string || "Error in Login")
        }
    }
    return (
        <nav className="navbar d-flex  align-items-center">
            <div className="navbar-item-left">
                <Link className="navbar-brand d-flex align-items-center mx-2 company-logo text-white" to="/">
                    < FaSlideshare />
                    <span className="text-decoration-underline">ThoughtShare</span>
                </Link>
            </div>


            <div className="navbar-item-right d-flex flex-wrap  px-2 gap-2">
                {
                    authUser ? (
                        <>
                            <li onClick={userLogoutHandler}>Logout</li>
                            <Link to='/user-posts' className="text-decoration-none"><li>My posts</li></Link>
                            <Link to='/profile' className="text-decoration-none"> <li>Profile</li></Link>

                        </>
                    ) :
                        (<>
                            <Link to='/signup' className="text-decoration-none"><li>Signup</li></Link>
                            <Link to='/login' className="text-decoration-none"><li>Login</li></Link>
                        </>)
                }
            </div>
        </nav>
    );
}
