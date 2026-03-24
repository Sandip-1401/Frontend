import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleToggle = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  return (
    <div className="h-screen flex flex-col bg-muted/40">

      <header className="h-16 z-30 shrink-0">
        <Navbar onToggle={handleToggle} />
      </header>

      <div className="flex flex-1 overflow-hidden relative">

        {isMobile && mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside
          className={cn(
            "z-20 shrink-0 transition-all duration-300 ease-in-out",
            isMobile
              ? cn(
                "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              )
              : collapsed
                ? "w-[68px]"
                : "w-60"
          )}
        >
          <Sidebar collapsed={isMobile ? false : collapsed} />
        </aside>

        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
