import { create } from "zustand";

type RegisterData = {
   name: string,
   email: string,
   password: string,
   phone_number: string
}

interface RegisterStore {
   step: number,
   formData: RegisterData | null;

   setFormData: (data: RegisterData) => void;
   setStep: (step: number) => void
   reset: () => void
}

export const useRegisterStore = create<RegisterStore>((set) => ({
   step: 1,
   formData:  null,

   setFormData: (data: RegisterData) => set({
      formData: data
   }),

   setStep: (step: number) => set({
      step
   }),

   reset: () => set({
      step: 1,
      formData: null
   })

}))