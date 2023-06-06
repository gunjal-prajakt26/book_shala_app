import React, { useState, useEffect, useContext } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext";


export function Signup() {
  const [form, setForm]=useState({email:"", password:"",firstName:"",lastName:""})
  const {signupUser, token}= useContext(AuthContext);
  const navigate= useNavigate();
  const {setIsLoad}= useContext(DataContext);

  const signupHandler=()=>{
    const { email, password, firstName, lastName } = form;
    if (email && password && firstName && lastName !== ""){
    signupUser(form);
    }
  }

  if (token) {
    setIsLoad(() => true);
    setTimeout(() => {
      navigate("/products");
      setIsLoad(false);
    }, 500);
  }

  return (
    <div className="auth-container">
      <div className="auth-main-container">
        <div className="auth-title">
          <h2 className="">Sign Up</h2>
        </div>
        <div className="auth-main">
          <div className="first-last-wrapper">
            <div className="auth-firstname">
              <label htmlFor="firstname">First Name</label>
              <input
                placeholder="Test"
                className="text-input"
                type="text"
                required
                onChange={(e)=>setForm({...form,firstName:e.target.value})}
              />
            </div>
            <div className="auth-lastname">
              <label htmlFor="lastname">Last Name</label>
              <input
                placeholder="Admin"
                className="text-input"
                type="text"
                required
                onChange={(e)=>setForm({...form,lastName:e.target.value})}
              />
            </div>
          </div>
          <div className="auth-email">
            <label htmlFor="mail">Email Address</label>
            <input
              placeholder="test@gmail.com"
              className="text-input"
              type="text"
              required
              onChange={(e)=>setForm({...form,email:e.target.value})}
            />
          </div>
          <div className="auth-pwd">
            <label htmlFor="pwd">Password</label>
            <input
              placeholder="***********"
              className="pwd-input"
              type="password"
              required
              onChange={(e)=>setForm({...form,password:e.target.value})}
            />
          </div>
          <div className="auth-primary-btn">
            <span className="login-btn" onClick={()=>signupHandler()}>Create New Account</span>
          </div>
          <Link className="auth-secondary-btn" to="/login">
              {"Already have an account >"}
          </Link>
        </div>
      </div>
    </div>
  );
}
