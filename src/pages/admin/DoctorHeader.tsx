import type { Column } from "@/components/data-table/types";
import StatusToggle from "@/components/StatusToggle";
import type { DoctorWithSerial } from "@/types/apiResponse";

export const doctorHeaderForAdmin: Column<DoctorWithSerial>[] = [
   {
      header: "NO.",
      key: "serial"
   },
   {
      header: "DOCTOR NAME",
      key: "doctor",
      render: (row) => row.user.name
   },
   {
      header: "EMAIL",
      key: "email",
      render: (row) => row.user.email
   },
   {
      header: "QUALIFICATION",
      key: "qualification",
      render: (row) => row.qualification
   },
   {
      header: "EXPERIENCE",
      key: "experience_years",
      render: (row) => row.experience_years
   },
   {
      header: "CONSULTATION",
      key: "consultation_fee",
      render: (row) => row.consultation_fee
   },
   {
      header: "STATUS(pending)",
      key: "status",
      render: (row) => <StatusToggle row={row} />
   }

]