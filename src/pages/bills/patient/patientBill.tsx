import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { useQuery } from "@tanstack/react-query";
import { myBills } from "@/features/general/api";
import type { BillWithSerial } from "@/types/apiResponse";
import DataTable from "@/components/data-table/DataTable";
import { useNavigate } from "react-router-dom";
import MyLoader from "@/components/MyLoader";
import ErrorMessage from "@/components/ErrorMessage";
import { billHeader } from "./billHeaderForPatient";

const PatientBillList = () => {

   const navigate = useNavigate();
   const columns = billHeader;

   const {data, isLoading, error} = useQuery({
      queryKey: ["billsPatieny"],
      queryFn: async () => {
         const res = await myBills();

         if(!res.success){
            throw new Error(res.message)
         }

         return res.data
      }
   })

   const formattedData: BillWithSerial[] = 
      data?.map((item, idx) => ({
         ...item,
         serial: idx + 1
      })) || [];


  return (
    <div className='p-4'>
         <DynamicBreadcrumb
            homeHref={"/patient"}
            items={[
               { label: "Bills" }
            ]}
         />
         <div>
            <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-cyan-400'>Bills List</p>
         </div>
         <div className="px-7">
            <DataTable 
               data={formattedData}
               columns={columns}
               idKey="bill_id"
               onView={(row) => navigate(`/patient/bills/${row.appointment.appointment_id}`)}
            />
            {isLoading && <MyLoader />}
            {error && <ErrorMessage errorProp={(error as Error).message} />}
         </div>
    </div>
  )
}

export default PatientBillList
