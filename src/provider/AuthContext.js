import React, { createContext, useEffect, useState } from "react";
import { api } from "provider/axios";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading/Loading";

const Context = createContext();

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } else {
      // navigate("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return <Context.Provider value={loading}>{children}</Context.Provider>;
}

export { AuthProvider, Context };
