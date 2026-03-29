import { type ReactElement } from "react";
import { getMyDocProfile } from "@/features/general/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Mail, Phone, ShieldCheck, MailIcon, Pencil, Stethoscope, Building2, IndianRupee, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/components/MyLoader";
import ErrorMessage from "../../components/ErrorMessage";

export const DoctorProfile = () => {

   const { data, isLoading, error } = useQuery({
      queryKey: ["doctor"],
      queryFn: async () => {
         const res = await getMyDocProfile();
         if (!res.success) {
            throw new Error(res.message);
         }
         return res.data;
      },
   });

   const doctor = data?.doctor

   
   
   return (
      <div className="p-4">
         <DynamicBreadcrumb
            homeHref={"/doctor"}
            items={[{ label: "My Profile" }]}
         />
         <div className="p-2">
            <div className="flex items-center">
               <h1 className="text-3xl font-bold text-primary ml-4">My Profile</h1>
               <Button className="ml-auto py-4 hover:bg-cyan-500">
                  <Pencil /> Edit Profile
               </Button>
            </div>

            <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">

         {isLoading && <MyLoader />}
          {error && <ErrorMessage errorProp={error.message} />}


               {doctor && (
                  <>
                     <div className="relative overflow-hidden rounded-3xl p-6 md:p-10 shadow-sm dark:bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-md border-2 border-primary dark:border-none">
                        <div className="absolute bg-cyan-400 md:h-52 md:w-48 md:top-0 md:left-0 h-28 w-full top-0 left-0" />
                        <div className="flex flex-col md:flex-row items-center gap-16">
                           <Avatar className="h-28 w-28 bg-white shadow-zinc-800 z-10 md:top-0 top-7">
                              <AvatarFallback className="text-4xl bg-cyan-100 text-cyan-700 font-bold">
                                 {doctor.user.name.charAt(0)}
                              </AvatarFallback>
                           </Avatar>

                           <div className="flex-1 text-center md:text-left space-y-3">
                              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                                 <h1 className="text-3xl font-bold tracking-tight">{doctor?.user.name}</h1>
                                 <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 capitalize">
                                    {doctor?.status}
                                 </Badge>
                                 {doctor?.is_available && (
                                    <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">
                                       Available
                                    </Badge>
                                 )}
                              </div>

                              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground">
                                 <span className="flex items-center gap-1.5 text-sm"><Mail className="w-4 h-4" /> {doctor?.user.email}</span>
                                 <span className="flex items-center gap-1.5 text-sm"><Phone className="w-4 h-4" /> {doctor?.user.phone_number}</span>
                                 <span className="flex items-center gap-1.5 text-sm"><ShieldCheck className="w-4 h-4" /> {doctor.role}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <Tabs defaultValue="personal" className="w-full flex flex-col">
                        <TabsList className="inline-flex sm:h-12 items-center justify-start border sm:rounded-full bg-transparent sm:p-0 w-full sm:gap-8 mb-6 text-sm overflow-x-scroll rounded-full sm:overflow-hidden scrollbar-hide dark:border-gray-200/40">
                           <TabsTrigger value="personal" className="sm:rounded-full rounded-full font-semibold text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                              Personal Details
                           </TabsTrigger>
                           <TabsTrigger value="medical" className="sm:rounded-full rounded-full font-semibold text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                              Medical Info
                           </TabsTrigger>
                           <TabsTrigger value="address" className="sm:rounded-full rounded-full font-semibold text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                              Address & Contact
                           </TabsTrigger>
                        </TabsList>

                        <TabsContent value="medical" className="space-y-6 outline-none">
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <StatBox
                                 icon={<Stethoscope className="text-cyan-500" />}
                                 label="Qualification"
                                 value={doctor?.qualification}
                                 color="bg-cyan-500/5"
                              />
                              <StatBox
                                 icon={<Clock className="text-orange-500" />}
                                 label="Experience"
                                 value={`${doctor?.experience_years} yrs`}
                                 color="bg-orange-500/5"
                              />
                              <StatBox
                                 icon={<IndianRupee className="text-green-500" />}
                                 label="Consult Fee"
                                 value={`₹${parseFloat(String(doctor?.consultation_fee)).toFixed(0)}`}
                                 color="bg-green-500/5"
                              />
                              <StatBox
                                 icon={<Building2 className="text-purple-500" />}
                                 label="Department"
                                 value={doctor?.department.department_name}
                                 color="bg-purple-500/5"
                              />
                           </div>
                        </TabsContent>

                        <TabsContent value="personal" className="space-y-6 outline-none">
                           <Card className="border shadow-none dark:border-2 dark:border-gray-200/30">
                              <CardHeader>
                                 <CardTitle>Personal Details</CardTitle>
                              </CardHeader>
                              <CardContent className="grid sm:grid-cols-2 gap-6">
                                 <InfoRow label="Full Name" value={doctor?.user.name} />
                                 <InfoRow label="Email" icon={<MailIcon />} value={doctor?.user.email} />
                                 <InfoRow label="Phone No." value={doctor?.user.phone_number} />
                                 <InfoRow label="Qualification" value={doctor?.qualification} />
                                 <InfoRow label="Experience" value={`${doctor?.experience_years} Years`} />
                                 <InfoRow label="Verification" value={doctor?.user.is_verified ? "Verified" : "Not Verified"} isBadge />
                              </CardContent>
                           </Card>
                        </TabsContent>

                        <TabsContent value="address" className="outline-none">
                           <Card className="border bg-transparent dark:border dark:border-gray-200/30">
                              <CardHeader>
                                 <CardTitle className="flex items-center gap-2 font-bold">
                                    <MapPin className="w-5 h-5 text-primary" /> Location Info
                                 </CardTitle>
                                 <CardDescription>Registered clinic / residential address</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4 pt-4">
                                 <div className="grid md:grid-cols-2 gap-8 text-sm lg:text-base">
                                    <div className="space-y-1">
                                       <p className="text-muted-foreground font-medium">Street Address</p>
                                       <p className="font-semibold">{doctor?.address.address_line_1}</p>
                                       <p>{doctor?.address.address_line_2}</p>
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-muted-foreground font-medium">City & State</p>
                                       <p className="font-semibold">{doctor?.address.city}, {doctor?.address.state}</p>
                                       <p className="text-primary font-mono tracking-tighter uppercase">
                                          {doctor?.address.country} - {doctor?.address.pincode}
                                       </p>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        </TabsContent>
                     </Tabs>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

type InfoRowType = {
   icon: ReactElement;
   label: string;
   value: string | undefined;
   color: string;
   isBadge?: boolean;
};

function StatBox({ icon, label, value, color }: InfoRowType) {
   return (
      <div className="p-4 rounded-2xl border dark:border-gray-600 flex flex-col gap-2 transition-all hover:shadow-md bg-card">
         <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>{icon}</div>
         <div>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none mb-1">{label}</p>
            <p className="text-lg font-bold">{value}</p>
         </div>
      </div>
   );
}

function InfoRow({ label, value, isBadge = false }: Partial<InfoRowType>) {
   return (
      <div className="space-y-1">
         <p className="text-xs text-muted-foreground font-medium uppercase">{label}</p>
         {isBadge ? <Badge variant="outline">{value}</Badge> : <p className="font-semibold">{value}</p>}
      </div>
   );
}

export default DoctorProfile;