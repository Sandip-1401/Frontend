import { axiosInstance } from "@/api/axios";
import { handleApi } from "@/lib/apiHandler";
import type { AppointmentForDoctor } from "@/pages/doctors/appoitment/appointmentForDoctor";
import type { Appointment, AppointmentCreate, Department, Doctor, DoctorData, DoctorDataType, DoctorProfileResponse, DoctorSchedule, NotificationData, Patient, PatientData, PatientProfileResponse, ScheduleResponse, User } from "@/types/apiResponse";

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

export const   getPendingForDoctor = () =>
   handleApi<AppointmentForDoctor[]>(() => 
      axiosInstance.get('/appointments/pending-appointment')
   )

export const getApprovedForDoctor = () =>
   handleApi<AppointmentForDoctor[]>(() => 
      axiosInstance.get('/appointments/approved-appointment')
   )

export const getCompletedForDoctor = () =>
   handleApi<AppointmentForDoctor[]>(() => 
      axiosInstance.get('/appointments/completed-appointment')
   )

export const getCancelledForDoctor = () =>
   handleApi<AppointmentForDoctor[]>(() => 
      axiosInstance.get('/appointments/cancelled-appointment')
   )

export const getMyNotifications = () => 
   handleApi<NotificationData[]>(() => 
      axiosInstance.get('/notifications')
   )


export const getAppointmentById = (appointment_id: string) => 
   handleApi<Appointment>(() => 
      axiosInstance.get(`/appointments/${appointment_id}`)
   )

export const rejectAppointment = (appointment_id: string) =>
   handleApi(() => 
      axiosInstance.patch(`/doctors/appointments/${appointment_id}/reject`)
   )

export const approveAppointment = (appointment_id: string) =>
   handleApi(() => 
      axiosInstance.patch(`/doctors/appointments/${appointment_id}/approve`)
   )

export const allPatients = async (search: string, gender: string, sort: string, order: string) => {
   const res = await handleApi<{
      pagination: any,
      data: Patient[]
   }>(() => axiosInstance.get(`/patients?gender=${gender}&sort=${sort}&order=${order}&search=${search}&page=${''}&limit=${''}`))
   if(!res.success){
      return res;
   }

   return {
      success: true as const,
      data: res.data.data as Patient[]
   }
}

export const getPatientById = (patientId: string) => 
   handleApi<Patient>(() => 
      axiosInstance.get(`/patients/${patientId}`)
   )


export const deletePatientById = (patientId: string) => 
   handleApi<null>(() => 
      axiosInstance.delete(`/patients/${patientId}`)
   )

export const getDoctorById = (doctorId: string) => 
   handleApi<Doctor>(() => 
      axiosInstance.get(`/doctors/${doctorId}`)
   )

export const deleteDoctorById = (doctorId: string) => 
   handleApi<null>(() => 
      axiosInstance.delete(`/doctors/${doctorId}`)
   )

export const getMySchedules = () => 
   handleApi<DoctorSchedule[]>(() => 
      axiosInstance.get(`/schedules/my-schedule`)
   )

export const createSchedule = (data: DoctorSchedule) => 
   handleApi<DoctorSchedule>(() => 
      axiosInstance.post('/schedules', data)
   )

export const deleteSchedule = (scheduleId: string) => 
   handleApi(() => 
      axiosInstance.delete(`/schedules/${scheduleId}`)
   )

export const getAllUser = async(search: string, verified: string, sort: string, order: string) => {
   const res = await handleApi<{
      pagination: any,
      data: User[]
   }>(() => axiosInstance.get(`/admin/all-users?verified=${verified}&sort=${sort}&order=${order}&search=${search}&page=${''}&limit=${''}`))
   if(!res.success) return res;
   return {
      success: true as const,
      data: res.data.data as User[]
   }
}

export const unverifieduser = async (search: string, sort: string, order: string) => {
   const res = await handleApi<{
      pagination: any,
      data: User[]
   }>(()  => axiosInstance.get(`/admin/unverified-users?sort=${sort}&order=${order}&search=${search}&page=${''}&limit=${''}`))

   if(!res.success){
      return res
   }

   return {
      success: true as const,
      data: res.data.data as User[]
   }
}

export const verifyUser = async (user_id: string) => 
   handleApi(() => 
      axiosInstance.patch(`/admin/verify-user/${user_id}`)
   )

export const pendingDoctors = async () => {
   const res = await handleApi<{
      pegination: any
      data: Doctor[]
   }>(() => axiosInstance.get('/admin/pending-doctors'))
   if(!res.success){
      return res
   }
   return {
      success: true as const,
      data: res.data.data as Doctor[]
   }
}

export const activeDoctor = async (doctor_id: string) => 
   handleApi(() => 
      axiosInstance.patch(`/admin/active-doctor/${doctor_id}`)
   )

export const myappointment = async () => 
   handleApi<AppointmentForDoctor[]>(() => 
      axiosInstance.get('/appointments/myappointment')
   )