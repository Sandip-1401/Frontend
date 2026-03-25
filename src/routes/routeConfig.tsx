import AdminDashboard from "../pages/admin/AdminDashboard";
import PatientDashboard from "../pages/patients/PatientDashboard";
import DoctorDashboard from "../pages/doctors/DoctorDashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import {PatientProfile} from "@/pages/patients/PatientProfile";
import ShowDoctors from "@/pages/patients/ShowDoctors";

export interface RouteType{
   path: string,
   element: React.ReactNode,
   allowedRole: string[];
   children?: RouteType[]
}

export const protectedRoute: RouteType[] =  [
   {
      path: '/admin',
      element: <AdminLayout />,
      allowedRole: ["ADMIN"],
      children: [
         {
            path: "",
            element: <AdminDashboard />,
            allowedRole: ["ADMIN"],
         },
      ]
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
      path: '/doctor',
      element: <DoctorDashboard />,
      allowedRole: ["DOCTOR"],
   },

]