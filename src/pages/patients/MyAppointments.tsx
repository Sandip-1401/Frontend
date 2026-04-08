import DataTable from '@/components/data-table/DataTable'
import MyLoader from '@/components/MyLoader'
import { myappointment } from '@/features/general/api'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@/components/ErrorMessage'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'
import { appointmentHeaderForPatient } from './appointmentHeaderForPatient'
import type { AppointmentForDoctor, AppointmentWithSerial } from '../doctors/appoitment/appointmentForDoctor'

const MyAppointments = () => {

  const navigate = useNavigate()
  const columns = appointmentHeaderForPatient;

  const { data, isLoading, error } = useQuery<AppointmentForDoctor[]>({
    queryKey: ["my-appointment"],
    queryFn: async () => {
      const res = await myappointment();
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
              { label: "My appointments" },
            ]}
        />
        <div>
          <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>My Appointments</p>
        </div>
      <DataTable
        data={formattedData}
        columns={columns}
        idKey="appointment_id"
        onView={(row) => {
          navigate(`/patient/appointment/${row.appointment_id}`)
        }}
        
      />
    </div>
  );
};

export default MyAppointments;
