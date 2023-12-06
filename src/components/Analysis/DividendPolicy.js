import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'

export default function DividendPolicy({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])

	const fetchDividendPolicy = async () => {
		setIsLoading(true)
		try {
			const responce = await fetch(`${process.env.DB_URL}/api/stock/history/dividend_policy/${stockId}`, {
				method: 'GET',
			})
			const data = await responce.json()
			setData(data.data.map((row, index) => ({ id: index + 1, ...row })))
			setIsLoading(false)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchDividendPolicy()
	}, [stockId])

	return !isLoading ? (
		<DataGrid
			rows={data}
			columns={[
				{ field: 'announcedDate', headerName: '宣告日', flex: 1 },
				{ field: 'cashDividend', headerName: '現金股利', flex: 1 },
				{ field: 'stockDividend', headerName: '股票股利', flex: 1 },
				{ field: 'XDTradingDate', headerName: '除息日', flex: 1 },
				{ field: 'XRTradingDate', headerName: '除權日', flex: 1 },
				{ field: 'cashDividendPaidDate', headerName: '現金股利發放日', flex: 1 },
				{ field: 'XDPriceRecoveryDays', headerName: '填息花費日數', flex: 1 },
				{ field: 'payoutType', headerName: '股利發放形式', flex: 1 },
			]}
			sx={{
				pl: 2,
				pr: 3,
				pt: 0,
				pb: 2,
				'& .css-1iyq7zh-MuiDataGrid-columnHeaders, & .MuiDataGrid-withBorderColor': {
					borderBottomWidth: '0.75px',
					borderColor: '#71717a',
				},
				'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
					outline: 'none',
				},
				'& .css-i4bv87-MuiSvgIcon-root': {
					color: '#a1a1aa',
				},
				'& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
					color: '#40B4FF',
				},
			}}
			className='bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
			hideFooter
			disableRowSelectionOnClick
			disableColumnMenu
		/>
	) : (
		<Loading />
	)
}
