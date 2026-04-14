import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { MedicalRecordCard } from "@/types/apiResponse";
import {
  Mars,
  Droplets,
  AlertCircle,
  CalendarDays,
  Clock,
  MessageCircle,
  Eye,
} from "lucide-react";

type Props = MedicalRecordCard & {
  onViewDetails: (id: string) => void
}

const MedicalCard = ({
  diagnosis,
  notes,
  appointment,
  patient,
  medical_record_id,
  onViewDetails,
}: Props) => {
  return (
    <Card className="hover:shadow-md w-[300px] transition dark:bg-slate-900 dark:border-gray-400 dark:border dark bg-gray-50">

          <CardHeader className="flex flex-row items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium text-sm flex-shrink-0">
              {patient.user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="text-base font-medium">{patient.user.name}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  <Mars size={12} />
                  {patient?.gender}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                  <Droplets size={12} />
                  {patient.blood_group}
                </span>
              </div>
            </div>

            <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Diagnosis
              </p>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-md bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} className="text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600">
                    {diagnosis}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {notes}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Appointment
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={14} />
                  <span>{appointment.appointment_date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>{appointment.appointment_time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle size={14} />
                  <span>{appointment.reason}</span>
                </div>
              </div>
            </div>

          </CardContent>

          <CardFooter className=" py-0 flex justify-center items-center">
            <Button
              variant="default"
              className="w-full gap-2 mt-3 dark:text-black bg-cyan-400 !text-white hover:bg-cyan-500 active:bg-cyan-400"
              onClick={() => onViewDetails(medical_record_id)}
            >
              <Eye size={15} />
              View Details
            </Button>
          </CardFooter>

        </Card>
  )
}

export default MedicalCard


