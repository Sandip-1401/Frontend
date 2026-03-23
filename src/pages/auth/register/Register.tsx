import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../../store/registerStore";
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/features/auth/api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const setFormData = useRegisterStore((s) => s.setFormData);
  const setStep = useRegisterStore((s) => s.setStep);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setFormData(data);
      const res = await registerUser(data);

      if(!res.success){
        setServerError(res.message)
        return;
      }
      setStep(2);
    } catch (error: any) {
      console.log("OTP SEND ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-xl shadow-2xl rounded-3xl border border-slate-200/60 scale-90">
        <CardContent className="p-0">
          <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white">

            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create account</h1>
              <p className="text-slate-400 text-sm mt-1.5">Fill in the details to get started.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className={`pl-10 h-11 rounded-xl border text-sm transition-all
                      ${errors.name
                        ? "border-red-300 focus-visible:ring-red-200 bg-red-50/40"
                        : "border-slate-200 focus-visible:ring-blue-100 bg-slate-50/60 focus:bg-white hover:border-slate-300"
                      }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Minimum 3 characters required" },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">    {errors.name.message}
                  </p>
                )}
              </div>

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
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Password
                </Label>
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
                      minLength: { value: 6, message: "Minimum 6 characters required" },
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
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone_number" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="9876543210"
                    className={`pl-10 h-11 rounded-xl border text-sm transition-all
                      ${errors.phone_number
                        ? "border-red-300 focus-visible:ring-red-200 bg-red-50/40"
                        : "border-slate-200 focus-visible:ring-blue-100 bg-slate-50/60 focus:bg-white hover:border-slate-300"
                      }`}
                    {...register("phone_number", {
                      required: "Phone number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Phone must be 10 digits" },
                    })}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">    {errors.phone_number.message}
                  </p>
                )}
              </div>
              
              {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 mt-1 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  <>Send OTP <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;