import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Tab, Tabs } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import router from 'next/router'
import { useEffect, useState } from 'react'
import StarryBackground from '../../../../components/StarryBackground/StarryBackground'
import StockSelect from '../../../../components/StockSelector/StockSelector'
import { getServerAuthSession } from '../../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	if (currentURL.includes(session.user.id)) return { props: { user: session.user } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

export default function Portfolio() {
	const [tabIndex, setTabIndex] = useState(0)
	const [portfolioData, setPortfolioData] = useState([])
	const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0)
	const [rows, setRows] = useState([])

	const handleChange = (e, index) => setTabIndex(index)
	const handleChangePortfolio = (index) => setCurrentPortfolioIndex(index)

	// 表格欄位配置
	const columns = [
		{ field: 'stock_id', headerName: '代號', flex: 1 },
		{ field: 'stock_name', headerName: '股票', flex: 1 },
		{
			field: 'price',
			headerName: '股價',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
			cellClassName: (params) => {
				const changeValue = params.row.quote_change || 0
				return changeValue > 0 ? 'text-stock_red' : changeValue < 0 ? 'text-stock_green' : ''
			},
		},
		{
			field: 'quote_change',
			headerName: '漲跌',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
			cellClassName: (params) => {
				const value = params.value || 0
				return value > 0 ? 'text-stock_red' : value < 0 ? 'text-stock_green' : ''
			},
		},
		{
			field: 'quote_change_percent',
			headerName: '漲跌幅 (%)',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			renderCell: (params) => {
				const value = params.value || 0
				if (value > 0) {
					return (
						<p className='flex items-center space-x-0.5 text-stock_red'>
							<ArrowDropUpIcon color='error' />
							<span>{`${value.toFixed(2)}%`}</span>
						</p>
					)
				} else if (value < 0) {
					return (
						<p className='flex items-center space-x-0.5 text-stock_green'>
							<ArrowDropDownIcon color='success' />
							<span>{`${Math.abs(value.toFixed(2))}%`}</span>
						</p>
					)
				} else {
					return `${value.toFixed(2)}%`
				}
			},
		},
		{
			field: 'opening_price',
			headerName: '開盤價',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
		},
		{
			field: 'closing_price',
			headerName: '收盤價',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
		},
		{
			field: 'highest_price',
			headerName: '最高價',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
		},
		{
			field: 'lowest_price',
			headerName: '最低價',
			headerAlign: 'right',
			align: 'right',
			sortable: true,
			flex: 1,
			valueFormatter: (params) => `${params.value.toFixed(2)}`,
		},
	]

	const fakeData = [
		{
			team_name: '投資組合 1',
			data: [
				{
					stock_name: '股票 A',
					stock_id: '1234',
					price: 100,
					quote_change: 5,
					quote_change_percent: 5.0,
					opening_price: 95,
					closing_price: 105,
					highest_price: 110,
					lowest_price: 90,
				},
				{
					stock_name: '股票 D',
					stock_id: '5678',
					price: 50,
					quote_change: -2,
					quote_change_percent: -4.25,
					opening_price: 52,
					closing_price: 48,
					highest_price: 55,
					lowest_price: 45,
				},
			],
		},
		{
			team_name: '投資組合 2',
			data: [
				{
					stock_name: '股票 S',
					stock_id: '7890',
					price: 75,
					quote_change: 3,
					quote_change_percent: 1.631,
					opening_price: 72,
					closing_price: 78,
					highest_price: 80,
					lowest_price: 70,
				},
				{
					stock_name: '股票 F',
					stock_id: '3456',
					price: 120,
					quote_change: 8,
					quote_change_percent: 7.0,
					opening_price: 112,
					closing_price: 128,
					highest_price: 130,
					lowest_price: 110,
				},
			],
		},
	]

	const generateUniqueIds = (data) => {
		let idCounter = 1
		return data.map((portfolio) => {
			return {
				...portfolio,
				data: portfolio.data.map((row) => ({
					...row,
					id: idCounter++,
				})),
			}
		})
	}

	useEffect(() => {
		// // 🚩投資組合：待檢查
		// 	fetch(`${process.env.DB_URL}/api/user/getTeam`)
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			console.log('投資組合: ', data)
		// 			setPortfolioData(data)
		// 		})
		// 		.catch((error) => {
		// 			console.log('error', error)
		// 		})
		setPortfolioData(generateUniqueIds(fakeData))
		setTabIndex(0)
	}, [])

	useEffect(() => {
		if (portfolioData[currentPortfolioIndex]) setRows(portfolioData[currentPortfolioIndex].data)
		else setRows([])
	}, [currentPortfolioIndex, portfolioData])

	// 新增投資組合
	const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false)
	const handleAddPortfolio = () => {
		if (newPortfolioName === '') {
			alert('請輸入您要新增的投資組合名稱！')
			return
		}

		const newPortfolio = {
			team_name: newPortfolioName,
			data: [],
		}

		setPortfolioData([...portfolioData, newPortfolio])
		setNewPortfolioName('')
		setIsAddPortfolioOpen(false)

		// // 🚩新增投資組合：待檢查
		// if (newPortfolioName === '') {
		// 	alert('請輸入您要新增的投資組合名稱！')
		// 	return
		// }

		// const requestData = {
		// 	team_name: newPortfolioName,
		// }

		// fetch('/api/user/createTeam', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(requestData),
		// })
		// 	.then((response) => {
		// 		if (response.ok) return response.json()
		// 		else throw new Error('新增投資組合失敗！')
		// 	})
		// 	.then((data) => {
		// 		setPortfolioData([...portfolioData, data])

		// 		setNewPortfolioName('')
		// 		setIsAddPortfolioOpen(false)
		// 	})
		// 	.catch((error) => {
		// 		console.log('error', error)
		// 	})
	}

	// 移除投資組合
	const [isDeletePortfolioOpen, setIsDeletePortfolioOpen] = useState(false)

	const handleDeletePortfolio = () => {
		const deleteIndex = currentPortfolioIndex
		const updatedPortfolioData = [...portfolioData]

		updatedPortfolioData.splice(deleteIndex, 1)
		setPortfolioData(updatedPortfolioData)

		if (deleteIndex === currentPortfolioIndex) setCurrentPortfolioIndex(0)
		setIsDeletePortfolioOpen(false)

		// // 🚩移除投資組合：待檢查
		// const teamIdToDelete = portfolioData[currentPortfolioIndex].team_id

		// fetch(`${process.env.DB_URL}/api/user/deleteTeam/${teamIdToDelete}`, {
		// 	method: 'DELETE',
		// })
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			const updatedPortfolioData = [...portfolioData]
		// 			updatedPortfolioData.splice(currentPortfolioIndex, 1)
		// 			setPortfolioData(updatedPortfolioData)

		// 			if (currentPortfolioIndex === deleteIndex) setCurrentPortfolioIndex(0)
		// 			setIsDeletePortfolioOpen(false)
		// 		} else throw new Error('移除投資組合失敗！')
		// 	})
		// 	.catch((error) => {
		// 		console.log('error', error)
		// 	})
	}

	// 編輯投資組合名稱
	const [isEditNameOpen, setIsEditNameOpen] = useState(false)
	const [newPortfolioName, setNewPortfolioName] = useState('')

	const handleSaveName = () => {
		if (newPortfolioName === '') {
			alert('請輸入您要變更的名稱！')
			return
		}
		if (portfolioData[currentPortfolioIndex]) {
			portfolioData[currentPortfolioIndex].team_name = newPortfolioName
			setIsEditNameOpen(false)
		}

		// // 🚩更改投資組合名稱：待檢查
		// if (portfolioData[currentPortfolioIndex]) {
		// 	fetch(`${process.env.DB_URL}/api/user/updateTeam/${portfolioData[currentPortfolioIndex].team_id}`, {
		// 		method: 'PATCH',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ team_name: newPortfolioName }),
		// 	})
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			console.log('已更新此投資組合名稱：', data)
		// 			setIsEditNameOpen(false)
		// 		})
		// 		.catch((error) => {
		// 			console.log('error', error)
		// 		})
		// }
	}

	// 新增股票
	const [newStockId, setNewStockId] = useState('1101')

	const handleAddStock = () => {
		// 假設後端回傳的資料格式如下
		const newStockData = {
			stock_name: 'Apple Inc.',
			stock_id: 'AAPL',
			price: 150.0,
			quote_change: 2.0,
			quote_change_percent: 1.33,
			opening_price: 148.0,
			closing_price: 150.0,
			highest_price: 152.0,
			lowest_price: 147.5,
		}

		if (newStockId === '') {
			alert('請選擇您要新增的股票！')
			return
		}

		const updatedPortfolioData = [...portfolioData]
		updatedPortfolioData[currentPortfolioIndex].data = [
			...updatedPortfolioData[currentPortfolioIndex].data,
			newStockData,
		]
		setPortfolioData(generateUniqueIds(updatedPortfolioData))

		// // 🚩新增股票：待檢查
		// if (newStockId === '') {
		// 	alert('請選擇您要新增的股票！')
		// 	return
		// }

		// const teamIdToAddStock = portfolioData[currentPortfolioIndex].team_id

		// fetch('${process.env.DB_URL}/api/user/insertStock', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		team_id: teamIdToAddStock,
		// 		stock_id_array: [{ stock_id: newStockId }],
		// 	}),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		if (data.success) {
		// 			const updatedPortfolioData = [...portfolioData]
		// 			// 假設後端回傳的資料格式如下
		// 			const newStockData = {
		// 				stock_name: data.stock_name,
		// 				stock_id: newStockId,
		// 				price: data.price,
		// 				quote_change: data.quote_change,
		// 				quote_change_percent: data.quote_change_percent,
		// 				opening_price: data.opening_price,
		// 				closing_price: data.closing_price,
		// 				highest_price: data.highest_price,
		// 				lowest_price: data.lowest_price,
		// 			}
		// 			updatedPortfolioData[currentPortfolioIndex].data.push(newStockData)
		// 			setPortfolioData(updatedPortfolioData)
		// 			setNewStockId('')
		// 		} else throw new Error('新增股票失敗！')
		// 	})
		// 	.catch((error) => {
		// 		console.log('error', error)
		// 	})
	}

	// 刪除股票
	const [rowIds, setRowIds] = useState([])
	const handleDeleteStock = () => {
		const updatedPortfolioData = [...portfolioData]

		const updatedRows = rows.filter((row) => !rowIds.includes(row.id))

		updatedPortfolioData[currentPortfolioIndex].data = updatedRows
		setPortfolioData(updatedPortfolioData)
		setRowIds([])

		// // 🚩刪除股票：待檢查
		// const stocksToDelete = rowIds.map((id) => rows.find((row) => row.id === id).stock_id)

		// fetch(`${process.env.DB_URL}/api/user/deleteStock`, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		team_id: portfolioData[currentPortfolioIndex].team_id,
		// 		stock_id_array: stocksToDelete.map((stock_id) => ({ stock_id })),
		// 	}),
		// })
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			const updatedPortfolioData = [...portfolioData]
		// 			const updatedRows = rows.filter((row) => !rowIds.includes(row.id))
		// 			updatedPortfolioData[currentPortfolioIndex].data = updatedRows
		// 			setPortfolioData(updatedPortfolioData)
		// 			setRowIds([])
		// 		} else throw new Error('刪除股票失敗！')
		// 	})
		// 	.catch((error) => {
		// 		console.log('error', error)
		// 	})
	}

	return (
		<StarryBackground className={'w-full pt-6 pb-12 sm:pt-10 sm:pb-20'}>
			<p className='mb-3 text-xs text-zinc-100'>
				<button type='button' onClick={() => router.back()}>
					使用者頁面
				</button>
				／會員投資組合
			</p>
			<Tabs
				variant='scrollable'
				value={tabIndex}
				onChange={handleChange}
				className='bg-white rounded shadow-md dark:bg-zinc-800'
			>
				{portfolioData.map((portfolio, index) => (
					<Tab
						label={portfolio.team_name}
						className={`${
							tabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 `}
						key={index}
					/>
				))}
			</Tabs>
			{portfolioData.length === 0 ? null : (
				<div className='flex items-center justify-end mt-3 mb-8 space-x-1 text-zinc-100'>
					<Button color='inherit' className='text-xs hover:text-zinc-200' onClick={() => setIsAddPortfolioOpen(true)}>
						新增投資組合
					</Button>
					<Dialog maxWidth='xs' open={isAddPortfolioOpen} onClose={() => setIsAddPortfolioOpen(false)} fullWidth>
						<DialogTitle>新增一個投資組合</DialogTitle>
						<DialogContent>
							<Input
								type='text'
								value={newPortfolioName}
								min='1'
								placeholder='輸入您的投資組合名稱'
								onChange={(e) => setNewPortfolioName(e.target.value)}
								fullWidth
								autoFocus
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setIsAddPortfolioOpen(false)}>取消</Button>
							<Button onClick={handleAddPortfolio}>保存</Button>
						</DialogActions>
					</Dialog>
					｜
					<>
						<Button
							color='inherit'
							className='text-xs hover:text-zinc-200'
							onClick={() => setIsDeletePortfolioOpen(true)}
						>
							移除投資組合
						</Button>
						<Dialog open={isDeletePortfolioOpen} onClose={() => setIsDeletePortfolioOpen(false)}>
							<DialogTitle>確定要移除此投資組合嗎？</DialogTitle>
							<DialogActions>
								<Button onClick={handleDeletePortfolio}>確定</Button>
								<Button onClick={() => setIsDeletePortfolioOpen(false)} autoFocus>
									取消
								</Button>
							</DialogActions>
						</Dialog>
						｜
					</>
					<Button color='inherit' className='text-xs hover:text-zinc-200' onClick={() => setIsEditNameOpen(true)}>
						變更投資組合的名稱
					</Button>
					<Dialog maxWidth='xs' open={isEditNameOpen} onClose={() => setIsEditNameOpen(false)} fullWidth>
						<DialogTitle>變更投資組合的名稱</DialogTitle>
						<DialogContent>
							<Input
								type='text'
								value={newPortfolioName}
								min='1'
								placeholder='輸入您要變更的名稱'
								onChange={(e) => setNewPortfolioName(e.target.value)}
								fullWidth
								autoFocus
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setIsEditNameOpen(false)}>取消</Button>
							<Button onClick={handleSaveName}>保存</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
			{portfolioData[currentPortfolioIndex] && (
				<>
					<div className='flex items-center mb-3 dark:text-zinc-800'>
						<StockSelect value={newStockId} onChange={(e) => setNewStockId(e.target.value)} />
						<Button
							size='large'
							startIcon={
								<AddCircleIcon className='text-2xl dark:text-zinc-100 text-sky-400 hover:text-sky-300 dark:hover:opacity-90' />
							}
							onClick={handleAddStock}
						/>
					</div>
					<DataGrid
						sx={{
							pl: 2,
							pr: 3,
							pt: 0.5,
							pb: 1,
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
						rows={rows}
						columns={columns}
						onRowSelectionModelChange={(ids) => setRowIds(ids)}
						className='bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
						checkboxSelection
						hideFooter
						disableRowSelectionOnClick
						disableColumnMenu
					/>
					{rowIds.length !== 0 ? (
						<Button
							size='small'
							color='inherit'
							onClick={handleDeleteStock}
							className='px-4 mt-3 rounded-full dark:text-zinc-800 bg-primary_yellow hover:filter hover:brightness-90'
						>
							刪除股票
						</Button>
					) : null}
				</>
			)}
		</StarryBackground>
	)
}
