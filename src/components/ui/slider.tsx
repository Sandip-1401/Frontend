import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "value" | "defaultValue"> & {
  value?: number
  defaultValue?: number
}) {
  const _values = React.useMemo(
    () =>
      value !== undefined
        ? [value]
        : defaultValue !== undefined
          ? [defaultValue]
          : [min],
    [value, defaultValue, min]
  )

  const totalSteps = Math.round((max - min) / step)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue !== undefined ? [defaultValue] as number[] : [min] as number[]}
      value={value !== undefined ? [value] as number[] : undefined}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none items-center select-none py-2",
        "data-disabled:opacity-50",
        "data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-[4px] w-full grow rounded-full bg-gray-200"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full rounded-full bg-cyan-500 transition-all duration-200"
        />
      </SliderPrimitive.Track>

      <div className="absolute w-full flex justify-between px-0 top-[calc(50%+8px)]">
        {Array.from({ length: totalSteps + 1 }, (_, i) => (
          <span key={i} className="text-[10px] text-gray-400 font-medium">
            {min + i * step}
          </span>
        ))}
      </div>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "block h-[18px] w-[18px] rounded-full",
            "bg-white border-2 border-cyan-500",
            "shadow-sm",
            "hover:scale-110 hover:shadow-[0_0_0_4px_rgba(6,182,212,0.2)]",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(6,182,212,0.3)]",
            "transition-all duration-150 ease-out",
            "cursor-grab active:cursor-grabbing"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }