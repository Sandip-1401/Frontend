import type { Column } from "@/components/data-table/types";
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
   }
]