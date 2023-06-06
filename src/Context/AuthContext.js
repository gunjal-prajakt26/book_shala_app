import { createContext, useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "./DataContext";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";


export const  AuthContext= createContext();


export function AuthProvider({children}){

  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);
  const {setItems} = useContext(DataContext);

  const loginUser=async (creds, address)=>{
    try {
      const {
        data: { foundUser, encodedToken },status
      } = await axios.post("api/auth/login", {
        email: creds.email,
        password: creds.password,
      });
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        setUser(foundUser);
        setItems({type: "ADD_ADDRESS", payLoad:{address:{_id:uuid(),...address}}});
        toast.success("LogIn Successfully");
      }
        } catch (error) {
            console.error(error)
        }
    }


    const signupUser=async (creds)=>{
        try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await axios.post("api/auth/signup",{creds});;
      if (status === 201) {
        localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: createdUser }));
        setUser(createdUser);
        setItems({type: "INITIAL_ADDRESS", payLoad:createdUser.address});
        toast.success("SignUp Successfully");
      }
    } catch (error) {
      console.log("Error in login user", error);
    }
  };


    
    return(
        <>
            <AuthContext.Provider value={{token, loginUser, signupUser, user, setToken, setUser}}>
                {children}
            </AuthContext.Provider>
        </>
            

    )
}