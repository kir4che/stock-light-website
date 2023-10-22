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
		<div className='mt-20 mb-2'>
			<Pagination
				sx={{
					'& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root:hover': {
						bgcolor: 'rgb(255 222 107/0.3) !important',
					},
					'& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root': {
						color: '#a1a1aa !important',
					},
					'& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
						color: '#27272a !important',
						bgcolor: '#FFDE6B !important',
					},
				}}
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
