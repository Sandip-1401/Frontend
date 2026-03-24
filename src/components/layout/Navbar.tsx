import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

type NavbarProps = {
  onToggle: () => void;
};


const Navbar = ({ onToggle }: NavbarProps) => {

  return (
    <>
      <div className="h-full flex items-center justify-between px-4 md:px-6 border-b shadow-sm">

        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle} 
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;