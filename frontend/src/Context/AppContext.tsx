import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
// Define the type of the context value
interface AppContextType {
  authUser: boolean;
  setAuthUser: React.Dispatch<React.SetStateAction<boolean>>;
  currUserId: string;
}

// Create the context with an initial value of `undefined`
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props for AppContextProvider
interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [authUser, setAuthUser] = useState<boolean>(false);
  const userToken = localStorage.getItem("usertoken");
  var currUserId="";
  if(userToken){
      const decodedToken: { userId: string } = jwtDecode(userToken);
      currUserId = decodedToken.userId;
  }
  const value = {
    authUser,
    setAuthUser,
    currUserId,
  };

  // Check if the Company is logged in when the component mounts
  useEffect(() => {
    if (userToken) {
      setAuthUser(true);
    }
  }, [userToken]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
