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
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Sort = "experience_years" | "consultation_fee" | null;
type Order = "ASC" | "DESC" | null;

const ShowDoctors = () => {

   const [doctors, setDoctors] = useState<DoctorDataType[]>([]);
   const [search, setSearch] = useState<string>('');
   const [debouncedSearch, setDebouncedSearch] = useState('');
   const [sort, setSort] = useState<Sort>();
   const [order, setOrder] = useState<Order>();
   const [departments, setDepartments] = useState<Department[]>([]);
   const [departmentId, setDepartmentId] = useState<string>('');

   useEffect(() => {
      const fetchDoctors = async () => {

         const res = await getAllDoctors(debouncedSearch, departmentId);

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
      setSort(null);
      setOrder(null);
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
         <div className="w-full h-16 flex items-center px-10">
            <div>
               <InputGroup className="max-w-xs hover:ring-1 ring-cyan-400 duration-300">
                  <InputGroupInput placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <InputGroupAddon>
                     <Search />
                  </InputGroupAddon>
               </InputGroup>
            </div>
            <div>
               <Select value={departmentId} onValueChange={setDepartmentId}>
                  <SelectTrigger>
                     <SelectValue placeholder="Select Department"/>
                  </SelectTrigger>
                  <SelectContent position={"popper"}>
                     <SelectGroup>
                        {departments.map((department) => (
                           <SelectItem key={department.department_id} value={department.department_id}>{department.department_name}</SelectItem>
                        ))}
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
            <Button onClick={handleClick}><X/>Clear</Button>
         </div>
         <div className="px-10 py-5 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-7 items-center justify-center">

            {doctors.map((doc, idx) => (
               <DoctorCard
                  key={idx}
                  name={doc.user.name}
                  experience_year={doc.experience_years}
                  department={doc.department.department_name}
                  fees={doc.consultation_fee}
                  status={doc.status}
                  qualification={doc.qualification}
               />
            ))}
         </div>

      </div>
   )
}

export default ShowDoctors
