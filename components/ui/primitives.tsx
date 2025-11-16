"use client"
import * as React from "react"

export function Button(
  { className="", variant="default", size="md", ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline"|"ghost"|"default", size?: "sm"|"md"|"lg"|string }
) {
  const base = "inline-flex items-center justify-center rounded-2xl text-sm transition"
  const sizeCls = size === "sm" ? "px-3 py-1 text-sm h-8" : size === "lg" ? "px-6 py-3 text-base h-12" : "px-4 py-2 text-sm h-10"
  const style = variant==="outline"
    ? "border hover:bg-gray-50"
    : variant==="ghost"
      ? "hover:bg-transparent"
      : "bg-amber-600 text-white hover:opacity-95"
  return <button className={[base, sizeCls, style, className].join(" ")} {...props} />
}
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={"w-full rounded-2xl border px-3 py-2 text-sm " + className}
      {...props}
    />
  );
});

Input.displayName = "Input";

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={"mb-1 block text-xs font-medium "+(props.className||"")} />
}
export function Card({className="", ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={"rounded-3xl border bg-white "+className} {...props} />
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={"p-4 "+(props.className||"")} /> }
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={"text-lg font-semibold "+(props.className||"")} /> }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={"p-4 "+(props.className||"")} /> }
export function Skeleton({className=""}:{className?:string}) { return <div className={"animate-pulse rounded-xl bg-gray-200 "+className} /> }
export function Badge({variant="default", className="", ...props}:{variant?:"default"|"secondary"|"outline"; className?:string} & React.HTMLAttributes<HTMLSpanElement>) {
  const style = variant==="secondary" ? "bg-gray-100" : variant==="outline" ? "border" : "bg-amber-100 text-amber-800"
  return <span {...props} className={"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs "+style+" "+className} />
}
export function Separator(){return <div className="h-px w-full bg-gray-200" />}

export function Slider({min=0,max=100,step=1,value=[0,100],onValueChange}:{min?:number;max?:number;step?:number;value:number[];onValueChange:(v:number[])=>void}){
  const [v,setV]=React.useState(value)
  return <div className="flex items-center gap-2">
    <input type="range" min={min} max={max} step={step} value={v[0]} onChange={e=>{const nv=[Number(e.target.value),v[1]]; setV(nv); onValueChange(nv)}}/>
    <input type="range" min={min} max={max} step={step} value={v[1]} onChange={e=>{const nv=[v[0],Number(e.target.value)]; setV(nv); onValueChange(nv)}}/>
    <span className="text-xs text-gray-500">{v[0].toLocaleString()} - {v[1].toLocaleString()}</span>
  </div>
}

export function Dialog({open, onOpenChange, children}:{open:boolean;onOpenChange:(o:boolean)=>void;children:React.ReactNode}){
  if(!open) return null
  return <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40" onClick={()=>onOpenChange(false)}>
    <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-xl" onClick={e=>e.stopPropagation()}>{children}</div>
  </div>
}
export function DialogContent({className="", ...props}: React.HTMLAttributes<HTMLDivElement>){ return <div className={className} {...props}/> }
export function DialogHeader(props: React.HTMLAttributes<HTMLDivElement>){ return <div {...props} className={"mb-3 "+(props.className||"")} /> }
export function DialogTitle(props: React.HTMLAttributes<HTMLHeadingElement>){ return <h3 {...props} className={"text-lg font-semibold "+(props.className||"")} /> }

export function Popover({children}:{children:React.ReactNode}){ return <div className="relative">{children}</div> }
export function PopoverTrigger({children, asChild}:{children:React.ReactNode, asChild?:boolean}){ return <>{children}</> }
export function PopoverContent({className="", align, ...props}: {className?:string, align?:"start"|"center"|"end"|string} & React.HTMLAttributes<HTMLDivElement>){
  return <div {...props} className={"absolute z-50 mt-2 rounded-xl border bg-white p-2 shadow "+className} />
}

export function Calendar({selected,onSelect}:{selected:Date;onSelect:(d:Date)=>void}){
  return <input type="date" value={selected.toISOString().slice(0,10)} onChange={e=>onSelect(new Date(e.target.value))} className="rounded-xl border px-3 py-2 text-sm"/>
}
