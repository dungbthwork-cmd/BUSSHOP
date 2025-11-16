"use client"
import dynamic from "next/dynamic"

const SearchPage = dynamic(() => import('../search/page'), { ssr: false })

export default function LichTrinhPage() {
	return <SearchPage />
}