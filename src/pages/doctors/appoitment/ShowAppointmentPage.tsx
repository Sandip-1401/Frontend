import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'
import MyLoader from '@/components/MyLoader'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { approveAppointment, getAppointmentById, rejectAppointment } from '@/features/general/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate, useParams } from 'react-router-dom'
import { Calendar, CalendarClock, Check, CheckCircle, Clock, Heart, Pen, PencilIcon, Phone, Ruler, Trash2Icon, User2, Weight, X } from 'lucide-react'
import ErrorMessage from '@/components/ErrorMessage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

const CommonAppointmentPage = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient()

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


  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await rejectAppointment(id)

      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data;
    },

    onSuccess: () => {
      toast.success("Appointment Rejected!", {
        duration: 3000,
        description: "Appointment rejected successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["appointment", appointmentId],
      });
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await approveAppointment(id)

      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data;
    },

    onSuccess: () => {
      toast.success("Appointment Approved!", {
        duration: 3000,
        description: "Appointment approved successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["appointment", appointmentId],
      });
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  if (isLoading) {
    return <MyLoader />
  }
  if (error) {
    return <ErrorMessage errorProp={(error as Error).message} />
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
        {data?.status.status_name === "BOOKED" && (
          <div className="mx-3">
            <Card className="dark:border dark:border-gray-700 overflow-hidden sm:flex sm:flex-row sm:justify-between pb-0 sm:pb-4">

              <CardHeader className="flex flex-row items-center gap-4 px-5 py-4 
                 border-gray-100">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center 
                bg-cyan-500 rounded-xl">
                  <CalendarClock className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-semibold tracking-widest text-gray-400 
                    dark:text-gray-500 uppercase">
                    Appointment Status
                  </p>
                  <Badge className="w-fit px-3 py-0.5 text-xs font-semibold 
                    bg-orange-100 text-orange-700 border border-orange-300 
                    dark:bg-orange-950 dark:text-orange-300 dark:border-orange-700">
                    {data.status.status_name}
                  </Badge>
                </div>
              </CardHeader>

              <CardFooter className="flex items-center justify-end gap-3 
                px-5 py-4 dark:bg-gray-900/50 sm:border-none">

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="gap-2 border-red-300 
                      text-red-600 hover:bg-red-50 hover:border-red-400
                      dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 
                      font-semibold text-sm px-5 duration-150">
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent
                    style={{ backgroundColor: 'white' }}
                    className="dark:[background-color:#111827] max-w-sm w-[90vw] 
                      rounded-2xl border border-gray-200 dark:border-gray-700 
                      p-7 flex flex-col items-center text-center shadow-xl">

                    <AlertDialogHeader className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950 
                        border border-red-200 dark:border-red-800 
                        flex items-center justify-center">
                        <Trash2Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <AlertDialogTitle className="text-base font-semibold 
                      text-gray-900 dark:text-white">
                        Reject Appointment?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm text-gray-500 
                      dark:text-gray-400 leading-relaxed">
                        This appointment will be permanently rejected.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex flex-row gap-3 w-full mt-6">
                      <AlertDialogCancel className="flex-1 rounded-lg 
                        border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 
                        text-gray-700 dark:text-gray-200 
                        hover:bg-gray-50 dark:hover:bg-gray-700 
                        text-sm font-semibold">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="flex-1 rounded-lg 
                        bg-red-500 hover:bg-red-600 
                        border border-red-600 
                        text-white text-sm font-semibold duration-150"
                        onClick={() => rejectMutation.mutate(appointmentId)}
                        disabled={rejectMutation.isPending}>
                        <X className="w-4 h-4" />
                        {rejectMutation.isPending ? "Rejecting..." : "Yes, Reject"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button className="gap-2 bg-cyan-500 hover:bg-cyan-600 
                active:bg-cyan-500 border border-cyan-600 
                text-white font-semibold text-sm px-5 duration-150 shadow-sm"
                  onClick={() => approveMutation.mutate(appointmentId)}
                  disabled={approveMutation.isPending}>
                  <Check className="w-4 h-4" />
                  {approveMutation.isPending ? "Approving..." : "Approve"}
                </Button>

              </CardFooter>
            </Card>
          </div>
        )}
        {data?.status.status_name === "APPROVED" && (
          <div className='mx-3'>
            <Card className="dark:border dark:border-gray-700 overflow-hidden sm:flex sm:flex-row sm:justify-between pb-0 sm:pb-4">
              <CardHeader className="flex flex-row items-center gap-4 px-5 py-0
                 border-gray-100">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center 
                bg-cyan-500 rounded-xl">
                  <CalendarClock className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-semibold tracking-widest text-gray-400 
                    dark:text-gray-500 uppercase">
                    Appointment Status
                  </p>
                  <Badge className="w-fit px-3 py-0.5 text-xs font-semibold 
                    bg-orange-100 text-orange-700 border border-orange-300 
                    dark:bg-orange-950 dark:text-orange-300 dark:border-orange-700">
                    {data.status.status_name}
                  </Badge>
                </div>
              </CardHeader>
              <div className='flex items-center justify-center m-5'>
                <Button className="gap-2 bg-cyan-500 hover:bg-cyan-600 
                active:bg-cyan-500 border border-cyan-600 
                text-white font-semibold text-sm px-5 duration-150 shadow-sm"
                onClick={() => navigate(`/doctor/appointments/approved-appointment/${data.appointment_id}/medical-record`)}
                >
                  <PencilIcon/> 
                  Create Medical Record
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className='sm:px-5 mt-5'>
        <Tabs defaultValue="appointment" className="sm:w-full flex flex-col">
          <TabsList className="sm:w-[70%] md:w-[50%] sm:h-10 items-center justify-start border sm:rounded-lg bg-transparent sm:p-0 w-full sm:gap-8 text-sm overflow-x-scroll rounded-lg sm:overflow-hidden scrollbar-hide dark:border-gray-200/40">
            <TabsTrigger value="appointment" className="sm:rounded-lg rounded-lg font-semibold text-sm shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-1">
              Appointment details
            </TabsTrigger>
            <TabsTrigger value="patient" className="sm:rounded-lg rounded-lg font-semibold text-sm shadow-none data-[state=active]:bg-primary data-[state=active]:text-white dark:text-gray-200 dark:hover:text-gray-100 p-1">
              Patient Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value='appointment' className='w-full'>
            <Card className='p-2 dark:border-gray-200/40 dark:border dark:gap-0 sm:grid sm:grid-rows-3 sm:grid-cols-2 md:grid md:grid-cols-3 md:grid-rows-3'>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 '>
                <Calendar className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>APPOINTMENT DATE</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.appointment_date}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 '>
                <Clock className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                <p className='col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight'>APPOINTMENT TIME</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.appointment_time}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 sm:grid sm:grid-cols-12 sm:grid-rows-1 md:grid-rows-4 md:grid-cols-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 sm:col-span-3 sm:row-span-1 md:col-span-1 md:row-span-3 md:h-full md:w-full md:border-l'>
                <Pen className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white sm:col-start-2 md:col-span-7 md:row-span-1 ' size={18} />
                <p className='sm:col-span-1 col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight sm:col-start-4 md:col-span-7 md:row-span-1'>REASON</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white sm:col-start-5 sm:row-span-1 sm:col-span-7 md:col-span-7 md:row-span-2'>{data?.reason}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 sm:grid sm:grid-cols-12 sm:grid-rows-1 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 sm:col-span-3 sm:row-span-1 md:col-span-2 md: row-span-1'>
                <User2 className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white sm:col-start-2' size={18} />
                <p className='sm:col-span-1 col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight sm:col-start-4'>PATIENT</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white sm:col-start-5 sm:row-span-1 sm:col-span-7'>{data?.patient.user.name}</p>
              </Card>
              <Card className='p-3 grid grid-cols-3 grid-rows-2 sm:grid sm:grid-cols-12 sm:grid-rows-1 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6 sm:col-span-3 sm:row-span-1 md:col-span-2 md: row-span-1'>
                <User2 className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white sm:col-start-2' size={18} />
                <p className='sm:col-span-1 col-span-2 row-span-1  text-sm font-semibold text-gray-800 dark:text-white leading-tight sm:col-start-4'>DOCTOR</p>
                <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white sm:col-start-5 sm:row-span-1 sm:col-span-7'>{data?.doctor.user.name}</p>
              </Card>

            </Card>
          </TabsContent>
          <TabsContent value='patient' className='w-full'>
            <Card className='p-2 dark:border-gray-200/40 dark:border dark:gap-0'>

              <div className='flex items-center gap-3 p-3 border-b dark:border-gray-500'>
                <div className='w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-semibold text-lg'>
                  {data?.patient.user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className='font-semibold text-gray-800 dark:text-white text-sm'>{data?.patient.user.name}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>{data?.patient.user.email}</p>
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2'>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Phone className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>PHONE NUMBER</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.user.phone_number}</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <User2 className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>GENDER</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.gender}</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Calendar className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>DATE OF BIRTH</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.date_of_birth}</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Heart className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>BLOOD GROUP</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.blood_group}</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Ruler className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>HEIGHT</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.height} cm</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:border-b dark:rounded-none dark:border-gray-500 dark:py-6'>
                  <Weight className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>WEIGHT</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white'>{data?.patient.weight} kg</p>
                </Card>

                <Card className='p-3 grid grid-cols-3 grid-rows-2 gap-0 place-items-center dark:rounded-none dark:py-6'>
                  <CheckCircle className='col-span-1 row-span-2 bg-cyan-500 w-12 h-12 p-2 rounded-xl text-white' size={18} />
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-gray-800 dark:text-white leading-tight'>STATUS</p>
                  <p className='col-span-2 row-span-1 text-sm font-semibold text-green-600'>{data?.patient.status}</p>
                </Card>

              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CommonAppointmentPage