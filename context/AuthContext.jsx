import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

import { api } from "../utils/api";

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    const loggedin = await axios.get(`${api}/api/auth/check`);

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
