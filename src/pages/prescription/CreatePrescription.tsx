"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { Label } from "@/components/ui/label"
import { useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createPrescription } from "@/features/general/api"
import { toast } from "sonner"

type FormData = {
  notes: string
  medicines: {
    medicine_name: string
    dosage: string
    frequency: string
    duration_days: number | string
    unit_price: number | string
  }[]
}

export interface CreatePrescriptionForm {
  medical_record_id: string,
  notes: string
  medicines: {
    medicine_name: string
    dosage: string
    frequency: string
    duration_days: number | string
    unit_price: number | string
  }[]
}

const PrescriptionForm = () => {

  const { medical_record_id } = useParams();

  const { control, register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      notes: "",
      medicines: [
        {
          medicine_name: "",
          dosage: "",
          frequency: "",
          // @ts-ignore
          duration_days: undefined,
          // @ts-ignore
          unit_price: undefined,
        },
      ],
    },
  })


  const mutation = useMutation({
    mutationFn: async (data: CreatePrescriptionForm) => {
      const res = await createPrescription(data);

      if (!res.success) {
        throw new Error(res.message)
      }
      return res.data
    },
    onSuccess: () => {
      toast.success("Prescription created!", {
        duration: 3000,
        description: "Your Prescription has been created successfully.",
        style: {
          background: "#22c55e",
          color: "white",
          borderRadius: "10px",
          padding: "12px",
        },
      });
    },
    onError: (error: any) => {
      let errorMessage = error.message;

      if (errorMessage.includes("expected string to have >=1 characters") || errorMessage.includes("Too small")) {
        errorMessage = "At least 1 medicine is required!";
      }

      toast.error("Submission Failed!", {
        description: errorMessage,
        style: { background: "#ef4444", color: "white", borderRadius: "10px",
          padding: "12px"},
      });
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  })

  const onSubmit = (data: FormData) => {
    const formattedData = {
      ...data,
      medical_record_id: String(medical_record_id),
      medicines: data.medicines.map(m => ({
        ...m,
        duration_days: Number(m.duration_days) || 0,
        unit_price: Number(m.unit_price) || 0
      }))
    }
    mutation.mutate(formattedData)

    reset()
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <DynamicBreadcrumb
        homeHref={"/doctor"}
        items={[
          { label: "Medical Records", href: "/doctor/medical-records" },
          { label: "Create Prescription" },
        ]}
      />

      <h1 className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mt-4 mb-6 ml-2">
        Create Prescription
      </h1>

      <div className="max-w-4xl mx-auto mt-10">
        <Card className="shadow-xl border-t-4 border-cyan-500 dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="bg-white dark:bg-slate-900 border-b dark:border-slate-800">
            <CardTitle className="text-xl text-slate-700 dark:text-slate-200">
              Prescription Details
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-600 dark:text-slate-400">Doctor's Notes</Label>
                <Textarea
                  placeholder="e.g. Take after breakfast..."
                  className="min-h-[100px] focus-visible:ring-cyan-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  {...register("notes")}
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-bold border-l-4 border-cyan-500 pl-3 text-slate-800 dark:text-white">
                  Medicines
                </h2>

                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group p-5 border-2 rounded-2xl bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 items-end"
                    >
                      <div className="md:col-span-3 space-y-2 text-left">
                        <Label className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 ml-1">Name</Label>
                        <Input
                          placeholder="Medicine Name"
                          className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus-visible:ring-cyan-500"
                          {...register(`medicines.${index}.medicine_name`)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2 text-left">
                        <Label className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 ml-1">Dosage</Label>
                        <Input
                          placeholder="500mg"
                          className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          {...register(`medicines.${index}.dosage`)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2 text-left">
                        <Label className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 ml-1">Frequency</Label>
                        <Input
                          placeholder="1-0-1"
                          className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          {...register(`medicines.${index}.frequency`)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2 text-left">
                        <Label className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 ml-1">Days</Label>
                        <Input
                          type="number"
                          placeholder="7"
                          className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          {...register(`medicines.${index}.duration_days`)}
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2 text-left">
                        <Label className="text-[11px] font-black uppercase text-cyan-600 dark:text-cyan-400 ml-1 flex items-center gap-1">
                          Price <span className="text-[10px]">₹</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                          {...register(`medicines.${index}.unit_price`)}
                        />
                      </div>

                      <div className="md:col-span-1">
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-full md:w-10 md:h-10 flex items-center justify-center gap-2 md:gap-0 shadow-sm transition-transform active:scale-90 bg-red-500 hover:bg-red-600 text-white p-2 md:p-0"
                          onClick={() => remove(index)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="md:hidden font-bold text-xs">Delete Item</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto border-dashed border-2 border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950 font-semibold"
                  onClick={() => append({
                    medicine_name: "",
                    dosage: "",
                    frequency: "",
                    // @ts-ignore
                    duration_days: undefined,
                    // @ts-ignore
                    unit_price: undefined
                  })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Medicine
                </Button>
              </div>

              <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white text-lg font-bold py-7 rounded-xl shadow-lg transition-all active:scale-[0.98]">
                Generate Prescription
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PrescriptionForm;