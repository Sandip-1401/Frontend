import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const LogoutButton = () => {

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div >
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600"> <LogOutIcon />Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-xl p-6 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle >Are you absolutely sure to Logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-gray-300 hover:bg-gray-100">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default LogoutButton
