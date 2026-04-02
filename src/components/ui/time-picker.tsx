"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function TimePicker({
  value,
  onChange,
  className,
  id,
}: {
  value?: string
  onChange?: (val: string) => void
  className?: string
  id?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [hour, setHour] = React.useState(0)
  const [minute, setMinute] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = [0, 15, 30, 45]

  const display = value
    ? `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    : ""

  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":").map(Number)
      setHour(h)
      setMinute(m)
    }
  }, [value])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const emit = (h: number, m: number) => {
    onChange?.(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
  }

  const handleHour = (h: number) => { setHour(h); emit(h, minute) }
  const handleMinute = (m: number) => { setMinute(m); emit(hour, m) }

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-10 w-full rounded-lg border bg-white px-3 py-2",
          "border-gray-200 dark:border-gray-700",
          "bg-white dark:bg-gray-900",
          "text-sm text-left text-gray-700 dark:text-gray-200",
          "transition-all duration-150 outline-none cursor-pointer",
          "hover:border-cyan-300 dark:hover:border-cyan-600",
          "focus-visible:border-cyan-500 focus-visible:ring-3 focus-visible:ring-cyan-500/20",
          open && "border-cyan-500 ring-3 ring-cyan-500/20"
        )}
      >
        <span className={cn(!value && "text-gray-400 dark:text-gray-500")}>
          {display || "Select time"}
        </span>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className={cn(
          "absolute z-50 mt-1 w-full rounded-xl border p-3",
          "bg-white dark:bg-gray-900",
          "border-gray-100 dark:border-gray-700",
          "shadow-lg dark:shadow-black/40"
        )}>
          <div className="flex gap-2">

            {/* Hours */}
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center">Hour</p>
              <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto pr-0.5">
                {hours.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleHour(h)}
                    className={cn(
                      "py-1.5 rounded-lg text-sm font-medium transition-all duration-100",
                      hour === h && value
                        ? "bg-cyan-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400"
                    )}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px bg-gray-100 dark:bg-gray-700" />

            {/* Minutes */}
            <div className="w-16">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center">Min</p>
              <div className="flex flex-col gap-1">
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMinute(m)}
                    className={cn(
                      "py-1.5 rounded-lg text-sm font-medium transition-all duration-100",
                      minute === m && value
                        ? "bg-cyan-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400"
                    )}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export { TimePicker }