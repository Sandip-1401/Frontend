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