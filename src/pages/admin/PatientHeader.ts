import type { Column } from "@/components/data-table/types";
import type { PatientWithSerial } from "@/types/apiResponse";

export const patientHeaderForAdmin: Column<PatientWithSerial>[] = [
   {
      header: "NO.",
      key: "serial"
   },
   {
      header: "PATIENT NAME",
      key: "patient",
      render: (row) => row.user?.name
   },
   {
      header: "EMAIL",
      key: "email",
      render: (row) => row.user.email
   },
   {
      header: "GENDER",
      key: "gender",
      render: (row) => row.gender
   },
   {
      header: "DOB",
      key: "date_of_birth",
      render: (row) => row.date_of_birth
   },
   {
    header: "CREATED AT",
    key: "created_at",
    render: (row) =>
      new Date(row.created_at).toLocaleString()
  },
]
   
