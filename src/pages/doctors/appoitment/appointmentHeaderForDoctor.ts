import type { Column } from "@/components/data-table/types";
import type { AppointmentWithSerial } from "./appointmentForDoctor";

export const appointmentHeaderForDoctor: Column<AppointmentWithSerial>[] = [
  {
    header: "NO.",
    key: "serial"
  },
  {
    header: "PATIENT NAME",
    key: "patient",
    render: (row) => row.patient?.user?.name
  },
  {
    header: "DATE",
    key: "appointment_date",
    render: (row) =>
      new Date(row.appointment_date).toLocaleDateString()
  },
  {
    header: "TIME",
    key: "appointment_time"
  },
  {
    header: "CREATED AT",
    key: "created_at",
    render: (row) =>
      new Date(row.created_at).toLocaleString()
  },
  {
    header: "STATUS",
    key: "status",
    render: (row) => row.status.status_name
  }
];