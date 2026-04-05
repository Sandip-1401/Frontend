import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPassword } from "@/features/auth/api";
import { Lock, Eye, EyeOff, ArrowRight, KeyRound, LoaderIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
      <span>⚠</span> {message}
    </p>
  ) : null;

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>();

  const onSubmit = async (values: ResetForm) => {
    setServerError(null);

    const res = await resetPassword({
      email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });

    if (!res.success) {
      setServerError(res.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">

            <div className="mb-7">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <KeyRound className="w-5 h-5 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">Reset Password</h1>
              <p className="text-slate-400 text-sm mt-1.5">
                Set a new password for{" "}
                <span className="text-slate-600 font-medium">{email}</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input
                  disabled
                  type="email"
                  value={email}
                  className="h-11 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 text-sm cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 pr-11 h-11 rounded-xl border text-sm transition-all placeholder:text-slate-400
                      ${errors.password
                        ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
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
                <FieldError message={errors.password?.message} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pl-10 pr-11 h-11 rounded-xl border text-sm transition-all placeholder:text-slate-400
                      ${errors.confirmPassword
                        ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
                      }`}
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <FieldError message={errors.confirmPassword?.message} />
              </div>

              {serverError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠</span> {serverError}
                </div>
              )}

              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Resetting...
                    </>
                  ) : (
                    <>Reset Password <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </div>
            </form>

            <p className="text-center text-xs text-slate-400 mt-6">
              Remember your password?{" "}
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

export default ResetPassword;

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