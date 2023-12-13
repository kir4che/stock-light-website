'use client'

import MaterialBreadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

export default function Breadcrumbs({ prevPage, prevPageLink, curPage }) {
	const router = useRouter()

	return (
		<div role='presentation' onClick={(e) => e.preventDefault()}>
			<MaterialBreadcrumbs aria-label='breadcrumb' className='mb-1 -ml-1.5 text-xs text-zinc-200'>
				<Button
					onClick={() => {
						if (prevPageLink) router.push(prevPageLink)
						else router.back()
					}}
					className='-mr-1.5 text-xs hover:underline focus:underline text-zinc-200'
				>
					{prevPage}
				</Button>
				<p>{curPage}</p>
			</MaterialBreadcrumbs>
		</div>
	)
}
