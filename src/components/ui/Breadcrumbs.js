import MaterialBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default function Breadcrumbs({ prevPage, prevPageLink, curPage }) {
	const handleClick = (event) => {
		event.preventDefault()
		console.info('You clicked a breadcrumb.')
	}

	return (
		<div role='presentation' onClick={handleClick}>
			<MaterialBreadcrumbs aria-label='breadcrumb' className='mb-2 text-sm tracking-wider text-zinc-100'>
				<Link underline='hover' color='inherit' href={prevPageLink}>
					{prevPage}
				</Link>
				<p>{curPage}</p>
			</MaterialBreadcrumbs>
		</div>
	)
}
