import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'

export default function StockProfile({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [profile, setProfile] = useState(null)

	const fetchStockProfile = async (stockId) => {
		setIsLoading(true)

		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/description/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			setProfile(data.data[0])

			if (data.success) setIsLoading(false)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchStockProfile(stockId)
	}, [stockId])

	const renderTableRow = (label, value) => {
		return (
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell
					component='th'
					scope='row'
					className='bg-primary_yellow/50 dark:border-zinc-600 dark:bg-primary_yellow'
				>
					{label}
				</TableCell>
				<TableCell align='right' className='dark:border-zinc-600 dark:text-zinc-100'>
					{value}
				</TableCell>
			</TableRow>
		)
	}

	return (
		<>
			{!isLoading && profile ? (
				<>
					<p className='mt-2 mb-4'>{profile.description || ''}</p>
					<TableContainer className='dark:bg-zinc-800 md:items-start md:gap-12 md:flex'>
						<Table className='md:max-w-sm'>
							<TableBody>
								{renderTableRow('成立時間', profile.established_time || '')}
								{renderTableRow('執行長', profile.ceo || '')}
								{renderTableRow('市值', profile.market_value || '')}
								{renderTableRow('股利收益率', profile.dividend_rate || '')}
							</TableBody>
						</Table>
						<Table className='md:max-w-sm'>
							<TableBody>
								{renderTableRow('公司地址', profile.headquater || '')}
								{renderTableRow('公司網站', profile.website || '')}
								{renderTableRow('員工人數', profile.staff_number || '')}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			) : (
				<Loading />
			)}
		</>
	)
}
