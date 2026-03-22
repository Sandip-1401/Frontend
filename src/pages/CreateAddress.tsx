import { useForm } from "react-hook-form";
import { axiosInstance } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";

type AddressForm = {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

const CreateAddress = ({role}: {role: "DOCTOR" | "PATIENT"}) => {

  const navigate = useNavigate();
  const setRole = useAuthStore((state) => state.setRole);
  const [loading, setLoading] = useState(false);

  const form = useForm<AddressForm>({
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

      await axiosInstance.post("/address", data);

      let res;

      if(role === "DOCTOR"){
        res = await axiosInstance.get('/doctors/my-profile');
      }else{
        res = await axiosInstance.get('/patients/my-profile')
      }

      const updatedRole = res.data.data.role;

      setRole(updatedRole);

      if (updatedRole === "DOCTOR") {
        navigate("/doctor");
      } else {
        navigate("/patient");
      }
    } catch (error: any) {
      console.log("ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Add Address</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("VALIDATION ERROR: ", errors))} className="space-y-4">

          <FormField
            control={form.control}
            name="address_line_1"
            rules={{ required: "Address Line 1 is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="House no, street..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address_line_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2 (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apartment, landmark..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            rules={{
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Pincode must be 6 digits",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Finish"}
          </Button>

        </form>
      </Form>
    </div>
  );
};

export default CreateAddress;