import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

// import * as React from "react"
// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "h-10 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2",
//         "text-sm text-gray-700 transition-all duration-150 outline-none",
//         "placeholder:text-gray-400",
//         "hover:border-cyan-300",
//         "focus-visible:border-cyan-500 focus-visible:ring-3 focus-visible:ring-cyan-500/20",
//         "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
//         "aria-invalid:border-red-400 aria-invalid:ring-3 aria-invalid:ring-red-400/20",
//         // time input specific
//         type === "time" && [
//           "[color-scheme:light]",
//           "cursor-pointer",
//           "[&::-webkit-calendar-picker-indicator]:opacity-40",
//           "[&::-webkit-calendar-picker-indicator]:hover:opacity-100",
//           "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
//           "[&::-webkit-calendar-picker-indicator]:transition-opacity",
//           "[&::-webkit-datetime-edit-hour-field]:rounded",
//           "[&::-webkit-datetime-edit-minute-field]:rounded",
//           "[&::-webkit-datetime-edit-ampm-field]:rounded",
//           "[&::-webkit-datetime-edit-hour-field]:px-0.5",
//           "[&::-webkit-datetime-edit-minute-field]:px-0.5",
//           "[&::-webkit-datetime-edit-ampm-field]:px-0.5",
//           "[&::-webkit-datetime-edit-hour-field:focus]:bg-cyan-500",
//           "[&::-webkit-datetime-edit-minute-field:focus]:bg-cyan-500",
//           "[&::-webkit-datetime-edit-ampm-field:focus]:bg-cyan-500",
//           "[&::-webkit-datetime-edit-hour-field:focus]:text-white",
//           "[&::-webkit-datetime-edit-minute-field:focus]:text-white",
//           "[&::-webkit-datetime-edit-ampm-field:focus]:text-white",
//         ],
//         "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }