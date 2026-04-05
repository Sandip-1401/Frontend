import { useForm } from "react-hook-form";
import { usePatientOnboardingStore } from "../../store/patientOnboardingStore";
import { useState } from "react";
import { ClipboardList, ArrowRight, AlertTriangle, LoaderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPatient } from "@/features/general/api";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type PatientForm = {
  blood_group: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  height: number;
  weight: number;
};

const inputCls = (hasError: boolean) =>
  `h-11 rounded-xl border text-sm transition-all placeholder:text-slate-400
  ${hasError
    ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
  }`;

const triggerCls = (hasError: boolean) =>
  `h-11 rounded-xl border text-sm transition-all
  ${hasError
    ? "border-red-300 bg-red-50/40"
    : "border-slate-200 bg-slate-50 hover:border-slate-300"
  }`;

const dropdownStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "0.75rem",
  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
  zIndex: 50,
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
      <span>⚠</span> {message}
    </p>
  ) : null;

const CreatePatient = () => {
  const setStep = usePatientOnboardingStore((s) => s.setStep);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientForm>({
    defaultValues: {
      blood_group: "",
      date_of_birth: "",
      gender: undefined,
      height: 0,
      weight: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: PatientForm) => {

      const res = await createPatient(payload);

      if (!res.success) {
        throw new Error(res.message)
      }
    },
    onSuccess: (data) => {
      console.log("PATIENT CREATED: ", data);
      setStep(2)
    },

    onError: (error: Error) => {
      setServerError(error.message)
    }
  })

  const onSubmit = async (data: PatientForm) => {
    setServerError(null);

    const payload = {
      ...data,
      date_of_birth: new Date(data.date_of_birth).toISOString(),
    };

    mutation.mutate(payload)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">

            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Patient Profile</h1>
                <p className="text-slate-400 text-sm mt-0.5">Fill in your health details to get started.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Blood Group</label>
                  <Select onValueChange={(val) => setValue("blood_group", val, { shouldValidate: true })}>
                    <SelectTrigger className={triggerCls(!!errors.blood_group)}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent style={dropdownStyle}>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("blood_group", { required: "Blood group is required" })}
                  />
                  <FieldError message={errors.blood_group?.message} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Gender</label>
                  <Select onValueChange={(val) => setValue("gender", val as PatientForm["gender"], { shouldValidate: true })}>
                    <SelectTrigger className={triggerCls(!!errors.gender)}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent style={dropdownStyle}>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  <FieldError message={errors.gender?.message} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                <Input
                  type="date"
                  className={inputCls(!!errors.date_of_birth)}
                  {...register("date_of_birth", { required: "Date of birth is required" })}
                />
                <FieldError message={errors.date_of_birth?.message} />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Height (cm)</label>
                  <Input
                    type="number"
                    placeholder="170"
                    className={inputCls(!!errors.height)}
                    {...register("height", {
                      required: "Height is required",
                      min: { value: 50, message: "Too small" },
                      max: { value: 300, message: "Too large" },
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError message={errors.height?.message} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                  <Input
                    type="number"
                    placeholder="65"
                    className={inputCls(!!errors.weight)}
                    {...register("weight", {
                      required: "Weight is required",
                      min: { value: 2, message: "Too small" },
                      max: { value: 500, message: "Too large" },
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError message={errors.weight?.message} />
                </div>
              </div>

              {serverError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span><AlertTriangle /></span> {serverError}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <>
                      <Spinner />
                      Creating...
                    </>
                  ) : (
                    <>Next <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </div>

            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePatient;

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