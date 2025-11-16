import dynamic from "next/dynamic"

const MarketingPage = dynamic(() => import('./(marketing)/page'), { ssr: false })

export default function Page() {
	return <MarketingPage />
}