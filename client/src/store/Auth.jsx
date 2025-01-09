import React, { useEffect, useState, useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authToken = `Bearer ${token}`;

  const storerTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Fetch user data after login
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://Localhost:5000/api/auth/user`,
        {
          method: "GET",
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.userData); // Verify the API structure
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  // Fetch available services
  const getServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASEURL}/api/services`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setService(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    } else {
      setIsLoggedIn(false);
    }
    userAuthentication();
    getServices();
  }, [token]);

  useEffect(() => {
    console.log("useeffect",user); // This will log the updated user data after it's set
  }, [user]);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        LogoutUser,
        storerTokenInLS,
        service,
        user,
        authToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
