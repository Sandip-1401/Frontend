import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { createAppointment, getAvilableSlots, getDoctorSchedule } from '@/features/general/api';
import type { ScheduleResponse } from '@/types/apiResponse';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
// import "react-day-picker/dist/style.css";

type Days = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

const style = {
   background: "#ef4444",
   color: "white",
   borderRadius: "10px",
   padding: "12px",
}

const ShowDoctorSchedule = () => {

   const { doctorId } = useParams();
   const [schedule, setSchedule] = useState<ScheduleResponse[]>([])
   const [selectedDate, setSelectedDate] = useState<Date | undefined>()
   const [avilableSlots, setAvilableSlots] = useState<string[]>([])
   const [selectedSlote, setSelectedSlote] = useState<string | null>(null);
   const [reason, setReason] = useState("");
   const [serverError, setServerError] = useState<string | null>(null);

   useEffect(() => {
      const getSchedule = async () => {
         const res = await getDoctorSchedule(String(doctorId));

         if (!res.success) {
            return
         }
         setSchedule(res.data)
      }
      getSchedule();
   }, [doctorId])

   //response me se days nikal ke array me rakhna...
   const avilableDays = schedule.map(s => s.day_of_week);

   //function jo Date se uska Day nikale
   const getDaysFromDate = (date: Date): Days => {
      return date.toLocaleDateString('en-US', { weekday: "long" }).toUpperCase() as Days;
   }

   //calender ke liye ki us date par avilable hai ya nahi...
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   const isDateAvilable = (date: Date): boolean => {
      const day = getDaysFromDate(date);

      const isAvilableDay = avilableDays.includes(day);

      const isPast = date < today;

      return isAvilableDay && !isPast;
   }
   // console.log(selectedDate)

   //selected date ka day nikala 
   const selectedDay = selectedDate ? getDaysFromDate(selectedDate) : null;

   //matching schedule find kya...us selectedDate ke day par se
   const selectedSchedule = schedule.find((s) => s.day_of_week === selectedDay);

   // console.log("Selected Date:", selectedDate);
   // console.log("Selected Day:", selectedDay);
   // console.log("Selected Schedule:", selectedSchedule);


   // generete all slote possible
   const generateSlotes = (schedule: ScheduleResponse): string[] => {
      const slots: string[] = [];

      let start = new Date(`1970-01-01T${schedule.start_time}`);
      const end = new Date(`1970-01-01T${schedule.end_time}`);

      while (start < end) {
         const hours = start.getHours().toString().padStart(2, "0");
         const minutes = start.getMinutes().toString().padStart(2, "0");

         slots.push(`${hours}:${minutes}`);

         start = new Date(start.getTime() + schedule.slot_duration_minutes * 60000)
      };

      return slots;
   }

   const allSlots = selectedSchedule ? generateSlotes(selectedSchedule) : [];
   console.log(allSlots)


   const formatDateLocal = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
   };

   
   const fetchSlots = async () => {
      if (!selectedDate) return;
      
      const formattedDate = selectedDate
      ? formatDateLocal(selectedDate)
      : "";
      const res = await getAvilableSlots(String(doctorId), formattedDate)
      
      if (!res.success) return;
      
      setAvilableSlots(res.data)
   };

   useEffect(() => {
      fetchSlots();
   }, [selectedDate, doctorId])

   console.log(avilableSlots);

   const isSloteAvilable = (slot: string) => {
      return avilableSlots.includes(slot)
   }



   const handleBooking = async () => {
      if (!selectedDate) {
         toast.error("Data missing", {
            duration: 5000,
            description: "Plese select Date.",
            style: style
         });
         return;
      }
      if (!selectedSlote) {
         toast.error("Data missing", {
            duration: 5000,
            description: "Please select slot.",
            style: style,
         });
         return;
      }
      if (!reason) {
         toast.error("Data missing", {
            duration: 5000,
            description: "Please write a reason for Appointment.",
            style: style
         });
         return;
      };

      const formattedDate = formatDateLocal(selectedDate);

      const res = await createAppointment({
         doctor_id: String(doctorId),
         appointment_date: formattedDate,
         appointment_time: selectedSlote,
         reason
      });

      if (!res.success) {
         setServerError(res.message);
         throw new Error(res.message)
      }

      toast.success("Appointment created!", {
         duration: 3000,
         description: "Your slot has been booked successfully.",
         style: {
            background: "#22c55e",
            color: "white",
            borderRadius: "10px",
            padding: "12px",
         },
      });

      await fetchSlots();
      
      setSelectedSlote(null);
      setReason('')
   }



   return (
      <div className="p-4">
         <DynamicBreadcrumb
            homeHref={"/patient"}
            items={[
               { label: "All Doctors", href: '/patient/all-doctors' },
               { label: "Doctor Schedule" },
            ]}
         />
         <div>
            <h1 className="text-3xl font-bold text-primary ml-4">Doctor Schedule</h1>
         </div>

         <div>
            <p className='text-lg dark:text-cyan-500 text-gray-800 font-semibold mt-4 mx-3'>Pick Date</p>
            <Calendar
               mode='single'
               selected={selectedDate}
               onSelect={setSelectedDate}
               disabled={(date) => !isDateAvilable(date)}
               className='min-w-80 bg-transparent border-3 rounded-xl p-4 shadow-[0_0_8px_#000000] mx-auto mt-3 dark:bg-slate-900'
            />

            <p className='text-lg dark:text-cyan-500 text-gray-800 font-semibold mt-4 mx-3'>Select Slot</p>
            {!selectedDate && (
               <div className='bg-red-300 mx-3 flex items-center justify-center p-3 rounded-lg mt-3 text-red-500'>
                  <AlertCircle className='mr-2' /> Please select one date...!
               </div>
            )}
            <div className={`${selectedDate ? "min-w-80 p-4 grid grid-cols-2 gap-1" : "mb-2"}`}>
               {allSlots.map((slot) => {

                  // <div key={slot} className='w-full h-full flex items-center justify-center rounded-md py-2 hover:bg-cyan-400 hover:border-none bg-gray-300'>{slot}</div>

                  const isAvilable = isSloteAvilable(slot);
                  return (
                     <button
                        key={slot}
                        onClick={() => setSelectedSlote(slot)}
                        className={`w-full h-full flex items-center justify-center rounded-md py-2 
                           ${isAvilable
                              ? selectedSlote === slot ? "bg-cyan-500 hover:border-none" : " bg-gray-400 active:scale-95 duration-700 dark:text-gray-300 dark:bg-slate-800"
                              : "bg-red-400 cursor-not-allowed "}`}
                     >
                        {slot}
                     </button>
                  )

               })}
            </div>
            <p className={`text-lg dark:text-cyan-500 text-gray-800 font-semibold  mx-3`}>Give Reason:</p>
            <div className='mx-3 mt-3'>
               <textarea
                  placeholder="Enter reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className='border border-gray-600 rounded-lg w-full min-h-24 p-2 bg-gray-200 dark:bg-slate-800'
               />
            </div>
            {serverError && (
               <p className="text-red-500 text-sm">{serverError}</p>
            )}
            <div className='m-3'>
               <Button onClick={handleBooking} className='py-5 w-full '>Book Appointment</Button>
            </div>
         </div>


      </div>
   )
}

export default ShowDoctorSchedule
