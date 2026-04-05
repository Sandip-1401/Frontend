import type { Column } from "@/components/data-table/types";
import type { UserWithSerial } from "@/types/apiResponse";
import { Checkbox } from "@/components/ui/checkbox";

export const userHeader: Column<UserWithSerial>[] = [
   {
      header: "No.",
      key: "serial"
   },
   {
      header: "Name",
      key: "name"
   },
   {
      header: "Email",
      key: "email"
   },
   {
      header: "Phone No",
      key: "phone_number"
   },
   {
      header: "Verified",
      key: "is_verified",
      render: (row) => (
         <Checkbox className="shadow" checked={row.is_verified} />
      )
   },
   {
      header: "created_at",
      key: "created_at"
   }
];