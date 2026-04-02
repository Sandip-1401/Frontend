import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import ErrorMessage from "@/components/ErrorMessage"
import MyLoader from "@/components/MyLoader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { TimePicker } from "@/components/ui/time-picker"
import { createSchedule, deleteSchedule, getMySchedules } from "@/features/general/api"
import type { Doctor, DoctorSchedule } from "@/types/apiResponse"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { AlertCircleIcon, Calendar, Pencil } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type DayOfWeek = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

interface FormData {
   day_of_week: DayOfWeek
   start_time: string
   end_time: string
   slot_duration_minutes: number
   max_patients: number
   doctor?: Doctor
}

const MySchedules = () => {

   const queryClient = useQueryClient();

   const [selectedDay, setSelectedDay] = useState<DayOfWeek>();

   const form = useForm<FormData>({
      mode: "onSubmit",
      defaultValues: {
         day_of_week: 'MONDAY',
         start_time: '',
         end_time: '',
         slot_duration_minutes: 30,
         max_patients: 1
      }
   })

   const { data, isLoading, error } = useQuery<DoctorSchedule[]>({
      queryKey: ["scheduls"],
      queryFn: async () => {
         const res = await getMySchedules();

         if (!res.success) {
            throw new Error(res.message)
         }
         return res.data ?? [];
      },
      // staleTime: 1000 * 5 * 60,
   })

   const mutation = useMutation({
      mutationFn: async (payload: DoctorSchedule) => {
         const res = await createSchedule(payload);

         if (!res.success) {
            throw new Error(res.message);
         }
         return res.data
      },
      onSuccess: () => {
         form.reset();
         toast.success("Schedule created!", {
            duration: 3000,
            description: "Your schedule has been created successfully.",
            style: {
               background: "#22c55e",
               color: "white",
               borderRadius: "10px",
               padding: "12px",
            },
         });
      },
      onError: (error) => {
         form.setError("root", {
            type: "server",
            message: error.message,
         });
      },
   })

   const onSubmit = (Formdata: DoctorSchedule) => {
      console.log("Clicked", Formdata)
      mutation.mutate(Formdata)
   }

   const filtereData = data?.filter((item) => item.day_of_week === selectedDay)

   const deleteMutation = useMutation({
      mutationFn: deleteSchedule,

      onSuccess: (res) => {
         if (!res.success) {
            toast.error(res.message, {
               duration: 3000,
               style: {
                  background: "#f87171 ",
                  color: "white",
                  borderRadius: "10px",
                  padding: "12px",
               },
            });
            return;
         }
         toast.success("Schedule deleted!", {
            duration: 3000,
            description: "Your schedule has been deleted successfully.",
            style: {
               background: "#22c55e",
               color: "white",
               borderRadius: "10px",
               padding: "12px",
            },
         });
      queryClient.invalidateQueries({ queryKey: ["scheduls"] });
      },
      onError: () => {
         toast.error("Something went wrong", {
            duration: 3000,
            style: {
               background: "#f87171 ",
               color: "white",
               borderRadius: "10px",
               padding: "12px",
            },
         });
      },

   })

   if (isLoading) {
      <MyLoader />
   }
   if (error) {
      <ErrorMessage errorProp={(error as Error).message} />
   }

   return (
      <div className="p-4">
         <DynamicBreadcrumb
            homeHref={"/doctor"}
            items={[{ label: "My Schedules" }]}
         />
         <div className="p-2">
            <div className="flex items-center justify-between">
               <h1 className="sm:text-3xl text-xl font-bold text-primary sm:ml-4">
                  My Schedules</h1>
               <div>

                  <Dialog >
                     <DialogTrigger asChild>
                        <Button className="ml-auto py-4 hover:bg-cyan-500">
                           <Pencil /> Add Schedules
                        </Button>
                     </DialogTrigger>

                     <DialogContent className="sm:max-w-sm p-0">
                        <motion.div
                           initial={{ opacity: 0, scale: 0.8, y: 40 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.8, y: 40 }}
                           transition={{ duration: 0.3 }}
                        >
                           <DialogHeader>
                              <DialogTitle className="sr-only" >Appoint your Schedule</DialogTitle>
                              <DialogDescription>
                                 {/* Fill data */}
                              </DialogDescription>
                           </DialogHeader>

                           <form onSubmit={form.handleSubmit(onSubmit)} className="dark:bg-slate-900 dark:text-white p-6 rounded-xl">
                              <FieldGroup>
                                 <Field>
                                    <FormField
                                       control={form.control}
                                       name="day_of_week"
                                       render={({ field }) => (
                                          <>
                                             <Label htmlFor="day_of_week">Choose Day of week</Label>
                                             <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full h-10 border-gray-200 dark:border-gray-50/40 hover:border-cyan-300 focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20 text-sm rounded-lg dark:bg-slate-900">
                                                   <SelectValue placeholder="Select a Day" />
                                                </SelectTrigger>
                                                <SelectContent position="popper" className=" bg-white rounded-xl border-gray-100 shadow-lg dark:bg-slate-900 dark:text-white dark:border dark:border-gray-200/40 min-w-60" >
                                                   <SelectGroup id="day_of_week">
                                                      {weekDays.map((day) => (
                                                         <SelectItem
                                                            key={day}
                                                            value={day}
                                                            className=" w-full rounded-lg py-2 text-sm text-black focus:bg-cyan-50 focus:text-cyan-700 data-[state=checked]:text-cyan-600 cursor-pointer
                                                   dark:data-[state=unchecked]:text-gray-200 dark:hover:text-black"
                                                         >
                                                            {day.charAt(0) + day.slice(1).toLowerCase()}
                                                         </SelectItem>
                                                      ))}
                                                   </SelectGroup>
                                                </SelectContent>
                                             </Select>
                                          </>
                                       )}>
                                    </FormField>
                                 </Field>
                                 <Field>
                                    <FormField
                                       control={form.control}
                                       name="start_time"
                                       render={({ field }) => (
                                          <>
                                             <Label htmlFor="start_time">Start time</Label>
                                             <TimePicker id="start_time"
                                                value={field.value}
                                                onChange={field.onChange}
                                             />
                                          </>
                                       )}
                                    >

                                    </FormField>
                                 </Field>
                                 <Field>
                                    <FormField
                                       control={form.control}
                                       name="end_time"
                                       render={({ field }) => (
                                          <>
                                             <Label htmlFor="end_time">End time</Label>
                                             <TimePicker id="end_time"
                                                value={field.value}
                                                onChange={field.onChange}
                                             />
                                          </>
                                       )}>
                                    </FormField>
                                 </Field>
                                 <Field>
                                    <FormField
                                       control={form.control}
                                       name="slot_duration_minutes"
                                       render={({ field }) => (
                                          <>
                                             <Label htmlFor="slot_duration_minutes_minutes">Slot Duration(in minutes)</Label>
                                             <RadioGroup value={String(field.value)}
                                                onValueChange={(val) => field.onChange(Number(val))} className="w-fit" id="slot_duration_minutes_minutes">
                                                <RadioGroupItem value="30" id="30minutes">
                                                   30
                                                </RadioGroupItem>
                                                <RadioGroupItem value="60" id="60minutes">
                                                   60
                                                </RadioGroupItem>
                                                <RadioGroupItem disabled value="90" id="90minutes">
                                                   90
                                                </RadioGroupItem>
                                             </RadioGroup>
                                          </>
                                       )}>
                                    </FormField>
                                 </Field>
                                 <Field>
                                    <FormField
                                       control={form.control}
                                       name="max_patients"
                                       render={({ field }) => (
                                          <>
                                             <Label htmlFor="max_patientss">Max Patient per slot</Label>
                                             <Slider
                                                value={field.value}
                                                onValueChange={(val) => field.onChange(val[0])}
                                                max={3}
                                                step={1}
                                                id="max_patientss"
                                                className={`mx-auto w-full max-w-xs ${form.formState.errors.root ? "" : "mb-7"}`}
                                             />
                                          </>
                                       )}>
                                    </FormField>
                                 </Field>
                              </FieldGroup>
                              {form.formState.errors.root && (
                                 <Alert variant="destructive" className="flex items-center bg-red-400/30 text-red-500 mt-7">
                                    <AlertCircleIcon />
                                    <AlertTitle>{form.formState.errors.root.message}
                                    </AlertTitle>
                                 </Alert>
                              )}
                              <DialogFooter className=" p-3">
                                 <Button
                                    onClick={() => { form.reset(), form.clearErrors() }}
                                    className="dark:text-black" variant="outline">Reset</Button>
                                 <Button type="submit">Save changes</Button>
                              </DialogFooter>
                           </form>
                        </motion.div>
                     </DialogContent>
                  </Dialog>
               </div>
            </div>
            <div className="mt-5 sm:p-3 md:grid md:grid-cols-2 ">
               <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 max-w-md md:w-full md:h-full mx-auto md:px-8 gap-1">
                  <Button onClick={() => setSelectedDay("SUNDAY")} className="col-span-2 py-8 ">Sunday</Button>
                  <Button onClick={() => setSelectedDay("MONDAY")} className="py-8">Monday</Button>
                  <Button onClick={() => setSelectedDay("TUESDAY")} className="py-8">Tuesday</Button>
                  <Button onClick={() => setSelectedDay("WEDNESDAY")} className="py-8">Wednesday</Button>
                  <Button onClick={() => setSelectedDay("THURSDAY")} className="py-8">Thursday</Button>
                  <Button onClick={() => setSelectedDay("FRIDAY")} className="py-8">Friday</Button>
                  <Button onClick={() => setSelectedDay("SATURDAY")} className="py-8">Saturday</Button>
               </motion.div>
               <div className="mt-5 ">
                  {!selectedDay && (
                     <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                     >
                        <Alert className="max-w-md border border-red-200 bg-red-50 text-red-800 shadow-md rounded-xl p-4 flex flex-col gap-3 animate-in fade-in mx-auto">

                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-red-100 rounded-full">
                                 <AlertCircleIcon className="h-5 w-5 text-red-600" />
                              </div>

                              <AlertTitle className="font-semibold text-base">
                                 Day not selected
                              </AlertTitle>
                           </div>

                           <AlertDescription className="text-sm text-red-700 leading-relaxed">
                              Please select a day to view the schedule.
                           </AlertDescription>

                        </Alert>
                     </motion.div>
                  )}
                  {selectedDay && filtereData?.[0]?.day_of_week === undefined && (
                     <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                     >
                        <Card className="max-w-md border-dashed border shadow-sm mx-auto border-gray-400">
                           <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">

                              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl">
                                 <div className="border border-dashed p-2 border-gray-500 rounded-lg"><Calendar /></div>
                              </div>

                              <h3 className="text-base font-semibold">
                                 No Schedule Found
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                 Doctor has not created any schedule for this day.
                              </p>

                           </CardContent>
                        </Card>
                     </motion.div>
                  )}

                  {selectedDay && filtereData?.[0]?.day_of_week !== undefined && (
                     <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
                     >
                        <Card className="w-full max-w-md rounded-xl border-0 bg-gradient-to-br from-cyan-300 via-cyan-500 to-cyan-800 p-[1px] shadow-2xl hover:scale-[1.02] transition-all duration-300 mx-auto">

                           <div className="rounded-xl bg-white/95 p-5">

                              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                                 {/* {filtereData?.[0]?.schedule_id} */}
                                 <CardTitle className="text-xl font-bold text-gray-700 flex justify-between">
                                    {filtereData?.[0]?.day_of_week ? filtereData?.[0]?.day_of_week?.charAt(0) + filtereData?.[0]?.day_of_week?.slice(1).toLocaleLowerCase() : ""}
                                 </CardTitle>
                                 <Button
                                    onClick={() => {
                                       const scheduleId = filtereData?.[0]?.schedule_id;
                                       if (!scheduleId) {
                                          toast.error("Something went wrong", {
                                             duration: 3000,
                                             style: {
                                                background: "#f87171 ",
                                                color: "white",
                                                borderRadius: "10px",
                                                padding: "12px",
                                             },
                                          });
                                          return;
                                       }
                                       deleteMutation.mutate(scheduleId);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 active:bg-red-500">Delete</Button>
                              </CardHeader>

                              <CardContent className="p-0 space-y-5">

                                 <div className="text-3xl font-bold text-gray-700 tracking-tight">
                                    {filtereData?.[0]?.start_time} - {filtereData?.[0]?.end_time}
                                 </div>
                                 <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center shadow-inner">
                                    <div>
                                       <p className="text-xs text-gray-500 uppercase tracking-wide">Slot</p>
                                       <p className="text-lg font-semibold text-gray-800">
                                          {filtereData?.[0]?.slot_duration_minutes} min
                                       </p>
                                    </div>

                                    <div className="h-10 w-[1px] bg-gray-200" />

                                    <div className="text-right">
                                       <p className="text-xs text-gray-500 uppercase tracking-wide">Patients</p>
                                       <p className="text-lg font-semibold text-gray-800">
                                          {filtereData?.[0]?.max_patients}
                                       </p>
                                    </div>
                                 </div>

                              </CardContent>

                           </div>
                        </Card>
                     </motion.div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default MySchedules