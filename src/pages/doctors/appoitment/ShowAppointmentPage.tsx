import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'
import MyLoader from '@/components/MyLoader'
import { Card } from '@/components/ui/card'
import { getAppointmentById } from '@/features/general/api'
import { useQuery } from '@tanstack/react-query'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useParams } from 'react-router-dom'
import { Calendar, Clock, Pen, User2 } from 'lucide-react'
import ErrorMessage from '@/components/ErrorMessage'

const PendingAppointmentPage = () => {

  const { appointmentId } = useParams();

  if (!appointmentId) throw new Error("Appointment Id not found in params")

  const { data, isLoading, error } = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const res = await getAppointmentById(appointmentId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <MyLoader />
  }
  if(error){
    <ErrorMessage errorProp={(error as Error).message} />
  }
  console.log(data);

  return (
    <div className='p-6'>
      <DynamicBreadcrumb
        homeHref={"/doctor"}
        items={[
          { label: "Appointments" },
          { label: "view" },
        ]}
      />
      <div>
        <p className='text-2xl font-semibold mb-5 mx-2 dark:text-cyan-400 text-gray-700'>Appointments</p>
      </div>
      <div className='sm:px-5'>
        <Card>

        </Card>
      </div>

      <div className='sm:px-5 mt-5'>
        <Tabs defaultValue="appointment" className="sm:w-full flex flex-col">
          <TabsList className=" sm:w-[50%] sm:h-10 items-center justify-start border sm:rounded-lg bg-transparent sm:p-0 w-full sm:gap-8 text-sm overflow-x-scroll rounded-lg sm:overflow-hidden scrollbar-hide dark:border-gray-200/40">
            <TabsTrigger value="appointment" className="sm:rounded-lg rounded-lg font-semibold text-sm shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-1">
              Appointment details
            </TabsTrigger>
            <TabsTrigger value="patient" className="sm:rounded-lg rounded-lg font-semibold text-sm shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-1">
              Patient Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value='appointment' className='w-full'>
            <Card className='p-2 dark:border-gray-200/40 dark:border dark:gap-0 sm:grid sm:grid-cols-4 sm:grid-rows-3'>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 '>
                  <Calendar className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18}/> 
                  <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>APPOINTMENT DATE</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.appointment_date}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Clock className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18}/> 
                  <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>APPOINTMENT TIME</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.appointment_time}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                <Pen className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18}/>
                <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>REASON</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.reason}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                 <User2 className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                 <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>PATIENT</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.user.name}</p>            
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center'>
                 <User2 className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} /> 
                 <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>DOCTOR</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.doctor.user.name}</p>    
              </Card>
            </Card>
          </TabsContent>  
          <TabsContent value='patient' className='w-full bg-cyan-500'>
            sandip
          </TabsContent>  
        </Tabs>
      </div>
    </div>
  )
}

export default PendingAppointmentPage


{/*
  {
    "success": true,
    "message": "Appointment fetched successfully",
    "data": {
        "appointment_id": "4d3e6d93-2161-411c-a733-d022df9acc47",
        "appointment_date": "2026-03-30",
        "appointment_time": "09:00:00",
        "reason": "09:00 am booking",
        "created_at": "2026-03-29T10:09:28.792Z",
        "updated_at": "2026-03-29T10:09:28.792Z",
        "deleted_at": null,
        "patient": {
            "patient_id": "010948a5-29e2-4737-b34d-b2802918884b",
            "blood_group": "O+",
            "date_of_birth": "2008-03-15",
            "gender": "MALE",
            "height": "170.00",
            "weight": "65.00",
            "status": "ACTIVE",
            "created_at": "2026-03-14T02:47:56.259Z",
            "updated_at": "2026-03-14T02:47:56.259Z",
            "deleted_at": null,
            "user": {
                "user_id": "f92a3e0a-d97c-4ec7-904e-fc278257e0d6",
                "name": "Sandip Sonagra",
                "email": "sandipsongra14@gmail.com",
                "phone_number": "9879866522",
                "password_hash": "$2b$10$wpxXRAzt./2HIZHajNMlfuSO9dgGYWl542L0edg7Ozy8/qD49SBiS",
                "password_changed_at": null,
                "status": "ACTIVE",
                "is_active": true,
                "is_verified": true,
                "last_login_at": null,
                "failed_login_attempts": 0,
                "locked_until": null,
                "auth_provider": null,
                "created_at": "2026-03-14T02:00:26.505Z",
                "updated_at": "2026-03-14T02:45:10.958Z",
                "deleted_at": null
            }
        },
        "doctor": {
            "doctor_id": "9de9d0db-a2b5-44bb-976a-045b752e9073",
            "qualification": "ReactJs",
            "experience_years": 10,
            "consultation_fee": "890.00",
            "is_available": true,
            "status": "ACTIVE",
            "created_at": "2026-03-08T05:47:02.131Z",
            "updated_at": "2026-03-11T09:24:21.072Z",
            "deleted_at": null,
            "user": {
                "user_id": "7eda3a21-8d38-47b1-91da-b6bf56596cf6",
                "name": "Even",
                "email": "even@gmail.com",
                "phone_number": "7846287873",
                "password_hash": "$2b$10$eLIXZhOoJie4tQqmhIH.feSYBBjAIl1caQgetc3cpqNiYMUWTguy.",
                "password_changed_at": null,
                "status": "ACTIVE",
                "is_active": true,
                "is_verified": true,
                "last_login_at": null,
                "failed_login_attempts": 0,
                "locked_until": null,
                "auth_provider": null,
                "created_at": "2026-03-08T05:37:09.563Z",
                "updated_at": "2026-03-08T05:37:09.563Z",
                "deleted_at": null
            }
        },
        "status": {
            "appointment_status_id": "f411b274-6f2b-45b8-bdf2-2ed0c8219884",
            "status_name": "BOOKED"
        }
    }
}
  */}