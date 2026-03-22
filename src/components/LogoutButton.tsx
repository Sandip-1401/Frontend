import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";

const LogoutButton = () => {

  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton
