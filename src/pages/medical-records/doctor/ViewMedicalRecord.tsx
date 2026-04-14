import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Calendar,
   Stethoscope,
   FileText,
   PlusCircle,
   Clock,
   Scale,
   Ruler,
   HeartPulse,
   Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { medicalRecordById } from "@/features/general/api";

interface User {
  name: string;
}

interface Patient {
  gender: string;
  blood_group: string;
  height: number;
  weight: number;
  date_of_birth: string;
  user: User;
}

interface Appointment {
  appointment_date: string;
  appointment_time: string;
  reason: string;
}

export interface MedicalRecord {
  patient: Patient;
  appointment: Appointment;
  diagnosis: string;
  notes: string;
  record_date: string;
}

const ViewMedicalRecord = () => {

   const navigate = useNavigate();

   const { medical_record_id } = useParams();

   const { data, isLoading } = useQuery<MedicalRecord>({
      queryKey: ["medical_record", medical_record_id],
      queryFn: async () => {
         const res = await medicalRecordById(String(medical_record_id));
         if (!res.success) {
            throw new Error(res.message);
         }
         return res.data;
      },
      staleTime: 1000 * 5 * 60,
      refetchOnWindowFocus: false
   });

   if (isLoading) {
      return (
         <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
         </div>
      );
   }

   const patientInfo = data?.patient;
   const userInfo = data?.patient?.user;
   const appointmentInfo = data?.appointment;

   return (
      <div className="min-h-screen p-4 md:p-8 space-y-6 animate-in fade-in duration-700 max-w-6xl mx-auto dark:bg-slate-950">

         <div className="space-y-2">
            <DynamicBreadcrumb
               homeHref={"/doctor"}
               items={[
                  { label: "Medical Records", href: "/doctor/medical-records" },
                  { label: "Details" },
               ]}
            />
            <h1 className="text-3xl font-black text-cyan-500 dark:text-white ml-2">
               Medical Record 
            </h1>
         </div>

         <div className="px-2">
            <Card className="border-none shadow-xl bg-gradient-to-br from-cyan-400 to-cyan-600 dark:from-slate-900 dark:to-slate-800 text-white overflow-hidden relative group mb-8 rounded-2xl">
               <div className="absolute top-[-20%] right-[-5%] w-72 h-72 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />

               <CardContent className="pt-10 pb-10 relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                     <div className="relative">
                        <Avatar className="h-28 w-28 border-4 border-white/30 dark:border-slate-700 shadow-2xl transform transition-transform group-hover:scale-105">
                           <AvatarFallback className="bg-white text-cyan-600 text-4xl font-black uppercase">
                              {userInfo?.name?.substring(0, 2) || "PT"}
                           </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-900 p-2 rounded-full shadow-lg">
                           <HeartPulse className="text-red-500 h-5 w-5 animate-pulse" />
                        </div>
                     </div>

                     <div className="flex-1 space-y-5 w-full">
                        <div className="space-y-2">
                           <h2 className="text-4xl font-black tracking-tighter drop-shadow-md capitalize">
                              {userInfo?.name || "Unknown Patient"}
                           </h2>
                           <div className="flex flex-wrap justify-center md:justify-start gap-3">
                              <Badge className="bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-xl px-4 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest">
                                 {patientInfo?.gender || "N/A"}
                              </Badge>
                              <Badge className="bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-xl px-4 py-1 rounded-full uppercase text-[10px] font-bold tracking-widest">
                                 Blood: {patientInfo?.blood_group || "N/A"}
                              </Badge>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                           <div className="flex items-center justify-center md:justify-start gap-3 bg-white/10 dark:bg-slate-950/40 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                              <Ruler className="text-cyan-100 h-5 w-5" />
                              <span className="font-bold text-lg leading-none">{patientInfo?.height || "0"} <small className="text-[10px] font-light opacity-80 uppercase">cm</small></span>
                           </div>
                           <div className="flex items-center justify-center md:justify-start gap-3 bg-white/10 dark:bg-slate-950/40 p-4 rounded-2xl backdrop-blur-md border border-white/5">
                              <Scale className="text-cyan-100 h-5 w-5" />
                              <span className="font-bold text-lg leading-none">{patientInfo?.weight || "0"} <small className="text-[10px] font-light opacity-80 uppercase">kg</small></span>
                           </div>
                           <div className="flex items-center justify-center md:justify-start gap-3 bg-white/10 dark:bg-slate-950/40 p-4 rounded-2xl backdrop-blur-md border border-white/5 col-span-2">
                              <Calendar className="text-cyan-100 h-5 w-5" />
                              <span className="font-bold text-sm tracking-tight">DOB: {new Date(patientInfo?.date_of_birth || "").toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

               <Card className="lg:col-span-2 shadow-xl border-none bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between border-b dark:border-slate-800/50 pb-5 pt-8 px-8">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                           <Stethoscope className="text-red-500" size={28} />
                        </div>
                        <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Diagnosis</CardTitle>
                     </div>

                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Record Date</p>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-bold">
                           {data?.record_date || "N/A"}
                        </Badge>
                     </div>
                  </CardHeader>

                  <CardContent className="p-8 space-y-8">
                     <div className="relative group p-8 rounded-2xl bg-gradient-to-br from-red-50/50 to-white dark:from-red-900/5 dark:to-slate-900 border border-red-100 dark:border-red-900/20 shadow-inner">
                        <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">Doctor's Findings:</p>
                        <p className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 tracking-tighter leading-tight italic">
                           {data?.diagnosis || "No diagnosis recorded"}
                        </p>
                     </div>

                     <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] ml-2">
                           <FileText size={16} className="text-cyan-500" /> Clinical Notes
                        </h3>
                        <div className="p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border dark:border-slate-800 leading-relaxed font-medium shadow-sm italic text-lg relative">
                           <span className="absolute top-2 left-2 text-4xl text-slate-200 dark:text-slate-800 leading-none">“</span>
                           {data?.notes || "No notes provided."}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <div className="space-y-6">
                  <Card className="shadow-xl border-none bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden rounded-2xl">
                     <div className="h-2 bg-cyan-500" />
                     <CardHeader className="flex flex-row items-center gap-3 pb-4 pt-6 px-6">
                        <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                           <Clock className="text-cyan-600" size={22} />
                        </div>
                        <CardTitle className="text-lg font-bold uppercase tracking-tighter italic">Schedule</CardTitle>
                     </CardHeader>
                     <CardContent className="px-6 pb-8 space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border dark:border-slate-800 text-center space-y-1">
                           <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">Next Visit</p>
                           <p className="text-2xl font-black text-slate-800 dark:text-slate-100 italic">
                              {appointmentInfo?.appointment_date || "N/A"}
                           </p>
                           <p className="text-sm font-bold text-slate-500 uppercase">@ {appointmentInfo?.appointment_time || "N/A"}</p>
                        </div>
                        <div className="px-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reason</p>
                           <p className="text-sm font-semibold text-slate-700 dark:text-slate-400 leading-snug italic">
                              "{appointmentInfo?.reason || "No reason specified"}"
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-cyan-200 dark:border-slate-800 bg-cyan-50/20 dark:bg-slate-950 p-8 rounded-2xl">
                     <CardContent className="p-0 flex flex-col items-center text-center space-y-4">
                        <div className="h-16 w-16 bg-white dark:bg-slate-900 rounded-3xl shadow-xl flex items-center justify-center text-cyan-500 transform rotate-3">
                           <PlusCircle size={32} />
                        </div>
                        <div className="space-y-1">
                           <p className="font-black text-slate-800 dark:text-slate-200 text-lg italic tracking-tight uppercase">Prescription</p>
                           <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Required Action</p>
                        </div>
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl shadow-lg shadow-cyan-500/20 h-14 font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.03] active:scale-95"
                           onClick={() => navigate(`doctor/my-medicalRecords/${medical_record_id}/prescription`)}
                        >
                           Generate Now
                        </Button>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ViewMedicalRecord;