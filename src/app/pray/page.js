'use client'

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	Popover,
	TextField,
	Tooltip,
} from '@mui/material'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import StockSelect from '@/components/ui/StockSelect'
import stock100 from '@/data/stock100.json'

export default function PrayBoard() {
	const { data: session, status } = useSession()
	const token = session?.token

	const [lightData, setLightData] = useState([])
	const [anchorEl, setAnchorEl] = useState(null)
	const [selectedLightData, setSelectedLightData] = useState(null)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [isSucceed, setIsSucceed] = useState(false)
	const [selectedStockId, setSelectStockId] = useState(1101)
	const [formData, setFormData] = useState({
		name: '',
		message: '',
	})
	const { name, message } = formData

	// 取得點燈資訊
	const fetchLight = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/all/light`, {
				method: 'GET',
			})

			const data = await response.json()
			if (data.success) setLightData(data.data)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	// 查看點燈資訊
	const handleLightData = (e, light) => {
		setSelectedLightData(light)
		setAnchorEl(anchorEl ? null : e.currentTarget)
	}

	// 開啟點燈填單
	const handleOpenForm = () => {
		if (status === 'unauthenticated') alert('點燈請先登入！')
		else if (session?.provider === 'facebook' || session?.provider === 'google')
			alert('抱歉，目前暫不提供社交登入的會員使用祈福功能！')
		else setIsFormOpen(true)
	}

	// 點燈
	const handlePray = async () => {
		if (name === '') alert('請輸入姓名！')
		else if (message === '') alert('請輸入祈福語！')

		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/create/light`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
					stock_id: selectedStockId,
					name,
					message,
				}),
			})

			const data = await response.json()
			if (data.success) {
				setIsFormOpen(false)
				setFormData({
					name: '',
					gender: '',
					birthday: '',
					message: '',
				})
				setIsSucceed(true)
				setTimeout(() => {
					fetchLight()
					setIsSucceed(false)
				}, 1500)
			}
		} catch (error) {
			console.error('Error: ', error)
		} finally {
		}
	}

	const renderLanternsForLayout = (lightData) => {
		const lanterns = []
		for (let i = 0; i < 10 - lightData.length; i++) lanterns.push(<Lantern position='' isLighted={false} key={i} />)
		return lanterns
	}

	useEffect(() => {
		fetchLight()
	}, [])

	return (
		<StarryBackground className='flex-col h-screen pt-5 pb-12 flex-center-between'>
			{/* 目前先設定可以放 30 盞燈 */}
			<div className='w-full space-y-6 overflow-x-auto'>
				<LanternLayout
					isLighted={false}
					otherStyle='flex-center justify-start -space-x-12 w-fit border-b-[10px] border-stone-800'
				>
					{lightData.slice(0, 10).map((light, index) => (
						<button type='button' onClick={(e) => handleLightData(e, light)} onMouseLeave={() => setAnchorEl(null)}>
							<Lantern
								position=''
								label=''
								isLighted={true}
								otherStyle='justify-start flex-center -space-x-12 w-fit border-b-[10px] border-stone-800'
								key={index}
							/>
						</button>
					))}
					{renderLanternsForLayout(lightData.slice(0, 10))}
				</LanternLayout>
				<LanternLayout
					isLighted={false}
					otherStyle='flex-center justify-start -space-x-12 w-fit border-b-[10px] border-stone-800'
				>
					{lightData.slice(10, 20).map((light, index) => (
						<button type='button' onClick={(e) => handleLightData(e, light)}>
							<Lantern
								position=''
								label=''
								isLighted={true}
								otherStyle='justify-start flex-center -space-x-12 w-fit border-b-[10px] border-stone-800'
								key={index}
							/>
						</button>
					))}
					{renderLanternsForLayout(lightData.slice(10, 20))}
				</LanternLayout>
				<LanternLayout
					isLighted={false}
					otherStyle='flex-center justify-start -space-x-12 w-fit border-b-[10px] border-stone-800'
				>
					{lightData.slice(20, 30).map((light, index) => (
						<button type='button' onClick={(e) => handleLightData(e, light)}>
							<Lantern
								position=''
								label=''
								isLighted={true}
								otherStyle='justify-start flex-center -space-x-12 w-fit border-b-[10px] border-stone-800'
								key={index}
							/>
						</button>
					))}
					{renderLanternsForLayout(lightData.slice(20, 30))}
				</LanternLayout>
			</div>
			{/* 祈福內容 */}
			{selectedLightData && (
				<Popover
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					sx={{
						pointerEvents: 'none',
						'& .MuiPopover-paper': {
							borderRadius: '8px',
							boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
							fontSize: '0.875rem',
							padding: '0.5rem 0.875rem 1rem',
							width: 'fit-content',
							marginTop: '-0.5rem',
						},
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					onClose={() => setAnchorEl(null)}
					disableRestoreFocus
				>
					<p>{selectedLightData.name}：</p>
					<div className='gap-1.5 mb-2 flex-center'>
						<p className='px-2 text-xs h-7 flex-center space-x-1 border-red-500 text-red-500 bg-white border-[1.25px] rounded-full'>
							<span>{stock100.find((stock) => stock.stock_id === selectedLightData.stock_id).name}</span>
							<span>{selectedLightData.stock_id}</span>
						</p>
						<p>{selectedLightData.message}</p>
					</div>
					<p className='flex justify-end text-xs opacity-60'>
						{dayjs(selectedLightData.create_date).format('YYYY/MM/DD')}
					</p>
				</Popover>
			)}
			{/* 提示登入 */}
			<Tooltip
				disableHoverListener={
					status !== 'unauthenticated' && session?.provider !== 'facebook' && session?.provider !== 'google'
				}
				title='點燈前請先移至右上方登入，且目前暫不提供社交登入的會員使用祈福功能！'
				placement='top-start'
				// 無法直接用 sx
				componentsProps={{
					tooltip: {
						sx: {
							color: '#40B4FF',
							backgroundColor: '#fff',
							border: '1px solid #40B4FF',
							borderRadius: '8px',
							fontSize: '0.8rem',
							margin: '0 0 0 7rem',
							lineHeight: '1.25rem',
						},
					},
					arrow: {
						sx: {
							color: '#fff',
						},
					},
				}}
				arrow
			>
				<button className='pray-btn' onClick={handleOpenForm}>
					點亮一盞光明燈
				</button>
			</Tooltip>
			{/* 點燈填單 */}
			<Dialog open={isFormOpen} maxWidth='xs' fullWidth>
				<DialogTitle className='space-y-1 dark:text-zinc-100 dark:bg-zinc-700'>
					<h2 className='tracking-wide'>光明燈</h2>
					<hr className='border-2 w-28 border-primary_yellow' />
					<p className='pt-2 text-base font-normal'>祈求投資之路順利、財源滾滾</p>
				</DialogTitle>
				<DialogContent className='flex flex-col dark:bg-zinc-700'>
					<FormControl>
						<FormLabel className='mb-2 dark:text-zinc-100 text-zinc-800'>姓名</FormLabel>
						<TextField
							type='name'
							value={name}
							className='rounded dark:bg-zinc-900'
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							inputProps={{ maxLength: 10, className: 'dark:text-zinc-100' }}
							size='small'
							required
						/>

						<FormLabel className='mt-5 mb-2 dark:text-zinc-100 text-zinc-800'>您要祈福的股票</FormLabel>
						<StockSelect setSelect={setSelectStockId} />
						<FormLabel className='mt-5 mb-2 dark:text-zinc-100 text-zinc-800'>祈福語</FormLabel>
						<TextField
							type='name'
							value={message}
							onChange={(e) => setFormData({ ...formData, message: e.target.value })}
							size='small'
							multiline
							rows={5}
							className='rounded dark:bg-zinc-900'
							inputProps={{ maxLength: 100, className: 'dark:text-zinc-100' }}
						/>
						<p className='mt-1.5 text-xs dark:text-zinc-300'>最多 100 字</p>
					</FormControl>
				</DialogContent>
				<DialogActions className='dark:bg-zinc-700'>
					<Button
						sx={{
							'&:hover': {
								backgroundColor: 'transparent',
							},
						}}
						className='text-zinc-800 dark:text-zinc-100'
						onClick={() => setIsFormOpen(false)}
					>
						取消
					</Button>
					<Button
						sx={{
							'&:hover': {
								backgroundColor: 'transparent',
							},
						}}
						className='text-zinc-800 dark:text-zinc-100'
						onClick={handlePray}
					>
						送出祈福
					</Button>
				</DialogActions>
			</Dialog>
			{/* 祈福成功通知 */}
			<Dialog open={isSucceed} align='center' onClose={() => setIsSucceed(false)}>
				<DialogTitle className='dark:text-zinc-100 dark:bg-zinc-800'>祈福成功</DialogTitle>
				<DialogContent className='dark:text-zinc-100 dark:bg-zinc-800'>
					<Image src='/assets/success-symbol.svg' width={96} height={96} alt='success' className='block mx-auto mb-5' />
					<p>即將為您點亮一盞光明燈</p>
				</DialogContent>
			</Dialog>
		</StarryBackground>
	)
}
