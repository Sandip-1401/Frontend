import { axiosInstance } from "@/api/axios";
import { handleApi } from "@/lib/apiHandler";
import type { AppointmentCreate, Department, DoctorData, DoctorDataType, DoctorProfileResponse, PatientData, PatientProfileResponse, ScheduleResponse } from "@/types/apiResponse";

export const createPatient = (data: any) => 
   handleApi<PatientData>(() => 
      axiosInstance.post('/patients', data)
   );

export const createDoctor = (data: any) =>
   handleApi<DoctorData>(() => 
      axiosInstance.post('/doctors', data)
   ) 

export const getDepartments = async () => {
   const res = await handleApi<{
      pagination: any,
      data: Department[]
   }>(() => axiosInstance.get('/departments'))

   if(!res.success) return res;

   return {
      success: true as const,
      data: res.data.data as Department[]
   }
}

export const getMyProfile =  () => 
   handleApi<PatientProfileResponse>(() => 
      axiosInstance.get('/patients/my-profile')
   )
   
export const getAllDoctors = async (search: string, departmentId: string, sort: string, order: string) => {
   const res = await handleApi<{
      pagination: any,
      data: DoctorDataType[]
   }>(() => axiosInstance.get(`/doctors?department_id=${departmentId}&sort=${sort}&order=${order}&search=${search}&page=${''}&limit=${''}`))
   console.log("Data fetched...!");
   if(!res.success) return res;

   return {
      success: true as const,
      data: res.data.data as DoctorDataType[]
   }
}

export const getDoctorSchedule = (doctor_id: string) => 
   handleApi<ScheduleResponse>(() =>
      axiosInstance.get(`/schedules/${doctor_id}`)
   )


export const getAvilableSlots = (doctor_id: string, date: string) => 
   handleApi<null>(() => 
      axiosInstance.get(`/appointments/doctor/${doctor_id}/avilable-slots`,{
         params: {date}
      })
   )

export const createAppointment = (data: {}) => 
   handleApi<AppointmentCreate>(() => 
      axiosInstance.post('/appointments', data)
   )


export const getMyDocProfile = () =>
   handleApi<DoctorProfileResponse>(() => 
      axiosInstance.get('/doctors/my-profile')
   )