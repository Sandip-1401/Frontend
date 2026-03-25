import { Badge } from "@/components/ui/badge"
import {
   Card,
   CardContent,
} from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

type DoctorCard = {
   name: string
   department: string,
   experience_year: number,
   qualification: string,
   fees: number,
   status: string
}
const DoctorCard = ({ name, department, experience_year, fees, status, qualification }: DoctorCard) => {
   return (
      <div>
         <Card onClick={() => console.log("CLicked!")} className="h-full w-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 dark:border-2 dark:border-gray-500 dark:bg-slate-900 cursor-pointer active:shadow-sm dark:hover:shadow-xl dark:hover:shadow-slate-300/30 dark:active:shadow-slate-500/20">
            <CardContent className="p-5 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-100 text-cyan-600 rounded-full">
                     <Stethoscope size={20} />
                  </div>
                  <div>
                     <h2 className="text-lg font-semibold text-gray-700/90 dark:text-gray-300">{name}</h2>
                     <p className="text-sm text-gray-700/90 dark:text-gray-300">{department}</p>
                  </div>
               </div>
               <div className="flex flex-col text-sm text-gray-700/90 gap-3 dark:text-gray-300">
                  <div className="flex gap-4">
                     <p className="text-sm font-semibold">Qualification: </p>
                     <p className="font-medium">{qualification}</p>
                  </div>
                  <div className="flex gap-4">
                     <p className="text-sm font-semibold">Experience: </p>
                     <p className="font-medium">{experience_year} yrs</p>
                  </div>
                  <div className="flex gap-4">
                     <p className="text-sm font-semibold">Consultation: </p>
                     <p className="font-medium">₹{fees}</p>
                  </div>
               </div>
               <div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                     {status}
                  </Badge>
               </div>

            </CardContent>
         </Card>
      </div>
   )
}

export default DoctorCard
