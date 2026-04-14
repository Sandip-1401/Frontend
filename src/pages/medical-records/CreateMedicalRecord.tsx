import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { createMedicalRecord } from "@/features/general/api"
import { toast } from "sonner"

interface MedicalFormData {
   diagnosis: string,
   notes: string
}
export interface MedicalFormDataForSend {
   appointment_id: string,
   diagnosis: string,
   notes: string
}

const CreateMedicalRecord = () => {

   const navigate = useNavigate();
   const { appointmentId } = useParams();

   const form = useForm<MedicalFormData>({
      mode: "onSubmit",
      defaultValues: {
         diagnosis: '',
         notes: ''
      }
   })

   const mutation = useMutation({
      mutationFn: async (payload: MedicalFormDataForSend) => {
         const res = await createMedicalRecord(payload);

         if (!res.success) {
            throw new Error(res.message)
         }
         return res.data
      },
      onSuccess: () => {
         form.reset();
         toast.success("Medical record created!", {
            duration: 3000,
            description: "Your Medical record has been created successfully.",
            style: {
               background: "#22c55e",
               color: "white",
               borderRadius: "10px",
               padding: "12px",
            },
         });
      },
      onError: (error) => {
         form.setError("root", {
            type: "server",
            message: error.message,
         });
      },
   })



   const onSubmit = (data: MedicalFormData) => {
      const FormData = { ...data, appointment_id: String(appointmentId) }
      console.log(FormData)
      mutation.mutate(FormData);
   }

   return (
      <Dialog open={true} onOpenChange={() => navigate(-1)} >
         <DialogContent className="sm:max-w-sm dark:bg-slate-900 dark:text-white text-black">
            <DialogHeader>
               <DialogTitle>Create Medical Record</DialogTitle>
               <DialogDescription>
                  Fill the data and click Create button when you're done.
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)}>

               <FieldGroup>
                  <Field>
                     <FormField               
                        control={form.control}
                        name="diagnosis"
                        render={({ field }) => (
                           <>
                              <Label htmlFor="diagnosis">Diagnosis</Label>
                              <Textarea
                                 id="diagnosis"
                                 placeholder="Write diagnosis..."
                                 value={field.value}
                                 onChange={field.onChange}
                              />
                           </>
                        )}
                     />
                  </Field>
               </FieldGroup>

               <FieldGroup className="mt-3 mb-4">
                  <Field>
                     <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                           <>
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea
                                 id="notes"
                                 placeholder="Write notes..."
                                 value={field.value}
                                 onChange={field.onChange}
                              />
                           </>
                        )}
                     />
                  </Field>
               </FieldGroup>
               {form.formState.errors.root && (
                  <Alert variant="destructive" className="flex items-center bg-red-400/30 text-red-500 mt-7">
                     <AlertCircleIcon />
                     <AlertTitle>{form.formState.errors.root.message}
                     </AlertTitle>
                  </Alert>
               )}
               <DialogFooter>
                  <Button className="dark:text-black" type="button" variant="outline" onClick={() => navigate(-1)}>
                     Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
               </DialogFooter>

            </form>
         </DialogContent>
      </Dialog>
   )
}

export default CreateMedicalRecord
