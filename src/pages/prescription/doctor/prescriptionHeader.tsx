import type { Column } from "@/components/data-table/types";
import type { PrescriptionsWithSerial } from "@/types/apiResponse";

export const prescriptionHeader: Column<PrescriptionsWithSerial>[] = [
   {
      header: "No.",
      key: "serial"
   },
   {
      header: "PATIENT NAME",
      key: "patient",
      render: (row) => row.patient.user.name
   },
   {
      header: "EMAIL",
      key: "email",
      render: (row) => row.patient.user.email
   },
   {
      header: "GENDER",
      key: "gender",
      render: (row) => row.patient.gender
   },
   {
      header: "BLOOD GROUP",
      key: "blood_group",
      render: (row) => row.patient.blood_group
   },
   {
      header: "RECORD DATE",
      key: "record_date",
      render: (row) => new Date(row.medical_record.record_date).toLocaleDateString()
   },
   {
      header: "PRESCRIPTION DATE",
      key: "prescribed_date",
      render: (row) => new Date(row.prescribed_date).toLocaleDateString()
   }
]