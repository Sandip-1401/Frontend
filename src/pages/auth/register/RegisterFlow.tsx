import { useRegisterStore } from '../../../store/registerStore'
import Register from './Register';
import VerifyOtp from './VerifyOtp';

const RegisterFlow = () => {

   const step = useRegisterStore((state) => state.step);

  return (
    <>
      {step === 1 && <Register />}
      {step === 2 && <VerifyOtp />}
    </>
  )
}

export default RegisterFlow
