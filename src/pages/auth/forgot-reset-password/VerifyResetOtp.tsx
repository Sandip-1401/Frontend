import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { verifyResetPasswordOtp } from "@/features/auth/api";
import { ShieldCheck, ArrowRight, KeyRound, LoaderIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OtpForm = {
  otp: string;
};

const VerifyResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [serverError, setServerError] = useState<string | null>(null);
  // const [resendMessage, setResendMessage] = useState<string | null>(null);
  // const [resendDisabled, setResendDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>();

  const onSubmit = async (values: OtpForm) => {
    setServerError(null);

    const res = await verifyResetPasswordOtp({
      email,
      otp: values.otp,
    });

    if (!res.success) {
      setServerError(res.message);
      return;
    }

    navigate("/reset-password", {
      state: { email },
    });
  };

  // const handleResend = async () => {
  //   setServerError(null);
  //   setResendMessage(null);

  //   const res = await resendOtp({ email });

  //   if (!res.success) {
  //     setServerError(res.message);
  //     return;
  //   }

  //   setResendMessage("OTP resent successfully ✅");
  //   setResendDisabled(true);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">


            <div className="mb-7">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">Verify OTP</h1>
              <p className="text-slate-400 text-sm mt-1.5">
                We sent a 6-digit OTP to{" "}
                <span className="text-slate-600 font-medium">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">OTP Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className={`pl-10 h-11 rounded-xl border text-sm tracking-[0.3em] font-mono transition-all placeholder:text-slate-400 placeholder:tracking-normal
                      ${errors.otp
                        ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
                      }`}
                    {...register("otp", {
                      required: "OTP is required",
                    })}
                  />
                </div>
                {errors.otp && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span>⚠</span> {errors.otp.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠</span> {serverError}
                </div>
              )}

              {/* {resendMessage && (
                <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600 flex items-center gap-2">
                  {resendMessage}
                </div>
              )} */}

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Verifying...
                    </>
                  ) : (
                    <>Verify OTP <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </div>
            </form>

            {/* Resend Section */}
            {/* <div className="mt-6 text-center">
              <p className="text-xs text-slate-400">
                Didn't receive the OTP?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendDisabled}
                  className={`font-semibold transition-colors ${
                    resendDisabled
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-blue-500 hover:underline cursor-pointer"
                  }`}
                >
                  Resend OTP
                </button>
              </p>
            </div> */}

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyResetOtp;

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}