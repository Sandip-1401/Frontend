import React from 'react'

const MyLoader = () => {
   return (
      <div className="mx-auto my-auto flex flex-col items-center justify-center">
         <div className="w-12 h-12 rounded-full border-t-2 border-cyan-400 animate-spin duration-300" />
         <p className="text-gray-800 dark:text-white">Data Loading...</p>
      </div>
   )
}

export default MyLoader
