import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { UserSignUp } from "./pages/user/UserSignUp";
import { UserLogin } from "./pages/user/UserLogin";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { CreatePost } from "./pages/post/CreatePost";
import { EditPost } from "./pages/post/EditPost";
import { UserPosts } from "./pages/post/UserPosts";
import { EditStatus } from "./pages/post/EditStatus";
import { DeleteStatus } from "./pages/post/DeleteStatus";
import { Profile } from "./components/Profile";

function App() {
  const context = useContext(AppContext);
  if(!context){
    throw new Error("Undefined AppContext");
  }
  const {authUser} = context;
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={ authUser? (<Home />) :(<UserSignUp/>) }/>
        <Route path='/login' element={authUser? (<Home />) :(<UserLogin/>)}/>
        <Route path='/profile' element={authUser? (<Profile/>): (<Home/>)}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/post/edit/:postId' element={authUser? (<EditPost/>): (<UserSignUp/>)}/>
        <Route path='/user-posts' element={authUser? (<UserPosts/>) :(<Home/>)}/>
        <Route path='/delete-status' element={<DeleteStatus/>}/>
        <Route path='/edit-status' element={<EditStatus/>}/>
      </Routes>
    </div>
  );
}

export default App;
