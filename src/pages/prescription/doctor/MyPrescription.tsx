import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { getMyPrescription } from "@/features/general/api"
import type { PrescriptionOfDoctor, PrescriptionsWithSerial } from "@/types/apiResponse"
import { useQuery } from "@tanstack/react-query"
import { prescriptionHeader } from "./prescriptionHeader"
import DataTable from "@/components/data-table/DataTable"
import { useNavigate } from "react-router-dom"
import MyLoader from "@/components/MyLoader"
import ErrorMessage from "@/components/ErrorMessage"

const MyPrescription = () => {

   const columns = prescriptionHeader;
   const navigate = useNavigate();

   const { data, isLoading, error } = useQuery<PrescriptionOfDoctor[]>({
      queryKey: ['prescription'],
      queryFn: async () => {
         const res = await getMyPrescription();

         if (!res.success) {
            throw new Error(res.message)
         }

         return res.data
      }
   })

   const formattedData: PrescriptionsWithSerial[] =
      data?.map((item, idx) => ({
         ...item,
         serial: idx + 1
      })) || []


   return (
      <div className='p-4'>
         <DynamicBreadcrumb
            homeHref={"/doctor"}
            items={[
               { label: "Prescriptions" }
            ]}
         />
         <div>
            <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-cyan-400'>Prescriptions</p>
         </div>
         <div className="px-7">
            <DataTable
            data={formattedData}
            columns={columns}
            idKey="prescription_id"
            onView={(row) => {
               navigate(`/doctor/my-prescriptions/${row.prescription_id}`)
            }}
         />
         {isLoading && <MyLoader />}
         {error && <ErrorMessage errorProp={(error as Error).message} />}
         </div>
      </div>
   )
}

export default MyPrescription
