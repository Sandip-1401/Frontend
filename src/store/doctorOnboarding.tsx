import { create } from "zustand";

type Store = {
   step: number,
   setStep: (step: number) => void
}

export const doctorOnboardingStor = create<Store>((set) => ({
   step: 1,
   setStep: (step: number) => set({
      step
   })
}))