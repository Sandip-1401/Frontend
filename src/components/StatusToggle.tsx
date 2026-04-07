import React from 'react'
import { Switch } from './ui/switch'
import type { DoctorWithSerial } from '@/types/apiResponse'
import { useQueryClient } from '@tanstack/react-query'
import { activeDoctor } from '@/features/general/api'

const StatusToggle = ({ row }: { row: DoctorWithSerial }) => {

   const queryClient = useQueryClient()

   return (
      <Switch
         className="data-[state=checked]:bg-cyan-500 data-[state=unchecked]:bg-gray-300"
         checked={row.status === "ACTIVE"}
         onCheckedChange={async () => {
            await activeDoctor(row.doctor_id)
            setTimeout(() => {
               queryClient.invalidateQueries({
                  queryKey: ["pending-doctors"],
               });
            }, 500);
         }}
      />
   )
}

export default StatusToggle
