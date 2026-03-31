import DataTable from '@/components/data-table/DataTable'
import MyLoader from '@/components/MyLoader'
import { getCancelledForDoctor } from '@/features/general/api'
import { useQuery } from '@tanstack/react-query'
import type { AppointmentForDoctor, AppointmentWithSerial } from './appointmentForDoctor'
import { appointmentHeaderForDoctor } from './appointmentHeaderForDoctor'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@/components/ErrorMessage'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'


const CancelledAppointment = () => {

  const navigate = useNavigate()
  const columns = appointmentHeaderForDoctor;

  const { data, isLoading, error } = useQuery<AppointmentForDoctor[]>({
    queryKey: ["appointment"],
    queryFn: async () => {
      const res = await getCancelledForDoctor();
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
              { label: "Cancelled appointments" },
            ]}
        />
        <div>
          <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>Cancelled Appointments</p>
        </div>
      <DataTable
        data={formattedData}
        columns={columns}
        idKey="appointment_id"
        onView={(row) => {
          navigate(`/doctor/appointments/cancelled-appointment/${row.appointment_id}`)
        }}
        
      />
    </div>
  );
};

export default CancelledAppointment;