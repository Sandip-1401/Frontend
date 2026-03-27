import { useForm } from "react-hook-form";
import { axiosInstance } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

type AddressForm = {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

const inputCls = (hasError: boolean) =>
  `h-11 rounded-xl border text-sm transition-all placeholder:text-slate-400
  ${hasError
    ? "border-red-300 bg-red-50/40 focus-visible:ring-red-100"
    : "border-slate-200 bg-slate-50 hover:border-slate-300 focus:bg-white focus-visible:ring-blue-100 focus-visible:border-blue-400"
  }`;

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
      <span>⚠</span> {message}
    </p>
  ) : null;

const CreateAddress = ({ role }: { role: "DOCTOR" | "PATIENT" }) => {
  const navigate = useNavigate();
  const setRole = useAuthStore((state) => state.setRole);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    defaultValues: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const onSubmit = async (data: AddressForm) => {
    console.log("SUBMIT TRIGGERED", role);
    try {
      setLoading(true);
      setServerError(null);
      await axiosInstance.post("/address", data);

      let res;
      if (role === "DOCTOR") {
        res = await axiosInstance.get("/doctors/my-profile");
      } else {
        res = await axiosInstance.get("/patients/my-profile");
      }

      const updatedRole = res.data.data.role;
      console.log(updatedRole);
      setRole(role);

      if (role === "DOCTOR") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-slate-200/60">
        <CardContent className="p-0">
          <div className="bg-white p-8 sm:p-10">

            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Add Address</h1>
                <p className="text-slate-400 text-sm mt-0.5">Enter your address details below.</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, (errs) => console.log("VALIDATION ERROR:", errs))}
              className="space-y-4"
            >

              {/* Address Line 1 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Address Line 1</label>
                <Input
                  placeholder="House no, street..."
                  className={inputCls(!!errors.address_line_1)}
                  {...register("address_line_1", { required: "Address Line 1 is required" })}
                />
                <FieldError message={errors.address_line_1?.message} />
              </div>

              {/* Address Line 2 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Address Line 2{" "}
                  <span className="text-slate-400 font-normal text-xs">(Optional)</span>
                </label>
                <Input
                  placeholder="Apartment, landmark..."
                  className={inputCls(false)}
                  {...register("address_line_2")}
                />
              </div>

              {/* City + State */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">City</label>
                  <Input
                    placeholder="Mumbai"
                    className={inputCls(!!errors.city)}
                    {...register("city", { required: "City is required" })}
                  />
                  <FieldError message={errors.city?.message} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">State</label>
                  <Input
                    placeholder="Maharashtra"
                    className={inputCls(!!errors.state)}
                    {...register("state", { required: "State is required" })}
                  />
                  <FieldError message={errors.state?.message} />
                </div>
              </div>

              {/* Country + Pincode */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Country</label>
                  <Input
                    placeholder="India"
                    className={inputCls(!!errors.country)}
                    {...register("country", { required: "Country is required" })}
                  />
                  <FieldError message={errors.country?.message} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Pincode</label>
                  <Input
                    placeholder="400001"
                    className={inputCls(!!errors.pincode)}
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                    })}
                  />
                  <FieldError message={errors.pincode?.message} />
                </div>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                  <span>⚠</span> {serverError}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>Finish <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>
              </div>

            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAddress;