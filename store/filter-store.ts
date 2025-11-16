
import { create } from "zustand"

type FilterState = {
  brands: string[]
  departureHours: number[]
  priceRange: number[]
  toggleBrand: (b:string)=>void
  toggleHour: (h:number)=>void
  setPriceRange: (v:number[])=>void
  clearAll: ()=>void
  setMorning: ()=>void
  setAfternoon: ()=>void
  setEvening: ()=>void
}

export const useFilterStore = create<FilterState>((set,get)=>({
  brands: [],
  departureHours: [],
  priceRange: [100000, 1000000],
  toggleBrand: (b) => set(s=> ({
    brands: s.brands.includes(b) ? s.brands.filter(x=>x!==b) : [...s.brands, b]
  })),
  toggleHour: (h) => set(s=> ({
    departureHours: s.departureHours.includes(h) ? s.departureHours.filter(x=>x!==h) : [...s.departureHours, h]
  })),
  setPriceRange: (v) => set({ priceRange: v }),
  clearAll: () => set({ brands: [], departureHours: [], priceRange: [100000, 1000000] }),
  setMorning: () => set({ departureHours: [6,8,10] }),
  setAfternoon: () => set({ departureHours: [12,14,16] }),
  setEvening: () => set({ departureHours: [18,20] }),
}))
