import DynamicBreadcrumb from "@/components/DynamicBreadcrumb"
import { getAllUser } from "@/features/general/api"
import type { User, UserWithSerial } from "@/types/apiResponse"
import { useQuery } from "@tanstack/react-query"
import { userHeader } from "./UserHeader"
import DataTable from "@/components/data-table/DataTable"
import MyLoader from "@/components/MyLoader"
import ErrorMessage from "@/components/ErrorMessage"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { ArrowDownUp, ArrowUpDown, LucideUserRoundCheck, SearchIcon, XOctagonIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const AllUsers = () => {

   const [search, setSearch] = useState<string>('');
   const [debouncedSearch, setDebouncedSearch] = useState('');
   const [sort, setSort] = useState<string>('');
   const [order, setOrder] = useState<string>('');
   const [verified, setVerified] = useState<string>('')

   const { data, isLoading, error } = useQuery<User[]>({
      queryKey: ["Users", debouncedSearch, verified, sort, order],
      queryFn: async () => {
         const res = await getAllUser(debouncedSearch, verified, sort, order);

         if (!res.success) {
            throw new Error(res.message)
         }
         return res.data ?? []
      },
      staleTime: 1000 * 5 * 60,
      refetchOnWindowFocus: false
   })

   const formatedData: UserWithSerial[] =
      data?.map((item, idx) => ({
         ...item,
         serial: idx + 1,
         created_at: new Date(item.created_at).toLocaleString()
      })) || [];

   const columns = userHeader;

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearch(search)
      }, 500)

      return () => clearTimeout(timer)
   }, [search])

   const handleClick = () => {
      setSearch('');
      setSort('');
      setOrder('');
      setVerified('')
   }
   console.log(verified, order, sort)
   return (
      <div className='p-6'>
         <DynamicBreadcrumb
            homeHref={"/admin"}
            items={[
               { label: "All Users" },
            ]}
         />
         <div>
            <p className='text-2xl font-semibold mb-5 dark:text-cyan-400 text-gray-700'>All User list</p>
         </div>

         <div className="grid gird-cols-3 sm:grid sm:grid-cols-12">
            <div className="col-span-3 mb-3 sm:col-span-4">
               <InputGroup>
                  <InputGroupInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                  <InputGroupAddon>
                     <SearchIcon />
                  </InputGroupAddon>
               </InputGroup>
            </div>
            <div className="sm:col-span-2 sm:col-start-7">
               <Button className={verified === 'true' ? "bg-cyan-400 w-full" : "bg-white text-gray-900 border-gray-300 dark:bg-slate-900 dark:text-white w-full"} onClick={() => setVerified(prev => prev === 'true' ? '' : 'true')}><LucideUserRoundCheck /> Verified Users</Button>
            </div>
            <div className="sm:col-start-9 sm:col-span-2 ">
               <Button
               className="w-full"
                  onClick={() => {
                     setSort('created_at')
                     setOrder(prev => prev === "ASC" ? "DESC" : "ASC")
                  }}
               >
                  Created_at

                  {order === "ASC" ? (
                     <ArrowUpDown size={22} />
                  ) : (
                     <ArrowDownUp size={22} />
                  )}
               </Button>
            </div>
            <div className="sm:col-start-11 sm:col-span-2">
               <Button onClick={handleClick} className="w-full text-sm font-semibold flex items-center justify-center gap-2 "><XOctagonIcon className="w-32 h-32" />Clear</Button>
            </div>
         </div>

         {isLoading && (<MyLoader />)}
         {error && (<ErrorMessage errorProp={(error as Error).message} />)}

         <DataTable
            data={formatedData}
            columns={columns}
            idKey="serial"
            onView={(row) => console.log(row.user_id)}
            className="mt-3"
         />
      </div>
   )
}

export default AllUsers
