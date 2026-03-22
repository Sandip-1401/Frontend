
import { useNavigate } from 'react-router-dom'

const SelectRole = () => {

  const navigate = useNavigate();

  return (
    <div>
      <h2>Select your Role</h2>

      <button onClick={() => navigate('/patient-onboarding')}>Countinue as Patient</button>
      <button onClick={() => navigate('/create-doctor')}>Countinue as Doctor</button>
    </div>
  )
}

export default SelectRole
