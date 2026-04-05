import type { Column } from "@/components/data-table/types";
import type { UserWithSerial } from "@/types/apiResponse";
import { Checkbox } from "@/components/ui/checkbox";
import { verifyUser } from "@/features/general/api";

export const unverifiedUser: Column<UserWithSerial>[] = [
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
         <Checkbox className="shadow" onCheckedChange={() => verifyUser(row.user_id)}/>
      )
   },
   {
      header: "created_at",
      key: "created_at"
   }
];