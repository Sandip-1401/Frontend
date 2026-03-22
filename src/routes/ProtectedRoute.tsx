import type React from "react"
import { Navigate } from "react-router-dom"

interface Props{
   children: React.ReactNode,
   isAuthorized: boolean,
   role: string,
   allowedRole: string[]
}

const ProtectedRoute = ({
   children,
   isAuthorized,
   role,
   allowedRole
}: Props) => {

   if(!isAuthorized){
      return <Navigate to='/login' replace />
   }

   if(!allowedRole.includes(role)){
      return <Navigate to='/unauthorized' replace/>
   }

  return <>{children}</>
}

export default ProtectedRoute
