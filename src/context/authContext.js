import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { url } from "../constant";
// import cookie from 'react-cookies'

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${url}/auth/login`, inputs, { withCredentials: true });
    setCurrentUser(res.data.other);
    // cookie.save('access_token', res.data.token, { path: '/', httpOnly: true })
  };

  const logout = async (inputs) => {
    await axios.post( `${url}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
