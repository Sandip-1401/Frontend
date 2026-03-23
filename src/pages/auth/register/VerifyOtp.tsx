import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../api/axios";
import { useRegisterStore } from "../../../store/registerStore";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type OtpForm = {
  otp: string;
};

const VerifyOtp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OtpForm>();

  const formData = useRegisterStore((s) => s.formData);
  const reset = useRegisterStore((s) => s.reset);

  const onSubmit = async (data: OtpForm) => {
    try {
      if (!formData) {
        throw new Error("No registration data found");
      }

      const finalPayload = {
        ...formData,
        otp: data.otp,
      };

      const res = await axiosInstance.post("/auth/verify-otp", finalPayload);

      console.log("REGISTER SUCCESS:", res.data);

      reset();

      navigate("/login");
    } catch (error: any) {
      console.log("OTP VERIFY ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="w-full p-8 sm:p-10 flex flex-col justify-center bg-white">

            <div className="mb-7">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-blue-500" strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Verify your email</h1>
              <p className="text-slate-400 text-sm mt-1.5">
                We sent a 6-digit OTP to{" "}
                <span className="text-slate-600 font-medium">{formData?.email ?? "your email"}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-1.5">
                <Label htmlFor="otp" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  OTP Code
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className={`pl-10 h-11 rounded-xl border text-sm tracking-[0.3em] font-mono transition-all
                      ${errors.otp
                        ? "border-red-300 focus-visible:ring-red-200 bg-red-50/40"
                        : "border-slate-200 focus-visible:ring-blue-100 bg-slate-50/60 focus:bg-white hover:border-slate-300"
                      }`}
                    {...register("otp", {
                      required: "OTP is required",
                      minLength: { value: 6, message: "OTP must be 6 digits" },
                    })}
                  />
                </div>
                {errors.otp && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                    <span>⚠</span> {errors.otp.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
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
                  <>Verify & Register <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Didn't receive the OTP?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
              >
                Go back
              </span>
            </p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;