import { axiosInstance } from "@/api/axios";
import { handleApi } from "@/lib/apiHandler";

type PatientData = null;
type DoctorData = null;
type Department = {
  department_id: string;
  department_name: string;
};

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
   