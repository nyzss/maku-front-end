import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedin = await axios.get(
      "https://maku-backend.herokuapp.com/auth/check"
    );

    setLoggedIn(loggedin.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
