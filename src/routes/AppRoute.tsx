import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Unauthorized from '../pages/comman/Unauthorized';
import { protectedRoute, type RouteType } from './routeConfig';
import ProtectedRoute from './ProtectedRoute';
import type { Role } from '../types/auth';
import { useAuthStore } from '../store/authStore';
import RegisterFlow from '../pages/auth/register/RegisterFlow';
import SelectRole from '../pages/auth/SelectRole';
import PatientOnboardiing from '../pages/patients/PatientOnboardiing';

const renderRoutes = (
   routes: RouteType[], 
   isAuthorized: boolean, 
   role: Role | null
) => {
   return routes.map((route) => (
      <Route
         key={route.path}
         path={route.path}
         element={
            <ProtectedRoute
               isAuthorized={isAuthorized}
               role={role}
               allowedRole={route.allowedRole}
            >
               {route.element}
            </ProtectedRoute>
         }
      >
         {route.children && renderRoutes(route.children, isAuthorized, role)}

      </Route>
   ))
}

const AppRoute = () => {

   const accessToken = useAuthStore((s) => s.accessToken);
   const role = useAuthStore((s) => s.role);

   const isAuthorized = !!accessToken;

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/register" element={<RegisterFlow />}/>
            <Route path="/select-role" element={<SelectRole/>}/>
            <Route path="/patient-onboarding" element={<PatientOnboardiing />}/>

            {renderRoutes(protectedRoute, isAuthorized, role)}

         </Routes>
      </BrowserRouter>
   )
}

export default AppRoute
