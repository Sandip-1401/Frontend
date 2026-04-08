import type { Column } from "@/components/data-table/types";
import type { AppointmentWithSerial } from "../doctors/appoitment/appointmentForDoctor";

export const appointmentHeaderForPatient: Column<AppointmentWithSerial>[] = [
  {
    header: "NO.",
    key: "serial"
  },
  {
    header: "DOCTOR NAME",
    key: "doctor",
    render: (row) => row.doctor?.user?.name
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