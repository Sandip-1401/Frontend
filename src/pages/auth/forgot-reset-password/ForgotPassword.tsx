import { forgotPassward } from '@/features/auth/api';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, KeyRound } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ForgotForm = {
  email: string
}

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>()

  const onSubmit = async (value: ForgotForm) => {
    setServerError(null);

    const res = await forgotPassward(value);

    if (!res.success) {
      setServerError(res.message);
      return;
    }
    navigate('/verify-reset-otp', {
      state: { email: value.email },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">

            <div className="mb-7">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                <KeyRound className="w-5 h-5 text-blue-500" />
              </div>
              <h1 className="text-xl font-bold text-slate-800">Forgot Password?</h1>
              <p className="text-slate-400 text-sm mt-1.5">
                Enter your email and we'll send you a reset OTP.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 h-11 rounded-xl border text-sm transition-all placeholder:text-slate-400
                      ${errors.email
                        ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
                      }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
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
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>Send OTP <ArrowRight className="w-4 h-4" /></>
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
  )
}

export default ForgotPassword