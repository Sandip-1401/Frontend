import { Home, ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItemType[];
  homeHref: string;
}

const DynamicBreadcrumb = ({ items, homeHref }: DynamicBreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl overflow-hidden ">
      <Breadcrumb className="mb-4">
        <BreadcrumbList
          className="flex items-center !flex-nowrap whitespace-nowrap gap-1 sm:gap-2"
          style={{ flexWrap: "nowrap" }}
        >
          <BreadcrumbItem className="shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-7 w-7 rounded-md  dark:hover:bg-slate-800 transition-colors scale-125 hover:scale-150"
              title="Go Back"
            >
              <ChevronLeft size={18} className="text-muted-foreground" />
            </Button>
          </BreadcrumbItem>

          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1 shrink-0" />

          <BreadcrumbItem className="shrink-0">
            <BreadcrumbLink
              onClick={() => navigate(homeHref)}
              className="flex items-center gap-1 text-[11px] sm:text-sm"
            >
              <Home size={14} /> <span className="xs:inline">Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="shrink-0" />
                <BreadcrumbItem
                  className={isLast ? "min-w-0 flex-1" : "shrink-0"}
                >
                  {item.href ? (
                    <BreadcrumbLink
                      onClick={() => navigate(item.href ?? "")}
                      className="text-[11px] sm:text-sm hover:text-primary transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-primary font-semibold text-[11px] sm:text-sm truncate block">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DynamicBreadcrumb;
