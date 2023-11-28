import StarryBackground from '@/components/common/StarryBackground'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Tab, Tabs } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import router from 'next/router'
import { useEffect, useState } from 'react'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	if (currentURL.includes(session.user.user_id)) return { props: { user: session.user } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

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
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
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
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
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
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
	{
		field: 'closing_price',
		headerName: '收盤價',
		headerAlign: 'right',
		align: 'right',
		sortable: true,
		flex: 1,
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
	{
		field: 'highest_price',
		headerName: '最高價',
		headerAlign: 'right',
		align: 'right',
		sortable: true,
		flex: 1,
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
	{
		field: 'lowest_price',
		headerName: '最低價',
		headerAlign: 'right',
		align: 'right',
		sortable: true,
		flex: 1,
		// valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
]

export default function Portfolio() {
	const [tabIndex, setTabIndex] = useState(0)
	const [groupData, setGroupData] = useState([])
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const [rows, setRows] = useState([])

	const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
	const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false)
	const [isEditNameOpen, setIsEditNameOpen] = useState(false)
	const [newGroupName, setNewGroupName] = useState('')
	const [newStockId, setNewStockId] = useState('1101')
	const [rowIds, setRowIds] = useState([])

	const handleChange = (e, index) => setTabIndex(index)

	useEffect(() => {
		setTabIndex(0)
		getGroup()
	}, [])

	useEffect(() => {
		if (groupData[currentGroupIndex]) setRows(groupData[currentGroupIndex].data)
		else setRows([])
	}, [currentGroupIndex, groupData])

	// 為每檔股票資料加上 unique id 以呈現在表格上
	const generateUniqueIds = (data) => {
		let idCounter = 1
		return data.map((item) => {
			return {
				...item,
				data: item.data.map((row) => ({
					...row,
					id: idCounter++,
				})),
			}
		})
	}

	// 取得投資組合
	const getGroup = () => {
		fetch(`${process.env.DB_URL}/api/user/getGroup`)
			.then((response) => response.json())
			.then((response_data) => {
				console.log('投資組合: ', response_data.data[0])
				setGroupData(generateUniqueIds(response_data.data))
			})
			.catch((error) => {
				console.error('error', error)
			})
	}

	// 新增投資組合
	const handleAddGroup = () => {
		if (newGroupName === '') {
			alert('請輸入您要新增的投資組合名稱！')
			return
		}

		fetch(`${process.env.DB_URL}/api/user/createGroup`, {
			method: 'POST',
			body: JSON.stringify({
				stock_id_array: ['1101'], // 無法為空，所以新增投資組合時，須先預設一檔股票。
				group_name: newGroupName,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) {
					getGroup()
					setNewGroupName('')
					setIsAddGroupOpen(false)
				} else alert('新增投資組合失敗！')
			})
			.catch((error) => {
				console.error('error', error)
			})
	}

	// 移除投資組合
	const handleDeleteGroup = (groupName) => {
		fetch(`${process.env.DB_URL}/api/user/deleteGroup`, {
			method: 'DELETE',
			body: JSON.stringify({
				group_name: groupName,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) {
					getGroup()
					setCurrentGroupIndex(0)
					setIsDeleteGroupOpen(false)
				} else alert('移除失敗！')
			})
			.catch((error) => {
				console.error('error', error)
			})
	}

	// 編輯投資組合名稱
	const handleSaveName = () => {
		if (newGroupName === '') {
			alert('請輸入您要變更的名稱！')
			return
		}

		if (groupData[currentGroupIndex]) {
			fetch(`${process.env.DB_URL}/api/user/updateGroup`, {
				method: 'PATCH',
				body: JSON.stringify({
					old_group_name: groupData[currentGroupIndex].data.group_name,
					new_group_name: newGroupName,
					stock_id_array: groupData[currentGroupIndex].data.map((row) => row.stock_id),
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => {
					if (res.status === 200) {
						handleDeleteGroup(groupData[currentGroupIndex].group_name) // 刪除舊的投資組合
						setIsEditNameOpen(false)
					}
				})
				.catch((error) => {
					console.error('error', error)
				})
		}
	}

	// 新增股票
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

		const updatedGroupData = [...groupData]
		updatedGroupData[currentGroupIndex].data = [...updatedGroupData[currentGroupIndex].data, newStockData]
		setGroupData(generateUniqueIds(updatedGroupData))

		// if (newStockId === '') {
		// 	alert('請選擇您要新增的股票！')
		// 	return
		// }

		// const teamIdToAddStock = groupData[currentGroupIndex].team_id

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
		// 			const updatedGroupData = [...groupData]
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
		// 			updatedGroupData[currentGroupIndex].data.push(newStockData)
		// 			setGroupData(updatedGroupData)
		// 			setNewStockId('')
		// 		} else throw new Error('新增股票失敗！')
		// 	})
		// 	.catch((error) => {
		// 		console.error('error', error)
		// 	})
	}

	// 刪除股票
	const handleDeleteStock = () => {
		const updatedGroupData = [...groupData]

		const updatedRows = rows.filter((row) => !rowIds.includes(row.id))

		updatedGroupData[currentGroupIndex].data = updatedRows
		setGroupData(updatedGroupData)
		setRowIds([])

		// const stocksToDelete = rowIds.map((id) => rows.find((row) => row.id === id).stock_id)

		// fetch(`${process.env.DB_URL}/api/user/deleteStock`, {
		// 	method: 'DELETE',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		team_id: groupData[currentGroupIndex].team_id,
		// 		stock_id_array: stocksToDelete.map((stock_id) => ({ stock_id })),
		// 	}),
		// })
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			const updatedGroupData = [...groupData]
		// 			const updatedRows = rows.filter((row) => !rowIds.includes(row.id))
		// 			updatedGroupData[currentGroupIndex].data = updatedRows
		// 			setGroupData(updatedGroupData)
		// 			setRowIds([])
		// 		} else throw new Error('刪除股票失敗！')
		// 	})
		// 	.catch((error) => {
		// 		console.error('error', error)
		// 	})
	}

	return (
		<StarryBackground className={'w-full pt-6 pb-12 sm:pt-10 sm:pb-20'}>
			<p className='mb-3 text-xs text-zinc-100'>
				<button type='button' onClick={() => router.back()}>
					使用者頁面
				</button>
				/ 會員投資組合
			</p>
			<Tabs
				variant='scrollable'
				value={tabIndex}
				onChange={handleChange}
				className='bg-white rounded shadow-md dark:bg-zinc-800'
			>
				{groupData &&
					groupData.map((group, index) => (
						<Tab
							label={group.group_name}
							className={`${
								tabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
							} hover:bg-sky-300/10 `}
							key={index}
						/>
					))}
			</Tabs>
			{/* 投資組合功能按鈕組 */}
			<div className='flex items-center justify-end mt-3 mb-8 space-x-1 text-zinc-100'>
				<Button color='inherit' className='text-xs hover:text-zinc-200' onClick={() => setIsAddGroupOpen(true)}>
					新增投資組合
				</Button>
				<Dialog maxWidth='xs' open={isAddGroupOpen} onClose={() => setIsAddGroupOpen(false)} fullWidth>
					<DialogTitle>新增一個投資組合</DialogTitle>
					<DialogContent>
						<Input
							type='text'
							value={newGroupName}
							min='1'
							placeholder='輸入您的投資組合名稱'
							onChange={(e) => setNewGroupName(e.target.value)}
							fullWidth
							autoFocus
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setIsAddGroupOpen(false)}>取消</Button>
						<Button onClick={handleAddGroup}>保存</Button>
					</DialogActions>
				</Dialog>
				{groupData && (
					<>
						｜
						<>
							<Button
								color='inherit'
								className='text-xs hover:text-zinc-200'
								onClick={() => setIsDeleteGroupOpen(true)}
							>
								移除投資組合
							</Button>
							<Dialog open={isDeleteGroupOpen} onClose={() => setIsDeleteGroupOpen(false)}>
								<DialogTitle>確定要移除此投資組合嗎？</DialogTitle>
								<DialogActions>
									<Button onClick={() => handleDeleteGroup(groupData[currentGroupIndex].group_name)}>確定</Button>
									<Button onClick={() => setIsDeleteGroupOpen(false)} autoFocus>
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
									value={newGroupName}
									min='1'
									placeholder='輸入您要變更的名稱'
									onChange={(e) => setNewGroupName(e.target.value)}
									fullWidth
									autoFocus
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setIsEditNameOpen(false)}>取消</Button>
								<Button onClick={handleSaveName}>保存</Button>
							</DialogActions>
						</Dialog>
					</>
				)}
			</div>
			{groupData[currentGroupIndex] && (
				<>
					<div className='flex items-center mb-3 dark:text-zinc-800'>
						<Autocomplete
							options={stock150.map((stock) => `${stock.id} ${stock.name}`)}
							defaultValue={`${stock150[0].id} ${stock150[0].name}`}
							sx={{ width: 192 }}
							size='small'
							renderInput={(params) => <TextField {...params} label='搜尋台股代號／名稱' />}
							onChange={(e, newValue) => setNewStockId(parseInt(newValue))}
							disableClearable
							disablePortal
						/>
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
