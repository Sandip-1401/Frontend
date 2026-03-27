import { AlertCircleIcon } from "lucide-react"
import {
   Alert,
   AlertDescription,
   AlertTitle,
} from "@/components/ui/alert"

type ErrorMessageProps = {
  errorProp: string;
};

const ErrorMessage = ({errorProp}: ErrorMessageProps) => {
  return (
    <div className="mx-auto my-auto flex flex-col items-center justify-center">
            <Alert variant="destructive" className="max-w-md bg-red-400/20 flex flex-col text-red-400">
               <div className="flex gap-3">
                  <AlertCircleIcon />
                  <AlertTitle>{errorProp}</AlertTitle>
               </div>
               <AlertDescription className="px-2">
                  For some reason can't fetch data. Try after some time.
               </AlertDescription>
            </Alert>
         </div>
  )
}

export default ErrorMessage
