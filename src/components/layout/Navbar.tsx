import { BellIcon, Menu, Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SheetOverlay } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LogoutButton from "../LogoutButton";
import { useTheamStroe } from "@/store/theamStore";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "@/features/general/api";
import MyLoader from "../MyLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { NotificationData } from "@/types/apiResponse";
import ErrorMessage from "../ErrorMessage";

type NavbarProps = {
  onToggle: () => void;
};


const Navbar = ({ onToggle }: NavbarProps) => {

  const theam = useTheamStroe((state) => state.theam)
  const toggleTheam = useTheamStroe((state) => state.toggleTheam)


  const {data, isLoading, error} = useQuery<NotificationData[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await getMyNotifications();

      if(!res.success){
        throw new Error(res.message)
      }
      return res.data ?? []
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
  
  console.log(data);

  return (
    <>
      <div className="h-full flex items-center justify-between px-4 md:px-6 border-b shadow-sm dark:border-gray-600 dark:bg-slate-950">


        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="dark:border-2 dark:border-gray-600 border-slate-300"
          >
            <Menu className="h-5 w-5 dark:text-white" />
          </Button>
        </div>
        <div className="flex items-center gap-5">

          {theam === "light" ? <Sun size={18} onClick={toggleTheam} className="text-white cursor-pointer" /> : <Moon size={18} onClick={toggleTheam} className="cursor-pointer" />}

          <div className="flex items-center justify-center ">
            <Sheet>
              <SheetTrigger>
                <div className="relative hover:bg-gray-100 p-1.5 rounded-full">
                  <BellIcon size={18} className="dark:text-white cursor-pointer" />
                  <div className="absolute bg-red-500 h-2.5 w-2.5 rounded-lg top-0.5 right-1.5 animate-ping duration-500"></div>
                </div>
              </SheetTrigger>
              <SheetOverlay className="bg-black/30 backdrop-blur-sm" />

              <SheetContent className="border-none ">
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="bg-background dark:bg-slate-950 backdrop-blur-2xl h-full dark:border-none dark:shadow-[-5px_-5px_5px_#000111] p-3"
                >
                  <SheetHeader>
                    <SheetTitle className="text-gray-950 dark:text-cyan-400 text-xl">Notifications</SheetTitle>
                    <SheetDescription>
                      <Button className="mt-3">Appointment</Button>
                    </SheetDescription>
                  </SheetHeader>
                  {isLoading && <MyLoader />}
                  {error && <ErrorMessage errorProp={(error as Error).message} />}
                  {data?.map((notify, idx) => (

                  <Card key={idx} size="sm" className="mx-auto w-full max-w-sm mt-2 dark:border dark:border-cyan-100/30">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="dark:text-cyan-400">{notify.title}</CardTitle>
                      <CardDescription className="dark:text-gray-400 text-gray-400">
                        {notify?.created_at && new Date(notify.created_at).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="dark:text-white">
                        {notify.message}
                      </p>
                    </CardContent>
                  </Card>
                  ))}
                  <SheetFooter>
                    <SheetClose asChild></SheetClose>
                  </SheetFooter>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Navbar;