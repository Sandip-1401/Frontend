import { type ReactElement } from "react";
import { getMyProfile } from "@/features/general/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets, MapPin, Ruler, Weight, User, Mail, Phone, ShieldCheck, MailIcon, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MaleIcon from "@/assets/MaleIcon.avif"
import FemaleIcon from "@/assets/FemaleIcon.jpg"
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { useQuery } from "@tanstack/react-query";
import MyLoader from "@/components/MyLoader";
import ErrorMessage from "./ErrorMessage";

export const PatientProfile = () => {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await getMyProfile();
      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data
    }
  })

  const patient = data?.patient;

  return (
    <div className="p-4">
      <DynamicBreadcrumb
        homeHref={"/patient"}
        items={[
          { label: "My Profile" },
        ]}
      />
      <div className="p-2">
        <div className=" flex items-center ">
          <h1 className="text-3xl font-bold text-primary ml-4">My Profile</h1>
          <Button className="ml-auto py-4 hover:bg-cyan-500"> <Pencil /> Edit Profile </Button>
        </div>
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">

          {isLoading && <MyLoader />}
          {error && <ErrorMessage errorProp={error.message} />}

          {patient && (<>
            <div className={`relative overflow-hidden rounded-3xl p-6 md:p-10 shadow-sm dark:bg-gradient-to-br from-white/10 to-white/10 backdrop-blur-md  border-2 border-primary dark:border-none`}>
              <div className="absolute bg-cyan-400 md:h-52 md:w-48 md:top-0 md:left-0 h-28 w-full top-0 left-0 "> </div>
              <div className="flex flex-col md:flex-row items-center gap-16">
                <Avatar className="h-28 w-28 bg-white  shadow-zinc-800 z-10 md:top-0 top-7">
                  <AvatarImage src={patient?.gender === "MALE" ? MaleIcon : FemaleIcon} />
                  <AvatarFallback className="text-2xl">{patient?.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">{patient?.user.name}</h1>
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 capitalize">
                      {patient?.user.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-sm"><Mail className="w-4 h-4" /> {patient?.user.email}</span>
                    <span className="flex items-center gap-1.5 text-sm"><Phone className="w-4 h-4" /> {patient?.user.phone_number}</span>
                    <span className="flex items-center gap-1.5 text-sm"><ShieldCheck className="w-4 h-4" /> {patient?.Role}</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="medical" className="w-full flex flex-col">
              <TabsList className="inline-flex sm:h-12 items-center justify-start border sm:rounded-full bg-transparent sm:p-0 w-full sm:gap-8 mb-6 text-sm overflow-x-scroll rounded-full sm:overflow-hidden scrollbar-hide dark:border-gray-200/40">
                <TabsTrigger value="Personal Details" className="sm:rounded-full rounded-full font-semibold  text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="medical" className="sm:rounded-full rounded-full font-semibold  text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                  Medical Records
                </TabsTrigger>
                <TabsTrigger value="address" className="sm:rounded-full rounded-full font-semibold  text-md shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-3">
                  Address & Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="medical" className="space-y-6 outline-none">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatBox icon={<Droplets className="text-red-500 " />} label="Blood" value={patient?.blood_group} color="bg-red-500/5" />
                  <StatBox icon={<Ruler className="text-blue-500" />} label="Height" value={patient?.height} color="bg-blue-500/5" />
                  <StatBox icon={<Weight className="text-orange-500" />} label="Weight" value={patient?.weight} color="bg-orange-500/5" />
                  <StatBox icon={<User className="text-purple-500" />} label="Gender" value={patient?.gender} color="bg-purple-500/5" />
                </div>
              </TabsContent>

              <TabsContent value="Personal Details" className="space-y-6 outline-none">
                <Card className="border shadow-none dark:border-2 dark:border-gray-200/30">
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-6">
                    <InfoRow label="Full Name" value={patient?.user.name} />
                    <InfoRow label="Email" icon={<MailIcon />} value={patient?.user.email} />
                    <InfoRow label="Date of Birth" value={patient?.date_of_birth} />
                    <InfoRow label="Phone no." value={patient?.user.phone_number} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="address" className="outline-none">
                <Card className="border bg-transparent dark:border dark:border-gray-200/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-bold"><MapPin className="w-5 h-5 text-primary" /> Location Info</CardTitle>
                    <CardDescription>Verified residential address</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid md:grid-cols-2 gap-8 text-sm lg:text-base">
                      <div className="space-y-1">
                        <p className="text-muted-foreground font-medium">Street Address</p>
                        <p className="font-semibold">{patient?.address.address_line_1}</p>
                        <p>{patient?.address.address_line_2}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground font-medium">City & State</p>
                        <p className="font-semibold">{patient?.address.city}, {patient?.address.state}</p>
                        <p className="text-primary font-mono tracking-tighter uppercase">{patient?.address.country} - {patient?.address.pincode}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>)}
        </div>
      </div>
    </div>
  );
};

type InfoRowType = {
  icon: ReactElement,
  label: string,
  value: string | undefined,
  color: string,
  isBadge?: boolean
}

function StatBox({ icon, label, value, color }: InfoRowType) {
  return (
    <div className={`p-4 rounded-2xl border dark:border-gray-600 flex flex-col gap-2 transition-all hover:shadow-md bg-card`}>
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