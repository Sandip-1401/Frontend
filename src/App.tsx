import { useEffect } from "react";
import AppRoute from "./routes/AppRoute"
import { useTheamStroe } from "./store/theamStore"
import { Toaster } from "./components/ui/sonner";

const App = () => {

  const theam = useTheamStroe((state) => state.theam);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light")
    if(theam === 'dark') root.classList.add("light")
    else root.classList.add("dark")
  }, [theam])

  return (
    <div>
      <AppRoute />
      <Toaster position="top-center" richColors/>   
    </div>
  )
}

export default App
