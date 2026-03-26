"use client"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import DoctorCard from "@/components/DoctorCard"
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { getAllDoctors, getDepartments } from "@/features/general/api"
import type { Department, DoctorDataType } from "@/types/apiResponse"
import { useEffect, useState } from "react"
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from "@/components/ui/input-group"
import { ArrowDownUp, ArrowUpDown, FilterIcon, FilterXIcon, Search, XOctagonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";

// type Sort = "experience_years" | "consultation_fee" | null;
// type Order = "ASC" | "DESC" | null;

const orderSortButtonClasName = `h-8 w-8 bg-cyan-400 rounded-full ring-1 ring-cyan-500/70 hover:scale-105 active:scale-100 hover:shadow-cyan-500/60 active:shadow-cyan-500/30 active:bg-cyan-500 shadow-[0_0_7px_#22d3ee] dark:shadow-[0_0_15px_#22d3ee] text-white flex items-center justify-center  cursor-pointer transition-transform duration-300`;

const toggleGroupItem = "w-1/2 px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"

const ShowDoctors = () => {

   const [doctors, setDoctors] = useState<DoctorDataType[]>([]);
   const [search, setSearch] = useState<string>('');
   const [debouncedSearch, setDebouncedSearch] = useState('');
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('');
   const [departments, setDepartments] = useState<Department[]>([]);
   const [departmentId, setDepartmentId] = useState<string>('');

   useEffect(() => {
      const fetchDoctors = async () => {

         const res = await getAllDoctors(debouncedSearch, departmentId, sort, order);

         if (!res.success) {
            console.log("Doctor fetch message:", res.message);
            return;
         }
         setDoctors(res.data);
      };

      fetchDoctors();
   }, [debouncedSearch, sort, order, departmentId]);

   useEffect(() => {
      const fetchDepartments = async () => {

         const res = await getDepartments();

         if (!res.success) {
            console.log("Depart fetch message: ", res.message);
            return;
         }
         setDepartments(res.data)
      };

      fetchDepartments();
   }, [])

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearch(search)
      }, 500)
      return () => clearTimeout(timer);
   }, [search])

   const handleClick = () => {
      setSearch('');
      setSort('');
      setOrder('');
      setDepartmentId('')
   }

   return (
      <div className="p-4">
         <DynamicBreadcrumb
            homeHref={"/patient"}
            items={[
               { label: "All Doctors" },
            ]}
         />
         <div>
            <h1 className="text-3xl font-bold text-primary ml-4">All Doctors</h1>
         </div>
         <div className="mt-4 px-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 mb-1">
            {/* <div className=" "> */}
            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-4">
               <InputGroup className="min-w-full outline-none dark:border dark:border-gray-500 hover:shadow-[0_0_7px_#06b6d4] hover:border-none">
                  <InputGroupInput placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <InputGroupAddon>
                     <Search />
                  </InputGroupAddon>
               </InputGroup>
            </div>

            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-6">
               <Select value={departmentId} onValueChange={setDepartmentId} >
                  <SelectTrigger className="w-full text-gray-700 dark:text-gray-400 dark:border-gray-500">
                     {departmentId !== '' ? <FilterIcon className="text-gray-700 dark:text-gray-300" /> :
                        <FilterXIcon className="text-gray-700 dark:text-gray-300" />}
                     <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent position={"popper"} className="w-full">
                     <SelectGroup className=" bg-white dark:bg-slate-900 dark:border-slate-700  flex flex-col gap-1.5 ">
                        {departments.map((department) => (
                           <SelectItem key={department.department_id} value={department.department_id} className="w-full text-gray-800 dark:text-white/70 border-none hover:bg-cyan-400 hover:text-white dark:hover:bg-slate-700">{department.department_name}</SelectItem>
                        ))}
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>

            <div className="col-span-3 sm:col-span-2 md:col-span-2 lg:col-span-3 flex gap-2 lg:col-start-9">
               <ToggleGroup
                  type="single"
                  onValueChange={(val) => setSort(val)}
                  className="w-full rounded-lg border dark:border-gray-600  overflow-hidden"
               >
                  <ToggleGroupItem
                     value="experience_years"
                     className={`${toggleGroupItem}border-r border-gray-600`}
                  >
                     Experience
                  </ToggleGroupItem>

                  <ToggleGroupItem
                     value="consultation_fee"
                     className={`${toggleGroupItem}border-r border-gray-600`}
                  >
                     Cunsultent
                  </ToggleGroupItem>
               </ToggleGroup>
               <div className="flex text-lg items-center">
                  {order === "ASC" ?
                     <div className={orderSortButtonClasName}>
                        <ArrowUpDown size={22} onClick={() => setOrder("DESC")} />
                     </div> :
                     <div className={orderSortButtonClasName}>
                        <ArrowDownUp size={22} onClick={() => setOrder("ASC")} />
                     </div>}
               </div>
            </div>
            {/* </div> */}
            <div className="flex items-center sm:col-span-2 md:col-span-2 lg:col-span-3 justify-end lg:col-start-12">
               <Button onClick={handleClick} className="w-full text-sm font-semibold flex items-center justify-center gap-2 "><XOctagonIcon className="w-32 h-32" />Clear</Button>
            </div>
         </div>
         <div className="px-10 py-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-7 items-center justify-center">

            {doctors.map((doc, idx) => (
               <motion.div
                  key={doc.doctor_id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
               >
                  <DoctorCard
                     key={idx}
                     name={doc.user.name}
                     experience_year={doc.experience_years}
                     department={doc.department.department_name}
                     fees={doc.consultation_fee}
                     status={doc.status}
                     qualification={doc.qualification}
                  />
               </motion.div>
            ))}
         </div>

      </div>
   )
}

export default ShowDoctors
