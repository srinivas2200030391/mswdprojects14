import { useState } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);

  const setAuthToken = (newToken, role) => {
    setToken(newToken);
    if (newToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      localStorage.setItem("token", newToken);
      localStorage.setItem("role", role);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  };

  const getAuthToken = () => {
    return token;
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return { setAuthToken, getAuthToken, isAuthenticated };
};

export default useAuth;
