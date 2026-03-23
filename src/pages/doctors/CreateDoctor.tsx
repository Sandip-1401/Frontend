// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "../../api/axios";
// import { doctorOnboardingStor } from "@/store/doctorOnboarding";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";

// type DoctorForm = {
//   qualification: string;
//   experience_years: number;
//   consultation_fee: number;
//   department_id: string;
// };

// type Department = {
//   department_id: string;
//   department_name: string;
// };

// const CreateDoctor = () => {
//   const setStep = doctorOnboardingStor((s) => s.setStep);

//   const [loading, setLoading] = useState(false);
//   const [departments, setDepartments] = useState<Department[]>([]);

//   const form = useForm<DoctorForm>({
//     defaultValues: {
//       qualification: "",
//       experience_years: 0,
//       consultation_fee: 0,
//       department_id: "",
//     },
//   });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const res = await axiosInstance.get("/departments");
//         setDepartments(res.data.data.data || []);
//       } catch (err) {
//         console.log("DEPARTMENT ERROR:", err);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const onSubmit = async (data: DoctorForm) => {
//     try {
//       setLoading(true);

//       await axiosInstance.post("/doctors", data);

//       setStep(2); 
//     } catch (error: any) {
//       console.log("ERROR:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto space-y-6">
//       <h2 className="text-xl font-semibold">Create Doctor Profile</h2>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

//           <FormField
//             control={form.control}
//             name="qualification"
//             rules={{ required: "Qualification is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Qualification</FormLabel>
//                 <FormControl>
//                   <Input placeholder="MBBS / MD" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="experience_years"
//             rules={{ required: "Experience is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Experience (Years)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     {...field}
//                     onChange={(e) =>
//                       field.onChange(Number(e.target.value))
//                     }
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="consultation_fee"
//             rules={{ required: "Consultation fee is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Consultation Fee</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     {...field}
//                     onChange={(e) =>
//                       field.onChange(Number(e.target.value))
//                     }
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="department_id"
//             rules={{ required: "Department is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Department</FormLabel>
//                 <Select onValueChange={field.onChange}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Department" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {departments.map((dep) => (
//                       <SelectItem
//                         key={dep.department_id}
//                         value={dep.department_id}
//                       >
//                         {dep.department_name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Creating..." : "Continue"}
//           </Button>

//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CreateDoctor;


import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { doctorOnboardingStor } from "@/store/doctorOnboarding";
import { Stethoscope, ArrowRight } from "lucide-react";

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
import { createDoctor, getDepartments } from "@/features/general/api";

type DoctorForm = {
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  department_id: string;
};

type Department = {
  department_id: string;
  department_name: string;
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

const CreateDoctor = () => {
  const setStep = doctorOnboardingStor((s) => s.setStep);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  const { register, handleSubmit, setValue, formState: { errors } } =
    useForm<DoctorForm>({
      defaultValues: {
        qualification: "",
        experience_years: undefined,
        consultation_fee: undefined,
        department_id: "",
      },
    });

  useEffect(() => {
    const fetchDepartments = async () => {

      const res = await getDepartments();

      if(!res.success){
        console.log("Depart fetch message: ", res.message);
        return;
      }
      setDepartments(res.data)
    };
    fetchDepartments();
  }, []);

  const onSubmit = async (data: DoctorForm) => {
    setLoading(true);
    setServerError(null);

    const res = await createDoctor(data);

    if(!res.success){
      setServerError(res.message);
      setLoading(false);
      return;
    }

    console.log("DOCTOR CREATED:", res.data);
    setStep(2);
    setLoading(false);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">

            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Doctor Profile</h1>
                <p className="text-slate-400 text-sm mt-0.5">Fill in your professional details to get started.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Qualification</label>
                <Input
                  placeholder="MBBS / MD"
                  className={inputCls(!!errors.qualification)}
                  {...register("qualification", { required: "Qualification is required" })}
                />
                <FieldError message={errors.qualification?.message} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Experience (Years)</label>
                  <Input
                    type="number"
                    placeholder="5"
                    className={inputCls(!!errors.experience_years)}
                    {...register("experience_years", {
                      required: "Experience is required",
                      min: { value: 0, message: "Invalid value" },
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError message={errors.experience_years?.message} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Consultation Fee (₹)</label>
                  <Input
                    type="number"
                    placeholder="500"
                    className={inputCls(!!errors.consultation_fee)}
                    {...register("consultation_fee", {
                      required: "Consultation fee is required",
                      min: { value: 0, message: "Invalid value" },
                      valueAsNumber: true,
                    })}
                  />
                  <FieldError message={errors.consultation_fee?.message} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Department</label>
                <Select onValueChange={(val) => setValue("department_id", val, { shouldValidate: true })}>
                  <SelectTrigger className={triggerCls(!!errors.department_id)}>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent style={dropdownStyle}>
                    {departments.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-400">Loading departments...</div>
                    ) : (
                      departments.map((dep) => (
                        <SelectItem key={dep.department_id} value={dep.department_id}>
                          {dep.department_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("department_id", { required: "Department is required" })}
                />
                <FieldError message={errors.department_id?.message} />
              </div>

              {serverError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠</span> {serverError}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>Continue <ArrowRight className="w-4 h-4" /></>
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

export default CreateDoctor;