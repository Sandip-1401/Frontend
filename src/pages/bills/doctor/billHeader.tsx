import type { Column } from "@/components/data-table/types";
import type { BillWithSerial } from "@/types/apiResponse";

export const billHeader: Column<BillWithSerial>[] = [
   {
      header: "No",
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
      header: "BILL NO",
      key: "bill_number",
      render: (row) => row.bill_number
   },
   {
      header: "BILL DATE",
      key: "bill_date",
      render: (row) => row.bill_date
   },{
      header: "NET AMOUNT",
      key: "net_amount",
      render: (row) => row.net_amount
   },
   {
      header: "STATUS",
      key: "status",
      render: (row) => row.status
   },
]