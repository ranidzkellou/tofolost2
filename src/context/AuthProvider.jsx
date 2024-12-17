/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const BASE_URL = "endpoint"; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch (err) {
        logOut();
      }
    }
    setIsLoading(false);
  }, [token]);

  const loginAction = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      
      if (!response.ok) {
        throw new Error(res.message || "Login failed");
      }

      if (res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const authFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      logOut();
      throw new Error("Session expired");
    }

    return response;
  };

  if (isLoading) {
    return null; 
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        loginAction, 
        logOut,
        authFetch,
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};