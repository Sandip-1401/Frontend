import { axiosInstance } from "@/api/axios";
import type { Role } from "@/types/auth";


interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    role: Role;
  };
}


interface LoginSuccess {
  success: true;
  data: {
    accessToken: string;
    refreshToken: string;
    role: Role;
  };
}


interface LoginError {
  success: false;
  message: string;
}


export type LoginResult = LoginSuccess | LoginError;


export const login = async (
  data: { email: string; password: string }
): Promise<LoginResult> => {
  try {
    const res = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      data
    );

    return {
      success: true,
      data: res.data.data, 
    };
  } catch (error: any) {
    console.log("API ERROR: ", error);

    return {
      success: false,
      message:
        error?.response?.data?.message || "Something went wrong",
    };
  }
};