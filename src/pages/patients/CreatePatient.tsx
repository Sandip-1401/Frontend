import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/axios";
import { usePatientOnboardingStore } from "../../store/patientOnboardingStore";
import { useState } from "react";

// shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type PatientForm = {
  blood_group: string;
  date_of_birth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  height: number;
  weight: number;
};

const CreatePatient = () => {
  const setStep = usePatientOnboardingStore((s) => s.setStep);
  const [loading, setLoading] = useState(false);

  const form = useForm<PatientForm>({
    defaultValues: {
      blood_group: "",
      date_of_birth: "",
      gender: undefined,
      height: 0,
      weight: 0,
    },
  });

  const onSubmit = async (data: PatientForm) => {
    try {
      setLoading(true);

      const payload = {
         ...data, date_of_birth: new Date(data.date_of_birth),
      }

      const res = await axiosInstance.post("/patients", payload);
      console.log("PATIENT CREATED:", res.data);

      setStep(2);
    } catch (error: any) {
      console.log("ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Create Patient Profile</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* BLOOD GROUP */}
          <FormField
            control={form.control}
            name="blood_group"
            rules={{ required: "Blood group is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DOB */}
          <FormField
            control={form.control}
            name="date_of_birth"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* GENDER */}
          <FormField
            control={form.control}
            name="gender"
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* HEIGHT */}
          <FormField
            control={form.control}
            name="height"
            rules={{
              required: "Height is required",
              min: { value: 50, message: "Too small" },
              max: { value: 300, message: "Too large" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* WEIGHT */}
          <FormField
            control={form.control}
            name="weight"
            rules={{
              required: "Weight is required",
              min: { value: 2, message: "Too small" },
              max: { value: 500, message: "Too large" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Next"}
          </Button>

        </form>
      </Form>
    </div>
  );
};

export default CreatePatient;