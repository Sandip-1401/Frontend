import { useNavigate } from 'react-router-dom'
import { Stethoscope, User, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="w-full p-8 sm:p-10 bg-white">

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Who are you?</h1>
              <p className="text-slate-400 text-sm mt-1.5">Select your role to continue.</p>
            </div>

            <div className="space-y-3">

              <button
                onClick={() => navigate('/patient-onboarding')}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                  <User className="w-5 h-5 text-blue-500" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">Continue as Patient</p>
                  <p className="text-xs text-slate-400 mt-0.5">Book appointments & manage health records</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => navigate('/doctor-onboarding')}
                className="w-full group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                  <Stethoscope className="w-5 h-5 text-blue-500" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">Continue as Doctor</p>
                  <p className="text-xs text-slate-400 mt-0.5">Manage patients & schedule consultations</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </button>

            </div>

            <p className="text-center text-xs text-slate-400 mt-8">
              Wrong account?{" "}
              <span
                onClick={() => navigate('/login')}
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
              >
                Sign out
              </span>
            </p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectRole;