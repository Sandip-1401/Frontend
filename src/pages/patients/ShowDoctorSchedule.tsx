import { getDoctorSchedule } from '@/features/general/api';
import type { ScheduleResponse } from '@/types/apiResponse';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Days = "MONDAY"|"TUESDAY"|"WEDNESDAY"|"THURSDAY"|"FRIDAY"|"SATURDAY"|"SUNDAY";

const ShowDoctorSchedule = () => {

   const { doctorId } = useParams();
   const [schedule, setSchedule] = useState<ScheduleResponse[]>([])

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
   console.log(avilableDays);

   //function jo Date se uska Day nikale
   const getDaysFromDate = (date: Date): Days => {
      return date.toLocaleDateString('en-US', {weekday: "long"}).toUpperCase() as Days;
   }

   //claender ke liye ki usa date par avilable hai ya nahi...
   const isDateAvilable = (date: Date): boolean => {
      const day = getDaysFromDate(date);
      return avilableDays.includes(day); 
   }

   return (
      <div>
         Schedule of {doctorId};
      </div>
   )
}

export default ShowDoctorSchedule
