import { Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import LogoutButton from "../LogoutButton";
import { useTheamStroe } from "@/store/theamStore";

type NavbarProps = {
  onToggle: () => void;
};


const Navbar = ({ onToggle }: NavbarProps) => {

  const theam = useTheamStroe((state) => state.theam)
  const toggleTheam = useTheamStroe((state) => state.toggleTheam)

  return (
    <>
      <div className="h-full flex items-center justify-between px-4 md:px-6 border-b shadow-sm dark:border-gray-600 dark:bg-slate-950">

        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle} 
            className="dark:border-2 dark:border-gray-600 border-slate-300"
          >
            <Menu className="h-5 w-5 dark:text-white" />
          </Button>
        </div>
        <div className="flex items-center gap-5">

          {theam === "light" ? <Sun size={18} onClick={toggleTheam}  className="text-white cursor-pointer"/> : <Moon size={18} onClick={toggleTheam} className="cursor-pointer"/>}
          
          

          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;