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
      <div className="h-full flex flex-col text-foreground border-r border-border shadow-sm dark:bg-slate-950 dark:border-gray-600 p-1.5">

        <ScrollArea className="flex-1 py-3 px-2">
          <nav className="space-y-1.5">
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
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                        collapsed && "justify-center px-0 py-2.5",
                        "text-muted-foreground hover:text-foreground dark:text-white "
                      )}
                    >
                      {Icon && (
                        <Icon className="h-4 w-4 shrink-0" />
                      )}

                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">
                            {item.label}
                          </span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform duration-200 opacity-50",
                              isOpen && "rotate-90"
                            )}
                          />
                        </>
                      )}
                    </button>

                    {/* Children */}
                    {isOpen && !collapsed && (
                      <div className="ml-4 mt-0.5 mb-0.5 space-y-0.5 border-l border-border pl-3">
                        {item.children.map((child, idx) => {
                          const isActive = location.pathname === String(child.path);

                          return (
                            <Link
                              key={idx}
                              to={String(child.path)}
                              className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 hover:bg-cyan-100 dark:hover:bg-slate-700",
                                // collapsed && "justify-center px-0 py-2.5",
                                isActive
                                  ? "bg-primary hover:bg-primary dark:hover:bg-primary text-primary-foreground shadow-sm"
                                  : "dark:text-gray-100 hover:text-foreground "
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

              const isActive = location.pathname === String(item.path);

              const linkContent = (
                <Link
                  to={String(item.path)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 hover:bg-cyan-100 dark:hover:bg-slate-700",
                    collapsed && "justify-center px-0 py-2.5",
                    isActive
                      ? "bg-primary hover:bg-primary dark:hover:bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground "
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn(
                        "shrink-0 transition-colors dark:text-gray-200",
                        collapsed ? "h-5 w-5" : "h-4 w-4",
                        isActive
                          ? "text-primary-foreground"
                          : "group-hover:text-foreground"
                      )}
                    />
                  )}

                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate dark:text-gray-200">
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