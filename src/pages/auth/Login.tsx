import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/features/auth/api";

interface LoginFormData {
  email: string;
  password: string;
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);


  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginFormData>();

  const onSubmit = async (values: LoginFormData): Promise<void> => {
    
      setServerError(null);

      const res = await login(values);

      if (!res.success) {
        setServerError(res.message);
        return;
      }

      const { accessToken, refreshToken, role } = res.data;
      setAuth(accessToken, refreshToken, role);
      navigate(redirectUser(role));

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0 flex flex-col md:flex-row min-h-[490px]">

          <div className="w-full  p-8 sm:p-10 flex flex-col justify-center bg-white">

            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back </h1>
              <p className="text-slate-400 text-sm mt-1.5">Sign in to continue to your dashboard.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 h-11 rounded-xl border text-sm transition-all
                      ${errors.email
                        ? "border-red-300 focus-visible:ring-red-200 bg-red-50/40"
                        : "border-slate-200 focus-visible:ring-blue-100 bg-slate-50/60 focus:bg-white hover:border-slate-300"
                      }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}

                {serverError && (
                  <p className="text-red-500 text-sm">{serverError}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Password
                  </Label>
                  <span
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-blue-500 hover:text-blue-700 hover:underline cursor-pointer transition-colors font-medium"
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 pr-11 h-11 rounded-xl border text-sm transition-all
                      ${errors.password
                        ? "border-red-300 focus-visible:ring-red-200 bg-red-50/40"
                        : "border-slate-200 focus-visible:ring-blue-100 bg-slate-50/60 focus:bg-white hover:border-slate-300"
                      }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}

                {serverError && (
                  <p className="text-red-500 text-sm">{serverError}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 mt-1 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>

          

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;