import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { menuConfig } from "./menu.config";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const role = useAuthStore((s) => s.role);
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  if (!role) return null;

  const menuItems = menuConfig[role] ?? [];

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
      // setOpenMenus({ [label]: true }); // at a time ek hi open rakhne ko
    }));
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground border-r border-gray-300 shadow-lg">
        
        <ScrollArea className="flex-1 py-3 px-2">
          <nav className="space-y-1">
            {menuItems.map((item, i) => {
              const Icon = item.icon;

              if (item.children) {
                const isOpen = openMenus[item.label];

                return (
                  <div key={i}>
                    {/* Parent */}
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ",
                        collapsed && "justify-center px-0 py-2.5",
                        "hover:bg-sidebar-accent/50"
                      )}
                    >
                      {Icon && (
                        <Icon className="h-4 w-4 shrink-0 text-sidebar-foreground/70" />
                      )}

                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">
                            {item.label}
                          </span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isOpen && "rotate-90"
                            )}
                          />
                        </>
                      )}
                    </button>

                    {/* Children */}
                    {isOpen && !collapsed && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child, idx) => {
                          // const isActive = location.pathname.startsWith(
                          //   String(child.path)
                          // );
                          const isActive = location.pathname === String(item.path);

                          return (
                            <Link
                              key={idx}
                              to={String(child.path)}
                              className={cn(
                                "block rounded-md px-3 py-1.5 text-sm transition",
                                isActive
                                  ? "bg-primary text-sidebar-accent-foreground"
                                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>  
                    )}
                  </div>
                );
              }

              // const isActive = location.pathname.startsWith(
              //   String(item.path)
              // );
              const isActive = location.pathname === String(item.path);

              const linkContent = (
                <Link
                  to={String(item.path)}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150",
                    collapsed && "justify-center px-0 py-2.5",
                    isActive
                      ? "bg-primary text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "shrink-0",
                        collapsed ? "h-5 w-5" : "h-4 w-4",
                        isActive
                          ? "text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"
                      )}
                    />
                  )}

                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">
                        {item.label}
                      </span>
                      {isActive && (
                        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                      )}
                    </>
                  )}
                </Link>
              );

              return collapsed ? (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={i}>{linkContent}</div>
              );
            })}
          </nav>
        </ScrollArea>
        
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;