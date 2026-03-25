import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertCircle , ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/50 dark:bg-black/70">
      <Card size="sm" className="mx-auto w-full max-w-sm shadow-md p-4 bg-slate-100 dark:bg-slate-900">
      <CardHeader className="mt-3 flex flex-col gap-3">
        <CardTitle><p className="text-xl text-gray-800 flex gap-5 items-center"><div className="bg-red-300 p-2 rounded-full flex items-center justify-center"><AlertCircle className="text-red-500 shadow-red-300" /></div><p className="dark:text-gray-400">Unauthorized</p></p></CardTitle>
        <CardDescription>
          <p className="text-gray-600 font-semibold dark:text-gray-400">  Your are Unauthorized person.</p>
        </CardDescription>
      </CardHeader >
      <CardContent className="mt-3">
        <p className="text-gray-600 font-semibold dark:text-gray-400">
          You have not right permissions to access this page.
          <p className="underline dark:text-gray-400">Please do your job</p>
        </p>
      </CardContent>
      <CardFooter className="mt-3">
        <Button onClick={() =>navigate(-1)} variant="outline" size="sm" className="w-full rounded-lg bg-red-500 text-gray-200 hover:bg-red-600 hover:text-gray-200 hover:scale-105 duration-700 outline-none border-none">
          <ArrowLeft className="scale-105 hover:rotate-90" /> Go Back
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Unauthorized
