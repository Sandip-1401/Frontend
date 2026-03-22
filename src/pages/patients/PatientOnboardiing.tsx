
import { usePatientOnboardingStore } from '../../store/patientOnboardingStore'
import CreatePatient from './CreatePatient';
import CreateAddress from '../CreateAddress';

const PatientOnboardiing = () => {

   const step = usePatientOnboardingStore((s) => s.step);

  return (
    <>
      {step === 1 && <CreatePatient />}
      {step === 2 && <CreateAddress role={'PATIENT'} />}
    </>
  )
}

export default PatientOnboardiing
