import { create } from "zustand";
import type { Role } from "../types/auth";

interface AuthState {
   accessToken: string | null,
   role: Role | null,

   setAuth: (accessToken: string, refreshToken: string, role: Role) => void,
   logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
   accessToken: localStorage.getItem("accessToken") as string | null,
   role: (localStorage.getItem("role") as Role) || null,

   setAuth: (accessToken: string, refreshToken: string, role: Role) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);

      set({
         accessToken: accessToken,
         role
      })
   },

   logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");

      set({
         accessToken: null,
         role: null
      })
   }
}))



































// import { create } from "zustand";
// import { api } from "../api/axios";

// type User = {
//    user_id: string,
//    email: string
// }

// type AuthStore = {
//    user: User | null,
//    accessToken: string | null,
//    refreshToken: string | null,
//    loading: boolean

//    login: (email: string, password: string) => Promise<void>
//    logout: () => void 
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//    user: null,
//    accessToken: null,
//    refreshToken: null,
//    loading: false,

//    login: async (email: string, password: string) => {
//       set({loading: true});

//       try{
//          const res = await api.post('/auth/login', {email, password})

//          const data = res.data.data;

//          const user = {
//             user_id: data.user_id,
//             email: data.email
//          };

//          localStorage.setItem("accessToken", data.accessToken);
//          localStorage.setItem("refreshToken", data.refreshToken);

//          set({
//             user,
//             accessToken: data.accesstoken,
//             refreshToken: data.refreshToken,
//             loading: false
//          });

//       }catch(err){
//          set({ loading: false });
//          throw err;
//       }
//    },

//    logout: () => {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");

//       set({
//          user: null,
//          accessToken: null,
//          refreshToken: null
//       })
//    }
// }))