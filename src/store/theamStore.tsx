import { create } from "zustand";
import { persist } from "zustand/middleware"
type Theam = 'light' | 'dark'

type TheamStore = {
   theam: Theam,
   toggleTheam: () => void
   setTheam: (theam: Theam) => void
}

export const useTheamStroe = create<TheamStore>()(
   persist(
      (set) => ({
         theam: 'light',

         toggleTheam: () => set((state) => ({
            theam: state.theam === 'light' ? 'dark' : 'light'
         })),

         setTheam: (theam) => set({ theam: theam })
      }),
      {
         name: "app-theam",
      }
   )
)