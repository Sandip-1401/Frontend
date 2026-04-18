import { doctorOnboardingStor } from '@/store/doctorOnboarding'
import CreateDoctor from './CreateDoctor';
import CreateAddress from '../comman/CreateAddress';

const DoctorOnboarding = () => {

   const step = doctorOnboardingStor((state) => state.step);

  return (
    <div>
      {step === 1 && <CreateDoctor />}
      {step === 2 && <CreateAddress role={'DOCTOR'} />}
    </div>
  )
}

export default DoctorOnboarding
