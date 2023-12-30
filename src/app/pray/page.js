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

	const [isTempleAnimated, setIsTempleAnimated] = useState(true)

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

	useEffect(() => {
		fetchLight()
		setTimeout(() => setIsTempleAnimated(false), 3000)
	}, [])

	return (
		<StarryBackground className='flex-col h-screen flex-center-between'>
			{isTempleAnimated && (
				<div className='z-30 door'>
					<Image
						src='/assets/light/temple-gate-l.png'
						width={400}
						height={400}
						className='absolute left-0 object-fill h-full max-w-[50%] leftDoor'
						alt='temple'
					/>
					<Image
						src='/assets/light/temple-gate-r.png'
						width={400}
						height={400}
						className='absolute right-0 object-fill h-full max-w-[50%] rightDoor'
						alt='temple'
					/>
				</div>
			)}
			{/* 目前先設定可以放 30 盞燈 */}
			<LanternLayout otherStyle={`${isTempleAnimated ? 'absolute' : ''} pt-8`}>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[0])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute -top-10 left-10'
						label={lightData[0]?.name}
						isHovered={lightData[0] !== undefined}
						isLighted={lightData[0] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[1])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute -top-12 right-48'
						label={lightData[1]?.name}
						isHovered={lightData[1] !== undefined}
						isLighted={lightData[1] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[2])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-32 left-6'
						label={lightData[2]?.name}
						isHovered={lightData[2] !== undefined}
						isLighted={lightData[2] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[3])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-72 -left-12'
						label={lightData[3]?.name}
						isHovered={lightData[3] !== undefined}
						isLighted={lightData[3] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[4])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-64 left-40'
						label={lightData[4]?.name}
						isHovered={lightData[4] !== undefined}
						isLighted={lightData[4] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[5])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-[400px] left-24'
						label={lightData[5]?.name}
						isHovered={lightData[5] !== undefined}
						isLighted={lightData[5] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[6])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-8 left-48'
						label={lightData[6]?.name}
						isHovered={lightData[6] !== undefined}
						isLighted={lightData[6] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[7])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute -top-6 left-88'
						label={lightData[7]?.name}
						isHovered={lightData[7] !== undefined}
						isLighted={lightData[7] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[8])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-52 left-80'
						label={lightData[8]?.name}
						isHovered={lightData[8] !== undefined}
						isLighted={lightData[8] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[9])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-[480px] left-72'
						label={lightData[9]?.name}
						isHovered={lightData[9] !== undefined}
						isLighted={lightData[9] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[10])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute -top-4 right-[500px]'
						label={lightData[10]?.name}
						isHovered={lightData[10] !== undefined}
						isLighted={lightData[10] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[11])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-20 left-[500px]'
						label={lightData[11]?.name}
						isHovered={lightData[11] !== undefined}
						isLighted={lightData[11] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[12])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-72 left-[500px]'
						label={lightData[12]?.name}
						isHovered={lightData[12] !== undefined}
						isLighted={lightData[12] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[13])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute top-[450px] left-[450px]'
						label={lightData[13]?.name}
						isHovered={lightData[13] !== undefined}
						isLighted={lightData[13] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[14])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-4 -top-4'
						label={lightData[14]?.name}
						isHovered={lightData[14] !== undefined}
						isLighted={lightData[14] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[15])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute -right-10 top-36'
						label={lightData[15]?.name}
						isHovered={lightData[15] !== undefined}
						isLighted={lightData[15] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[16])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-0 top-96'
						label={lightData[16]?.name}
						isHovered={lightData[16] !== undefined}
						isLighted={lightData[16] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[17])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-28 top-[480px]'
						label={lightData[17]?.name}
						isHovered={lightData[17] !== undefined}
						isLighted={lightData[17] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[18])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-24 top-44'
						label={lightData[18]?.name}
						isHovered={lightData[18] !== undefined}
						isLighted={lightData[18] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[19])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-40 top-88'
						label={lightData[19]?.name}
						isHovered={lightData[19] !== undefined}
						isLighted={lightData[19] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[20])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-64 top-[500px]'
						label={lightData[20]?.name}
						isHovered={lightData[20] !== undefined}
						isLighted={lightData[20] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[21])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-60 top-32'
						label={lightData[21]?.name}
						isHovered={lightData[21] !== undefined}
						isLighted={lightData[21] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[22])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-96 top-10'
						label={lightData[22]?.name}
						isHovered={lightData[22] !== undefined}
						isLighted={lightData[22] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[23])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-88 top-64'
						label={lightData[23]?.name}
						isHovered={lightData[23] !== undefined}
						isLighted={lightData[23] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[24])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-[385px] top-[420px]'
						label={lightData[24]?.name}
						isHovered={lightData[24] !== undefined}
						isLighted={lightData[24] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[25])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-[480px] top-48'
						label={lightData[25]?.name}
						isHovered={lightData[25] !== undefined}
						isLighted={lightData[25] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[26])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-[520px] top-80'
						label={lightData[26]?.name}
						isHovered={lightData[26] !== undefined}
						isLighted={lightData[26] !== undefined}
					/>
				</button>
				<button
					type='button'
					className='relative'
					onClick={(e) => handleLightData(e, lightData[27])}
					onMouseLeave={() => setAnchorEl(null)}
				>
					<Lantern
						position='absolute right-[525px] top-[500px]'
						label={lightData[27]?.name}
						isHovered={lightData[27] !== undefined}
						isLighted={lightData[27] !== undefined}
					/>
				</button>
			</LanternLayout>
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
							color: '#3D4664',
							backgroundColor: '#fff',
							border: '1px solid #3D4664',
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
				{!isTempleAnimated && (
					<button className='mb-8 pray-btn' onClick={handleOpenForm}>
						點亮一盞光明燈
					</button>
				)}
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
