'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchParams() {
	const searchParams = useSearchParams()

	const search = searchParams.get('search')

	console.log(search)

	return search
}
