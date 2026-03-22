import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../api/axios";
import { useRegisterStore } from "../../../store/registerStore";
import { useNavigate } from "react-router-dom";

type OtpForm = {
  otp: string;
};

const VerifyOtp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<OtpForm>();

  const formData = useRegisterStore((s) => s.formData);
  const reset = useRegisterStore((s) => s.reset);

  const onSubmit = async (data: OtpForm) => {

    try {
      if (!formData) {
        throw new Error("No registration data found");
      }

      const finalPayload = {
        ...formData,
        otp: data.otp,
      };

      const res = await axiosInstance.post(
        "/auth/verify-otp",
        finalPayload
      );

      console.log("REGISTER SUCCESS:", res.data);

      reset();

      navigate("/login");

    } catch (error: any) {
      console.log("OTP VERIFY ERROR:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter OTP"
          {...register("otp", {
            required: "OTP is required",
            minLength: {
              value: 6,
              message: "OTP must be 6 digits",
            },
          })}
        />
        {errors.otp && <p>{errors.otp.message}</p>}

        <button type="submit">Verify & Register</button>
      </form>
    </div>
  );
};

export default VerifyOtp;