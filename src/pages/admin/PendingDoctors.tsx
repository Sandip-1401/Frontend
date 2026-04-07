import DataTable from "@/components/data-table/DataTable"
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { pendingDoctors } from "@/features/general/api"
import type { Doctor, DoctorWithSerial } from "@/types/apiResponse"
import { useQuery } from "@tanstack/react-query"
import { doctorHeaderForAdmin } from "./DoctorHeader"
import MyLoader from "@/components/MyLoader"
import ErrorMessage from "@/components/ErrorMessage"

const PendingDoctors = () => {

  const columns = doctorHeaderForAdmin;

  const { data, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ["pending-doctors"],
    queryFn: async () => {
      const res = await pendingDoctors();

      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data
    }
  })

  const formatedData: DoctorWithSerial[] = data?.map((item, idx) => ({
    ...item,
    serial: idx + 1
  })) || [];

  console.log(formatedData);

    return (
      <div className='p-6'>
        <DynamicBreadcrumb
          homeHref={"/admin"}
          items={[
            { label: "Pending Doctors" },
          ]}
        />
        <div>
          <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>Pending Doctors</p>
        </div>

        <DataTable
          data={formatedData}
          columns={columns}
          idKey="serial"
          />
          {formatedData.length === 0 ? <p className="flex justify-center items-center my-10">No doctors are pending</p> : <MyLoader/>}
          {error && <ErrorMessage errorProp={(error as Error).message} />}
      </div>
    )
  }

  export default PendingDoctors
