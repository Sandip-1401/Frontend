import { axiosInstance } from "@/api/axios";
import { handleApi } from "@/lib/apiHandler"
import type { Role } from "@/types/auth";

type LoginData = {
  accessToken: string;
  refreshToken: string;
  role: Role;
};

export const login = (data: {
  email: string,
  password: string
}) => handleApi<LoginData>(() =>
    axiosInstance.post('/auth/login', data)
  )

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}) =>
  handleApi<null>(() =>
    axiosInstance.post("/auth/register", data)
  );


export const forgotPassward = (data: {email: string}) => 
  handleApi<null>(() => 
    axiosInstance.post('/auth/forgot-password', data)
  );

export const verifyResetPasswordOtp = (data: {
  email: string,
  otp: string
}) => 
  handleApi(() => 
    axiosInstance.post('/auth/verify-reset-password-otp', data)
  )

export const resetPassword = (data: {
  email: string,
  password: string,
  confirmPassword: string
}) => 
  handleApi(() => 
    axiosInstance.post('/auth/reset-password', data)
  )

export const resendOtp = (data: {email: string}) => 
  handleApi<null>(() => 
    axiosInstance.post('/auth/resend-otp', data)
  )