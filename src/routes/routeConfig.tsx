import AdminDashboard from "../pages/admin/AdminDashboard";
import PatientDashboard from "../pages/patients/PatientDashboard";
import DoctorDashboard from "../pages/doctors/DoctorDashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import CreatePatient from "../pages/patients/CreatePatient";

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
      path: '/doctor',
      element: <DoctorDashboard />,
      allowedRole: ["DOCTOR"],
   },

]