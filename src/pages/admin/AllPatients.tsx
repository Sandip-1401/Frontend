import DataTable from '@/components/data-table/DataTable'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb'
import ErrorMessage from '@/components/ErrorMessage'
import MyLoader from '@/components/MyLoader'
import { allPatients } from '@/features/general/api'
import type { Patient, PatientWithSerial } from '@/types/apiResponse'
import { useQuery } from '@tanstack/react-query'
import { patientHeaderForAdmin } from './PatientHeader'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ArrowDownUp, ArrowUpDown, Search, XOctagonIcon } from 'lucide-react'
import { ToggleGroupItem, ToggleGroup } from '@/components/ui/toggle-group'
import { orderSortButtonClasName, toggleGroupItem } from './AllDoctorList'
import { Button } from '@/components/ui/button'

const AllPatients = () => {

   const navigate = useNavigate()
   const [search, setSearch] = useState<string>('');
   const [debouncedSearch, setDebouncedSearch] = useState('');
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('');
   const [gender, setGender] = useState<string>('')

   const columns = patientHeaderForAdmin;

   const { data, isLoading, error } = useQuery<Patient[]>({
      queryKey: ["patients", debouncedSearch, gender, sort, order],
      queryFn: async () => {
         const res = await allPatients(debouncedSearch, gender, sort, order);
         if (!res.success) {
            throw new Error(res.message)
         }
         return res.data ?? [];
      },
      staleTime: 1000 * 5 * 60,
      refetchOnWindowFocus: false
   })

   const formattedData: PatientWithSerial[] =
      data?.map((item, idx) => ({
         ...item,
         serial: idx + 1,
      })) || [];

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
      setGender('')
   }

   // if (isLoading) {
   //    return <MyLoader />
   // }
   if (error) {
      return <ErrorMessage errorProp={(error as Error).message} />
   }

   return (
      <div className='p-6'>
         <DynamicBreadcrumb
            homeHref={"/admin"}
            items={[
               { label: "All Patient" },
            ]}
         />
         <div>
            <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>All Patient list</p>
         </div>

         <div className='flex gap-3'>
            <div >
               <InputGroup >
                  <InputGroupInput placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <InputGroupAddon>
                     <Search />
                  </InputGroupAddon>
               </InputGroup>
            </div>
            <div>
               <ToggleGroup
                  type="single"
                  onValueChange={(val) => setGender(val)}
                  className=" rounded-lg border dark:border-gray-600  overflow-hidden"
               >
                  <ToggleGroupItem
                     value="MALE"
                     className={`${" px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"}border-r border-gray-600`}
                  >
                     Male
                  </ToggleGroupItem>

                  <ToggleGroupItem
                     value="FEMALE"
                     className={`${" px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"}border-r border-gray-600`}
                  >
                     Female
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="OTHER"
                     className={`${" px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"}border-r border-gray-600`}
                  >
                     Other
                  </ToggleGroupItem>
               </ToggleGroup>
            </div>
            <div className="flex  gap-4">
               <ToggleGroup
                  type="single"
                  onValueChange={(val) => setSort(val)}
                  className=" rounded-lg border dark:border-gray-600  overflow-hidden"
               >
                  <ToggleGroupItem
                     value="date_of_birth"
                     className={`${" px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"}border-r border-gray-600`}
                  >
                     DOB
                  </ToggleGroupItem>

                  <ToggleGroupItem
                     value="created_at"
                     className={`${" px-4 py-1.5 text-sm font-medium data-[state=on]:bg-cyan-400/80 data-[state=on]:text-white data-[state=on]:dark:text-white text-gray-600/80 dark:text-white/60 transition-none"}border-r border-gray-600`}
                  >
                     created_at
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
            <div className="flex items-center sm:col-span-2 md:col-span-2 lg:col-span-3 justify-end lg:col-start-12">
               <Button onClick={handleClick} className="w-full text-sm font-semibold flex items-center justify-center gap-2 "><XOctagonIcon className="w-32 h-32" />Clear</Button>
            </div>
         </div>

         <DataTable
            data={formattedData}
            columns={columns}
            idKey='serial'
            onView={(row) => {
               navigate(`/admin/patients/${row.patient_id}`)
            }}
            className='mt-7'
         />
      </div>
   )
}

export default AllPatients
