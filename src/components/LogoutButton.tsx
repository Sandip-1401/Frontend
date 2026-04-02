import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { motion } from "framer-motion";
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
    <div>
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-600"> <LogOutIcon />Logout</Button>
        </AlertDialogTrigger>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1 }}
        >
          <AlertDialogContent className="bg-white dark:bg-slate-900 dark:text-gray-50/70 rounded-xl p-6 shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle >Are you absolutely sure to Logout?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-gray-300 hover:bg-gray-100 dark:text-black">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white ">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </motion.div>
      </AlertDialog>
    </div>
  )
}

export default LogoutButton
