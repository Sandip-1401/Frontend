import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div>
      
      <Button className="bg-red-400 hover:bg-red-500" onClick={handleLogout}> <LogOutIcon />Logout</Button>
    </div>
  )
}

export default LogoutButton
