import type { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  idKey: keyof T;
//   loading: boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (id: T[keyof T]) => void;
  className?: string;
  noDataMsg?: string;
}