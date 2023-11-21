import Loading from '@/components/common/Loading'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

export default function StockProfile(stockId) {
	const [isLoading, setIsLoading] = useState(true)
	const [profile, setProfile] = useState(null)

	const fetchStockProfile = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/description/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setProfile(data.data[0])

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		fetchStockProfile(stockId.stockId)
	}, [stockId])

	return (
		<>
			{!isLoading && profile ? (
				<div>
					<p className='mt-2 mb-4'>{profile.description || ''}</p>
					<TableContainer className='md:items-start md:gap-8 md:flex'>
						<Table className='md:max-w-sm'>
							<TableBody>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										成立時間
									</TableCell>
									<TableCell align='right'>{profile.established_time || ''}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										執行長
									</TableCell>
									<TableCell align='right'>{profile.ceo || ''}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										市值
									</TableCell>
									<TableCell align='right'>{profile.market_value || ''}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										股利收益率
									</TableCell>
									<TableCell align='right'>{profile.dividend_rate || ''}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<Table className='md:max-w-sm'>
							<TableBody>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										公司地址
									</TableCell>
									<TableCell align='right'>{profile.headquater || ''}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										公司網站
									</TableCell>
									<TableCell align='right'>{profile.website || ''}</TableCell>
								</TableRow>
								<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
										員工人數
									</TableCell>
									<TableCell align='right'>{profile.staff_number || ''}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			) : (
				<Loading />
			)}
		</>
	)
}
