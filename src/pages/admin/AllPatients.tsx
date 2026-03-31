import DataTable from '@/components/data-table/DataTable'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'
import ErrorMessage from '@/components/ErrorMessage'
import MyLoader from '@/components/MyLoader'
import { allPatients } from '@/features/general/api'
import type { Patient, PatientWithSerial } from '@/types/apiResponse'
import { useQuery } from '@tanstack/react-query'
import { patientHeaderForAdmin } from './PatientHeader'
import { useNavigate } from 'react-router-dom'

const AllPatients = () => {

   const navigate = useNavigate()

   const columns = patientHeaderForAdmin;

   const { data, isLoading, error } = useQuery<Patient[]>({
      queryKey: ["patients"],
      queryFn: async () => {
         const res = await allPatients();
         if(!res.success){
            throw new Error(res.message)
         }
         return res.data ?? [];
      },
      staleTime: 1000 * 5 * 60,
      refetchOnWindowFocus: false
   })

   const formattedData: PatientWithSerial[] = 
      data?.map((item, idx) => ({
         ...item, 
         serial: idx + 1,
      })) || [];

   if(isLoading){
      return <MyLoader />
   }
   if(error){
      return <ErrorMessage errorProp={(error as Error).message} />
   }

  return (
    <div className='p-6'>
      <DynamicBreadcrumb
         homeHref={"/admin"}
         items={[
           { label: "All Patient" },
         ]}
        />
        <div>
          <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>All Patient list</p>
        </div>
        <DataTable
         data={formattedData}
         columns={columns}
         idKey='serial'
         onView={(row) => {
            navigate(`/admin/patients/${row.patient_id}`)
         }}
        />
    </div>
  )
}

export default AllPatients
