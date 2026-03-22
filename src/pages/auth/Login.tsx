import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore"
import type { Role } from "../../types/auth";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface LoginResponse{
  success: string,
  message: string,
  data: {
    accessToken: string,
    refreshToken: string,
    role: Role
  }
}

const redirectUser = (role: string | null) => {
  if (!role) return "/select-role";

  switch (role) {
    case "ADMIN":
      return "/admin";
    case "DOCTOR":
      return "/doctor";
    case "PATIENT":
      return "/patient";
    default:
      return "/unauthorized";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleLogin = async(): Promise<void> => {
    console.log("Clicked")
    try{
      const res = await axiosInstance.post<LoginResponse>('/auth/login', {
        email,
        password
      });

      const data = res.data;

      if(!data.success){
        alert("Login Failed!");
        return;
      }

      const {accessToken, refreshToken, role} = data.data;

      setAuth(accessToken, refreshToken, role);

      navigate(redirectUser(role));

      console.log(accessToken, role);
    }catch(error){
      console.error("Login Error: ", error)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <input 
        type="email"
        placeholder="Enter email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  
      />

      <input 
        type="password"
        placeholder="Enter password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}  
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
