import AdminDashboard from "../pages/admin/AdminDashboard";
import PatientDashboard from "../pages/patients/PatientDashboard";
import DoctorDashboard from "../pages/doctors/DoctorDashboard";
import {PatientProfile} from "@/pages/patients/PatientProfile";
import ShowDoctors from "@/pages/patients/ShowDoctors";
import ShowDoctorSchedule from "@/pages/patients/ShowDoctorSchedule";
import DoctorProfile from "@/pages/doctors/DoctorProfile";
import PendingAppointment from "@/pages/doctors/appoitment/PendingAppointment";
import ApprovedAppointment from "@/pages/doctors/appoitment/ApprovedAppointment";
import CompletedAppointment from "@/pages/doctors/appoitment/CompletedAppointment";
import CancelledAppointment from "@/pages/doctors/appoitment/CancelledAppointment";
import PendingAppointmentPage from "@/pages/doctors/appoitment/ShowAppointmentPage";
import AllPatients from "@/pages/admin/AllPatients";
import ViewPatient from "@/pages/admin/ViewPatient";
import AllDoctorList from "@/pages/admin/AllDoctorList";
import ViewDoctor from "@/pages/admin/ViewDoctor";
import MySchedules from "@/pages/doctor-schedule/MySchedules";
import AllUsers from "@/pages/admin/AllUsers";
import UnverifiedUser from "@/pages/admin/UnverifiedUser";
import PendingDoctors from "@/pages/admin/PendingDoctors";

export interface RouteType{
   path: string,
   element: React.ReactNode,
   allowedRole: string[];
   children?: RouteType[]
}

export const protectedRoute: RouteType[] =  [
   {
      path: '/admin',
      element: <AdminDashboard />,
      allowedRole: ["ADMIN"],
   },
   {
      path: '/admin/patients',
      element: <AllPatients />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/doctors',
      element: <AllDoctorList  />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/patients/:patientId',
      element: <ViewPatient />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/doctors/:doctorId',
      element: <ViewDoctor />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/allUsers',
      element: <AllUsers />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/pending-doctors',
      element: <PendingDoctors />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/admin/unverified-users',
      element: <UnverifiedUser />,
      allowedRole: ["ADMIN"]
   },
   {
      path: '/patient',
      element: <PatientDashboard />,
      allowedRole: ["PATIENT"],
   },
   {
      path: '/patient/profile',
      element: <PatientProfile />,
      allowedRole: ["PATIENT"],
   },
   {
      path: '/patient/all-doctors',
      element: <ShowDoctors />,
      allowedRole: ["PATIENT"]
   },
   {
      path: '/patient/doctor/:doctorId',
      element: <ShowDoctorSchedule />,
      allowedRole: ["PATIENT"]
   },

   {
      path: '/doctor',
      element: <DoctorDashboard />,
      allowedRole: ["DOCTOR"],
   },
   {
      path: '/doctor/profile',
      element: <DoctorProfile />,
      allowedRole: ["DOCTOR"],
   },
   {
      path: '/doctor/appointments/pending-appointment',
      element: <PendingAppointment />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/approved-appointment',
      element: <ApprovedAppointment />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/completed-appointment',
      element: <CompletedAppointment />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/canclled-appointment',
      element: <CancelledAppointment />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/pending-appointment/:appointmentId',
      element: <PendingAppointmentPage />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/approved-appointment/:appointmentId',
      element: <PendingAppointmentPage />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/completed-appointment/:appointmentId',
      element: <PendingAppointmentPage />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/appointments/cancelled-appointment/:appointmentId',
      element: <PendingAppointmentPage />,
      allowedRole: ["DOCTOR"]
   },
   {
      path: '/doctor/my-schedules',
      element: <MySchedules />,
      allowedRole: ["DOCTOR"]
   }
]