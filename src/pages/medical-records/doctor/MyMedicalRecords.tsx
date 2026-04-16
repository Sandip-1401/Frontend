import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import ErrorMessage from "@/components/ErrorMessage";
import MedicalCard from "@/components/MedicalCard";
import MyLoader from "@/components/MyLoader";
import { getMymedicalRecords } from "@/features/general/api"
import type { MedicalRecordCard } from "@/types/apiResponse";
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

const MyMedicalRecords = () => {

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<MedicalRecordCard[]>({
    queryKey: ["medical_record"],
    queryFn: async () => {
      const res = await getMymedicalRecords();

      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data
    },
    staleTime: 2,
    refetchOnWindowFocus: false
  });

  console.log(data);

  return (
    <div className='p-4'>
      <DynamicBreadcrumb
        homeHref={"/doctor"}
        items={[
          { label: "My medical records" },
        ]}
      />
      <div>
        <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>Medical records</p>
      </div>
      <div className="p-5 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading && <MyLoader />}
          {error && <ErrorMessage errorProp={(error as Error).message} />}
          {data?.map((record) => (
            <MedicalCard
              key={record.medical_record_id}
              onViewDetails={() => navigate(`/doctor/my-medicalRecords/${record.medical_record_id}`)}
              medical_record_id={record.medical_record_id}
              diagnosis={record.diagnosis}
              notes={record.notes} appointment={{
                appointment_date: record.appointment.appointment_date,
                appointment_time: record.appointment.appointment_time,
                reason: record.appointment.reason
              }} patient={{
                user: {
                  name: record.patient.user.name
                },
                gender: record.patient.gender,
                blood_group: record.patient.blood_group
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyMedicalRecords
