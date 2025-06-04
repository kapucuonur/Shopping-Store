import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

const LoginProvider =({children}) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null)
  const navigate = useNavigate()

  //! login.jsx e pasladık.. {email,password alacak}
  const login = (info) => {
    setUser(info)
    navigate("dashboard")
  }

  //! Kullanıcı bilgisi temizleme
  const logout = () => setUser(null)

  //!
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user))
  },[user])
  return (
    <LoginContext.Provider value={{user,login,logout}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider

//!custom hook
export const useLoginContext = () => {
  return useContext(LoginContext)
}
