"use client"

import * as React from "react"

export function Button(
  {
    className = "",
    variant = "default",
    size = "md",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "outline" | "ghost" | "default"
    size?: "sm" | "md" | "lg"
  },
) {
  const base =
    "inline-flex items-center justify-center rounded-2xl text-sm transition focus:outline-none focus:ring-2 focus:ring-amber-500/60"

  const variantClass =
    variant === "outline"
      ? "border border-slate-200 bg-white hover:bg-slate-50"
      : variant === "ghost"
        ? "hover:bg-slate-100"
        : "bg-amber-600 text-white hover:opacity-95"

  const sizeClass =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : size === "lg"
        ? "px-5 py-2.5 text-base"
        : "px-4 py-2"

  return (
    <button
      className={[base, variantClass, sizeClass, className].join(" ")}
      {...props}
    />
  )
}


export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props
  return (
    <input
      {...rest}
      className={
        "w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none ring-amber-500/60 placeholder:text-slate-400 focus:ring-2 " +
        className
      }
    />
  )
}

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { className = "", ...rest } = props
  return (
    <label
      {...rest}
      className={
        "text-xs font-medium uppercase tracking-wide text-slate-600 " +
        className
      }
    />
  )
}

export function Separator(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={"h-px w-full bg-slate-200 " + className}
    />
  )
}

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={
        "rounded-2xl border border-slate-200 bg-white shadow-sm " + className
      }
    />
  )
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={"border-b border-slate-100 px-4 py-3 " + className}
    />
  )
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props
  return <div {...rest} className={"px-4 py-3 " + className} />
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  const { className = "", ...rest } = props
  return (
    <h2
      {...rest}
      className={"text-base font-semibold text-slate-900 " + className}
    />
  )
}

export function Badge(
  props: React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "outline" | "secondary"
  },
) {
  const { className = "", variant = "default", ...rest } = props
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
  const style =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700"
      : variant === "secondary"
        ? "bg-slate-100 text-slate-700"
        : "bg-amber-100 text-amber-700"
  return <span {...rest} className={[base, style, className].join(" ")} />
}

export function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={"animate-pulse rounded-md bg-slate-200/70 " + className}
    />
  )
}

// Slider đơn giản: dùng value[0] là giá trị, onValueChange nhận [v, oldMax]
type SliderProps = {
  value: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (v: number[]) => void
} & React.HTMLAttributes<HTMLDivElement>

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className = "",
  ...rest
}: SliderProps) {
  const current = Array.isArray(value) && value.length ? value[0] : min
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    const maxVal = Array.isArray(value) && value.length > 1 ? value[1] : max
    onValueChange?.([v, maxVal])
  }
  return (
    <div {...rest} className={"w-full " + className}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={handleChange}
        className="w-full cursor-pointer accent-amber-600"
      />
    </div>
  )
}

// Dialog đơn giản
export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  children: React.ReactNode
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function DialogContent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className = "", ...rest } = props
  return <div {...rest} className={className} />
}

export function DialogHeader(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={"mb-3 flex items-center justify-between " + className}
    />
  )
}

export function DialogTitle(
  props: React.HTMLAttributes<HTMLHeadingElement>,
) {
  const { className = "", ...rest } = props
  return (
    <h3
      {...rest}
      className={"text-lg font-semibold text-slate-900 " + className}
    />
  )
}

// Popover đơn giản
export function Popover({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>
}

export function PopoverTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export function PopoverContent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className = "", ...rest } = props
  return (
    <div
      {...rest}
      className={
        "absolute z-50 mt-2 rounded-xl border bg-white p-2 shadow " +
        className
      }
    />
  )
}

// Calendar: dùng input type="date"
export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date
  onSelect: (d: Date | null) => void
}) {
  const year = selected.getFullYear()
  const month = String(selected.getMonth() + 1).padStart(2, "0")
  const day = String(selected.getDate()).padStart(2, "0")
  const value = `${year}-${month}-${day}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (!v) {
      onSelect(null)
      return
    }
    const d = new Date(v + "T00:00:00")
    onSelect(d)
  }

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
    />
  )
}
