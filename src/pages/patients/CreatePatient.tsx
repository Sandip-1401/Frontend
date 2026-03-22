import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/axios";
import { usePatientOnboardingStore } from "../../store/patientOnboardingStore";
import { useState } from "react";

// shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PatientForm>();

  const onSubmit = async (data: PatientForm) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/patients", data);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* BLOOD GROUP */}
        <Field>
          <FieldLabel>Blood Group</FieldLabel>

          <Select onValueChange={(val) => setValue("blood_group", val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Blood Group" />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.blood_group && (
            <FieldError>{errors.blood_group.message}</FieldError>
          )}
        </Field>

        {/* DOB */}
        <Field>
          <FieldLabel>Date of Birth</FieldLabel>
          <Input
            type="date"
            {...register("date_of_birth", {
              required: "Date of birth is required",
            })}
          />
          {errors.date_of_birth && (
            <FieldError>{errors.date_of_birth.message}</FieldError>
          )}
        </Field>

        {/* GENDER */}
        <Field>
          <FieldLabel>Gender</FieldLabel>

          <Select onValueChange={(val) => setValue("gender", val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          {errors.gender && (
            <FieldError>{errors.gender.message}</FieldError>
          )}
        </Field>

        {/* HEIGHT */}
        <Field>
          <FieldLabel>Height (cm)</FieldLabel>
          <Input
            type="number"
            placeholder="Enter height"
            {...register("height", {
              required: "Height is required",
              valueAsNumber: true,
              min: { value: 50, message: "Too small" },
              max: { value: 300, message: "Too large" },
            })}
          />
          {errors.height && (
            <FieldError>{errors.height.message}</FieldError>
          )}
        </Field>

        {/* WEIGHT */}
        <Field>
          <FieldLabel>Weight (kg)</FieldLabel>
          <Input
            type="number"
            placeholder="Enter weight"
            {...register("weight", {
              required: "Weight is required",
              valueAsNumber: true,
              min: { value: 2, message: "Too small" },
              max: { value: 500, message: "Too large" },
            })}
          />
          {errors.weight && (
            <FieldError>{errors.weight.message}</FieldError>
          )}
        </Field>

        {/* SUBMIT */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePatient;