import { axiosInstance } from "@/api/axios";
import { handleApi } from "@/lib/apiHandler";
import type { Department, DoctorData, DoctorDataType, PatientData, PatientProfileResponse } from "@/types/apiResponse";

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
   
export const getAllDoctors = async (search: string, departmentId: string) => {
   const res = await handleApi<{
      pagination: any,
      data: DoctorDataType[]
   }>(() => axiosInstance.get(`/doctors?department_id=${departmentId}&sort=${''}&order=${''}&search=${search}&page=${''}&limit=${''}`))

   if(!res.success) return res;

   return {
      success: true as const,
      data: res.data.data as DoctorDataType[]
   }
}