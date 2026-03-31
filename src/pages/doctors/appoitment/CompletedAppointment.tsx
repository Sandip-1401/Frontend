import DataTable from '@/components/data-table/DataTable'
import MyLoader from '@/components/MyLoader'
import { getCompletedForDoctor } from '@/features/general/api'
import { useQuery } from '@tanstack/react-query'
import type { AppointmentForDoctor, AppointmentWithSerial } from './appointmentForDoctor'
import { appointmentHeaderForDoctor } from './appointmentHeaderForDoctor'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@/components/ErrorMessage'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'


const CompletedAppointment = () => {

  const navigate = useNavigate()
  const columns = appointmentHeaderForDoctor;

  const { data, isLoading, error } = useQuery<AppointmentForDoctor[]>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const res = await getCompletedForDoctor();
      if (!res.success) {
        throw new Error(res.message);
      }
      return res.data ?? [];
    }
  });

  const formattedData: AppointmentWithSerial[] =
    data?.map((item, index) => ({
      ...item,
      serial: index + 1,
    })) || [];

  if (isLoading) {
    return <MyLoader />;
  }
  if (error) {
    return <ErrorMessage errorProp={(error as Error).message} />
  }

  return (
    <div className='p-6'>
      <DynamicBreadcrumb
            homeHref={"/doctor"}
            items={[
              { label: "Appointments" },
              { label: "Completed appointments" },
            ]}
        />
        <div>
          <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>Completed Appointments</p>
        </div>
      <DataTable
        data={formattedData}
        columns={columns}
        idKey="appointment_id"
        onView={(row) => {
          navigate(`/doctor/appointments/completed-appointment/${row.appointment_id}`)
        }}
        
      />
    </div>
  );
};

export default CompletedAppointment;