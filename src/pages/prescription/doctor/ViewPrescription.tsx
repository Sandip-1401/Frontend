import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateBill, prescriptionById } from "@/features/general/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
   Activity,
   Calendar,
   Download,
   Pill,
   Printer,
   Stethoscope,
   Scale,
   Ruler
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MyLoader from "@/components/MyLoader";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PrescriptionPDF } from "../PrescriptionPDF";
import { toast } from "sonner";

const ViewPrescription = () => {
   const navigate = useNavigate();
   const { prescription_id } = useParams();

   const { data, isLoading, isError } = useQuery({
      queryKey: ["prescription", prescription_id],
      queryFn: async () => {
         const res = await prescriptionById(String(prescription_id));
         if (!res.success) throw new Error(res.message);
         return res.data;
      },
      staleTime: 1000 * 1 * 60,
      refetchOnWindowFocus: false
   });

   const { mutate: handleGenerateBill, isPending } = useMutation({
      mutationFn: generateBill,
      onSuccess: () => {
         toast.success("Bill generated successfully!", {
                     duration: 3000,
                     description: "Your Bill has been created successfully.",
                     style: {
                        background: "#22c55e",
                        color: "white",
                        borderRadius: "10px",
                        padding: "12px",
                     },
                  });
      },
      onError: (err) => toast.error(err.message)
   });

   if (isLoading) {
      return (
         <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
            <MyLoader />
         </div>
      );
   }

   if (isError || !data) {
      return (
         <div className="h-screen flex flex-col items-center justify-center space-y-4 dark:text-white">
            <p className="text-xl font-bold italic text-red-500">Failed to fetch prescription!</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
         </div>
      );
   }

   const { patient, medical_record, medicines, doctor } = data;

   return (
      <div className="min-h-screen p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto dark:bg-slate-950">

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <div className="space-y-1">
               <DynamicBreadcrumb
                  homeHref={"/doctor"}
                  items={[
                     { label: "Medical Records", href: "/doctor/medical-records" },
                     { label: "Prescription View" },
                  ]}
               />
               <h1 className="text-4xl font-black text-cyan-500 dark:text-white tracking-tighter flex items-center gap-3">
                  <Pill size={36} className="text-cyan-500" /> Rx Prescription
               </h1>
            </div>
            <div className="flex gap-3">
               <Button
                  variant="outline"
                  className="..."
                  disabled={isPending}
                  onClick={() => handleGenerateBill(data.prescription_id)}
               >
                  <Printer size={18} className="mr-2" />
                  {isPending ? "Generating..." : "Generate Bill"}
               </Button>

               <PDFDownloadLink
                  document={<PrescriptionPDF data={data} />}
                  fileName={`Prescription-${data.patient.user.name}.pdf`}
               >
                  {({ loading }) => (
                     <Button className="bg-cyan-500 ..." disabled={loading}>
                        <Download size={18} className="mr-2" />
                        {loading ? "Generating..." : "Download PDF"}
                     </Button>
                  )}
               </PDFDownloadLink>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-8">

            <div className="lg:col-span-4 space-y-6">
               <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
                  <CardContent className="pt-10 pb-8 px-8 text-center">
                     <div className="relative inline-block mb-4">
                        <Avatar className="h-24 w-24 border-4 border-cyan-50 dark:border-slate-800 shadow-xl mx-auto">
                           <AvatarFallback className="bg-gradient-to-br from-cyan-300 to-cyan-500 text-white text-3xl font-black">
                              {patient.user.name.substring(0, 2).toUpperCase()}
                           </AvatarFallback>
                        </Avatar>
                     </div>

                     <h2 className="text-2xl font-black text-slate-800 dark:text-white capitalize tracking-tight">
                        {patient.user.name}
                     </h2>
                     <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1 italic">
                        ID: {data.prescription_id.split('-')[0]}
                     </p>

                     <div className="flex flex-wrap justify-center gap-2 mt-6">
                        <Badge variant="secondary" className="rounded-full px-4 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter">
                           {patient.gender}
                        </Badge>
                        <Badge className="rounded-full px-4 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter">
                           Blood: {patient.blood_group}
                        </Badge>
                     </div>

                     <div className="grid grid-cols-2 gap-3 mt-8">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 flex flex-col items-center">
                           <Scale size={16} className="text-slate-400 mb-1" />
                           <p className="text-[10px] font-black text-slate-400 uppercase">Weight</p>
                           <p className="text-lg font-black text-cyan-600">{patient.weight} <small className="text-[10px]">kg</small></p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 flex flex-col items-center">
                           <Ruler size={16} className="text-slate-400 mb-1" />
                           <p className="text-[10px] font-black text-slate-400 uppercase">Height</p>
                           <p className="text-lg font-black text-cyan-600">{patient.height} <small className="text-[10px]">cm</small></p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white rounded-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Stethoscope size={80} />
                  </div>
                  <CardContent className="pt-8 pb-8 px-8 relative z-10">
                     <h3 className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400 mb-4 flex items-center gap-2">
                        <Activity size={14} /> Diagnosis
                     </h3>
                     <p className="text-xl font-bold italic leading-snug tracking-tight text-slate-100">
                        "{medical_record.diagnosis}"
                     </p>
                  </CardContent>
               </Card>
            </div>

            <div className="lg:col-span-8 space-y-6">
               <Card className="shadow-2xl border-none bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl overflow-hidden">
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b dark:border-slate-800/50 px-8 py-6">
                     <div className="flex justify-between items-center text-center sm:text-left">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center text-cyan-600">
                              <Calendar size={20} />
                           </div>
                           <CardTitle className="text-xl text-gray-600 font-bold tracking-tighter uppercase">Treatment Plan</CardTitle>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase">Date</p>
                           <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                              {new Date(data.prescribed_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                           </p>
                        </div>
                     </div>
                  </CardHeader>

                  <CardContent className="p-0">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                           <thead>
                              <tr className="bg-slate-100/50 dark:bg-slate-950/50">
                                 <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Medicine Details</th>
                                 <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Dosage Schedule</th>
                                 <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Duration</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y dark:divide-slate-800">
                              {medicines.map((med, idx) => (
                                 <tr key={idx} className="group hover:bg-cyan-50/30 dark:hover:bg-cyan-900/5 transition-all">
                                    <td className="px-8 py-6">
                                       <p className="font-semibold text-slate-700 dark:text-white text-lg tracking-tighter">{med.medicine_name}</p>
                                       <div className="flex items-center gap-2 mt-1">
                                          <Badge variant="outline" className="text-[9px] font-bold text-cyan-600 border-cyan-200">₹{med.unit_price}</Badge>
                                          <span className="text-xs font-medium text-slate-400 italic">Qty: {med.dosage}</span>
                                       </div>
                                    </td>
                                    <td className="px-8 py-6">
                                       <div className="flex justify-center gap-2">
                                          {med.frequency.split('-').map((f, i) => (
                                             <div key={i} className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-xs transition-all ${f === '1' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-300'}`}>
                                                {f === '1' ? (i === 0 ? 'M' : i === 1 ? 'A' : 'N') : '✕'}
                                             </div>
                                          ))}
                                       </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                       <p className="font-black text-slate-700 dark:text-slate-200 text-lg italic">{med.duration_days} <span className="text-[10px] uppercase font-bold text-slate-400">Days</span></p>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     <div className="m-8 p-8 rounded-[2rem] bg-cyan-50/30 dark:bg-cyan-900/10 border-2 border-dashed border-cyan-200/50 dark:border-cyan-900/20 relative">
                        {/* <FileText className="absolute top-[-12px] left-6 text-cyan-500 bg-white dark:bg-slate-950 px-2" size={24} /> */}
                        <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em] mb-3 italic">Instructions & Notes:</h4>
                        <p className="text-slate-600 dark:text-slate-300 font-bold italic text-lg leading-relaxed">
                           "{data.notes}"
                        </p>
                        <p className="text-xs text-slate-400 mt-4 border-t pt-2 dark:border-slate-800">
                           <span className="font-bold uppercase tracking-widest text-[10px]">Clinical Remark:</span> {medical_record.notes}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               <div className="flex justify-between items-center px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     Signed by Dr. {doctor.user.name} ({doctor.qualification})
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ViewPrescription;