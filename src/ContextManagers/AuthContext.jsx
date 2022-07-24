import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

// const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"
const APIENDPOINT = "http://127.0.0.1:8000/api"



  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch(`${APIENDPOINT}/token/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (response.status === 200) {
      let data = await response.json();
      let decoded = jwt_decode(data.access);
      setAuthTokens(data);
      setUser(decoded);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      logoutUser();
    }
  };

  let logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };
  const contextData = {
    authTokens: authTokens,
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    erorr: error,
  };

  const rotateTokens = async () => {
    console.log("tried")
      let response = await fetch(`${APIENDPOINT}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();
    let decoded = jwt_decode(data.access);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(decoded);
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading){
      setLoading(false)
    }
  };

  // useEffect(() => {
  //   if (loading){
  //     rotateTokens();
    
  //   }
  //   let interval_id = setInterval(() => {
  //     if (authTokens) {
  //       rotateTokens();
  //     }
  //   }, 1000 * 60 * 3);
  //   return () => clearInterval(interval_id);

  // }, [authTokens, loading]);


  return (
    <AuthContext.Provider value={contextData}>{ children}</AuthContext.Provider>
  );
};
