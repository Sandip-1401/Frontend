import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../api/axios";
import { useRegisterStore } from "../../../store/registerStore";
import { useState } from "react";

type RegisterFormData = {
   name: string;
   email: string;
   password: string;
   phone_number: string;
};

const Register = () => {

   const [loading, setLoading] = useState<boolean>(false);

   const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

   const setFormData = useRegisterStore((s) => s.setFormData);
   const setStep = useRegisterStore((s) => s.setStep);

   const onSubmit = async (data: RegisterFormData) => {
      try {
         setLoading(true);

         setFormData(data);

         await axiosInstance.post("/auth/register", data);

         setStep(2);

      } catch (error: any) {
         console.log("OTP SEND ERROR:", error.response?.data || error.message);
      } finally{
         setLoading(false)
      }
   };

   return (
      <div>
         <h2>Register</h2>

         <form onSubmit={handleSubmit(onSubmit)}>

            <input
               placeholder="Name"
               {...register("name", {
                  required: "Name is required",
                  minLength: {
                     value: 3,
                     message: "Minimum 3 characters required",
                  },
               })}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <input
               placeholder="Email"
               {...register("email", {
                  required: "Email is required",
                  pattern: {
                     value: /^\S+@\S+\.\S+$/,
                     message: "Invalid email format",
                  },
               })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
               type="password"
               placeholder="Password"
               {...register("password", {
                  required: "Password is required",
                  minLength: {
                     value: 6,
                     message: "Minimum 6 characters required",
                  },
               })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
               placeholder="Phone Number"
               {...register("phone_number", {
                  required: "Phone number is required",
                  pattern: {
                     value: /^[0-9]{10}$/,
                     message: "Phone must be 10 digits",
                  },
               })}
            />
            {errors.phone_number && <p>{errors.phone_number.message}</p>}

            <button type="submit" disabled={loading}>
               {loading ? "Sending OTP..." : "Send OTP"}
            </button>
         </form>
      </div>
   );
};

export default Register;