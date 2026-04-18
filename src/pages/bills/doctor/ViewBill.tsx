import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateQR, getBillByAppointment } from "@/features/general/api";
import type { Bill } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Download, ReceiptText, ShoppingBag, Tag, QrCode } from "lucide-react";
import { useParams } from "react-router-dom"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BillPDF } from './BillPDF';
import MyLoader from "@/components/MyLoader";

const ViewBill = () => {
   const { appointment_id } = useParams();

   const { data, isLoading: isBillLoading } = useQuery<Bill>({
      queryKey: ["bill", appointment_id],
      queryFn: async () => {
         const res = await getBillByAppointment(String(appointment_id));
         if (!res.success) throw new Error(res.message);
         return res.data;
      }
   });

   const { data: Qr, isLoading: isQrLoading } = useQuery({
      queryKey: ["QR", data?.bill_id],
      queryFn: async () => {
         const res = await generateQR(String(data?.bill_id));
         if (!res.success) throw new Error(res.message);
         return res.data;
      },
      enabled: !!data?.bill_id
   });

   if (isBillLoading) return <div className="h-screen flex items-center justify-center"><MyLoader /></div>;

   return (
      <div className="min-h-screen p-4 md:p-8 space-y-6 animate-in fade-in duration-700 max-w-5xl mx-auto dark:bg-slate-950">

         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
            <div>
               <DynamicBreadcrumb
                  homeHref={"/doctor"}
                  items={[{ label: "Billing", href: "/doctor/billing" }, { label: "Invoice" }]}
               />
               <h1 className="text-3xl font-black text-cyan-600 dark:text-cyan-500 tracking-tighter">
                  Invoice Details
               </h1>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <PDFDownloadLink
                  document={<BillPDF data={data} qrCode={Qr?.qr} />}
                  fileName={`${data?.bill_number}.pdf`}
               >
                  {({ loading }) => (
                     <Button
                        className="flex-1 md:flex-none bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black shadow-lg shadow-cyan-600/20"
                        disabled={loading || isQrLoading}
                     >
                        <Download size={18} className="mr-2" />
                        {loading ? "Preparing..." : "Download PDF"}
                     </Button>
                  )}
               </PDFDownloadLink>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2">
            <div className="space-y-6">
               <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800 transition-colors duration-500">
                  <CardContent className="pt-10 pb-8 text-center relative">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl -z-0" />
                     <div className="relative z-10 flex flex-col items-center">
                        <Badge className={`mb-4 rounded-full text-[10px] font-black border-none shadow-sm ${data?.status === 'PENDING'
                           ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                           : 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'
                           }`}>
                           {data?.status}
                        </Badge>

                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">
                           Invoice Amount
                        </h3>
                        <p className="text-4xl font-black text-slate-900 dark:text-cyan-400 tracking-tighter italic mb-6">
                           ₹{data?.net_amount}
                        </p>

                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 mb-6">
                           {isQrLoading ? (
                              <div className="h-32 w-32 flex items-center justify-center text-slate-400"><Clock className="animate-spin" /></div>
                           ) : (
                              <img src={Qr?.qr} alt="Scan to Pay" className="h-32 w-32 object-contain" />
                           )}
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                              <QrCode size={12} /> Scan to Pay
                           </p>
                        </div>

                        <div className="w-full pt-8 border-t border-slate-100 dark:border-white/10 space-y-4">
                           <div className="flex items-center justify-center gap-3">
                              <Avatar className="h-12 w-12 border-2 border-cyan-100 dark:border-slate-800 shadow-sm">
                                 <AvatarFallback className="bg-cyan-600 text-white font-black">
                                    {data?.patient?.user?.name[0] || "P"}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="text-left">
                                 <p className="font-black leading-none text-slate-800 dark:text-slate-200 capitalize">
                                    {data?.patient?.user?.name}
                                 </p>
                                 <p className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-1 font-medium">
                                    {data?.patient?.user?.email}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-2xl ring-1 ring-slate-100 dark:ring-slate-800">
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase">
                           <Calendar size={14} /> Bill Date
                        </div>
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{data?.bill_date}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase">
                           <ReceiptText size={14} /> Bill No.
                        </div>
                        <span className="font-bold text-sm tracking-tight text-slate-700 dark:text-slate-300">
                           {data?.bill_number.split('-')[1]}
                        </span>
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="lg:col-span-2">
               <Card className="shadow-2xl border-none bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl overflow-hidden">
                  <CardHeader className="px-8 pt-8 flex flex-row items-center gap-3">
                     <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-600">
                        <ShoppingBag size={24} />
                     </div>
                     <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">Order Summary</CardTitle>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                     <div className="mt-6 space-y-4">
                        {data?.items.map((item, idx) => (
                           <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 group hover:border-cyan-500/50 transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-cyan-500 transition-colors text-xs font-black italic underline uppercase decoration-cyan-500">
                                    {item.item_type[0]}
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-wide">{item.item_type}</p>
                                    <p className="text-[10px] font-bold text-slate-400 italic tracking-tighter decoration-cyan-500">Qty: {item.quantity} × ₹{item.unit_price}</p>
                                 </div>
                              </div>
                              <p className="font-black text-slate-800 dark:text-white italic text-lg">₹{item.amount}</p>
                           </div>
                        ))}
                     </div>

                     <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-100 dark:border-slate-800 space-y-3">
                        <div className="flex justify-between text-sm font-bold text-slate-500">
                           <span>Subtotal</span>
                           <span>₹{data?.total_amount}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-red-500">
                           <span className="flex items-center gap-1"><Tag size={14} /> Discount</span>
                           <span>- ₹{data?.discount_amount}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                           <span className="text-lg font-black uppercase tracking-tighter dark:text-white">Net Payable</span>
                           <span className="text-3xl font-black text-cyan-600 tracking-tighter italic">₹{data?.net_amount}</span>
                        </div>
                     </div>

                     <div className="mt-8 p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/20 flex items-center gap-3">
                        <Clock className="text-cyan-600" size={20} />
                        <p className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 leading-tight uppercase tracking-widest">
                           This bill is currently {data?.status}. Please complete payment at the front desk.
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default ViewBill;