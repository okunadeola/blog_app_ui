import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { url } from "../constant";
import Cookies from 'universal-cookie';
import API from "../API/axiosInstance";
const cookies = new Cookies();




export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(null);

  const login = async (inputs) => {
    const res = await API.post(`/auth/login`, inputs);
    setCurrentUser(res.data.other);
    setToken(res.data.token);
  };

  const logout = async (inputs) => {
    await axios.post( `${url}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    cookies.set('access-token', token);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
