import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { doctorOnboardingStor } from "@/store/doctorOnboarding";

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

type DoctorForm = {
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  department_id: string;
};

type Department = {
  department_id: string;
  department_name: string;
};

const CreateDoctor = () => {
  const setStep = doctorOnboardingStor((s) => s.setStep);

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const form = useForm<DoctorForm>({
    defaultValues: {
      qualification: "",
      experience_years: 0,
      consultation_fee: 0,
      department_id: "",
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axiosInstance.get("/departments");
        setDepartments(res.data.data.data || []);
      } catch (err) {
        console.log("DEPARTMENT ERROR:", err);
      }
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data: DoctorForm) => {
    try {
      setLoading(true);

      await axiosInstance.post("/doctors", data);

      setStep(2); 
    } catch (error: any) {
      console.log("ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Create Doctor Profile</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          <FormField
            control={form.control}
            name="qualification"
            rules={{ required: "Qualification is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="MBBS / MD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience_years"
            rules={{ required: "Experience is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience (Years)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consultation_fee"
            rules={{ required: "Consultation fee is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consultation Fee</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department_id"
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((dep) => (
                      <SelectItem
                        key={dep.department_id}
                        value={dep.department_id}
                      >
                        {dep.department_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Continue"}
          </Button>

        </form>
      </Form>
    </div>
  );
};

export default CreateDoctor;