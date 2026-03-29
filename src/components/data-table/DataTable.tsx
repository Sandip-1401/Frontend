import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DataTableProps } from "@/components/data-table/types";

const MotionRow = motion.create(TableRow);

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  idKey,
  onView,
  onEdit,
  onDelete,
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="hidden md:flex flex-col overflow-auto shadow-sm rounded-md border dark:border-gray-600">
        <Table>
          <TableHeader className="bg-cyan-400 dark:bg-primary-400 sticky z-10 top-0">
            <TableRow>
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "font-semibold border-r dark:border-gray-100 text-white px-3 py-2",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.align === "left" && "text-left"
                  )}
                >
                  {col.header}
                </TableHead>
              ))}

              {(onView || onEdit || onDelete) && (
                <TableHead className="font-semibold border-r border-gray-700 text-primary text-left w-[120px] px-3 py-2 text-white">
                  ACTIONS
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence>
              {data.map((row, index) => (
                <MotionRow
                  key={String(row[idKey])}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "group border-b dark:border-gray-600 transition-colors",
                    index % 2 === 0
                      ? "bg-background dark:bg-slate-950"
                      : "bg-slate-100/100 dark:bg-slate-900",
                    "hover:bg-primary/5 dark:hover:bg-slate-950"
                  )}
                >
                  {columns.map((col) => {
                    const content = col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? "");

                    return (
                      <TableCell
                        key={String(col.key)}
                        className={cn(
                          "border-r dark:border-gray-600 px-3 py-2 text-sm truncate",
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right"
                        )}
                        title={
                          typeof content === "string" ? content : undefined
                        }
                      >
                        {content || "-"}
                      </TableCell>
                    );
                  })}

                  {(onView || onEdit || onDelete) && (
                    <TableCell className="flex justify-center items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {onView && (
                            <DropdownMenuItem className="dark:bg-slate-400 p-2 dark:text-gray-800 flex justify-center" onClick={() => onView(row)}>
                              View
                            </DropdownMenuItem>
                          )}

                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row)}>
                              Edit
                            </DropdownMenuItem>
                          )}

                          {onDelete && (
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => onDelete(row[idKey])}
                            >
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </MotionRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable; 