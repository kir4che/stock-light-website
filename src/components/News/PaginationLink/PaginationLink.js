// @ts-nocheck
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaginationLink({ totalPages }) {
	const router = useRouter()
	const query = router.query
	const page = parseInt(query.page || '1', 10)

	return (
		<div className='mt-20'>
			<Pagination
				page={page}
				count={totalPages}
				renderItem={(item) => (
					<Link href={`/news${item.page === 1 ? '' : `?page=${item.page}`}`} passHref>
						<PaginationItem {...item} />
					</Link>
				)}
			/>
		</div>
	)
}
