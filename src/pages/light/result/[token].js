import AddIcon from '@mui/icons-material/Add'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import Fab from '@mui/material/Fab'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'
import Card from '@/components/Light/Card'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import StarryBackground from '@/components/common/StarryBackground'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

const columns = [
	{ field: 'stock_id', headerName: '代號', flex: 1 },
	{ field: 'stock_name', headerName: '股票', flex: 1 },
	{
		field: 'price',
		headerName: '股價',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
		cellClassName: (params) => {
			const changeValue = params.row.quote_change || 0
			return changeValue > 0 ? 'text-stock_red' : changeValue < 0 ? 'text-stock_green' : ''
		},
	},
	{
		field: 'quote_change_percent',
		headerName: '漲跌幅 (%)',
		headerAlign: 'right',
		align: 'right',
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
			} else return `${value.toFixed(2)}%`
		},
	},
	{
		field: 'week_quote_change_percent',
		headerName: '週漲跌幅(％)',
		headerAlign: 'right',
		align: 'right',
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
			} else return `${value.toFixed(2)}%`
		},
	},
	{
		field: 'volume',
		headerName: '交易量',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => {
			const volume = params.value || 0
			return volume.toLocaleString()
		},
	},
	{
		field: 'correlation',
		headerName: '相關係數',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
	{
		field: 'predict_change_percent',
		headerName: '預測漲跌率(％)',
		headerAlign: 'right',
		align: 'right',
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
			} else return `${value.toFixed(2)}%`
		},
	},
]

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	return { props: { user: session.user } }
}

// DIALOG TRANSITION
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function Result({ user }) {
	const router = useRouter()
	const { category, date } = router.query

	const [envelopeDialog, setEnvelopeDialogOpen] = useState(true)
	const [cardDialogOpen, setCardDialogOpen] = useState(false)
	const [laternDialogOpen, setLaternDialogOpen] = useState(false)

	const handleEnvelopeDialog = () => setEnvelopeDialogOpen(!envelopeDialog)
	const handleCardDialog = () => setCardDialogOpen(!cardDialogOpen)
	const handleLaternDialog = () => setLaternDialogOpen(!laternDialogOpen)

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-12 md:pb-20'}>
			<p className='mb-2 text-sm tracking-wider text-zinc-100'>
				<Link href='/light'>我要點燈</Link> / 分析結果
			</p>
			{/* 之後放「重新打開自己的小卡」功能，怕用戶沒存到。 */}
			<Fab className='fixed bottom-4 right-6 bg-sky-400 hover:bg-secondary_blue'>
				<AddIcon onClick={handleEnvelopeDialog} />
			</Fab>
			{/* 祈福小卡信封 */}
			<Dialog
				open={envelopeDialog}
				TransitionComponent={Transition}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<DialogContent className='w-[600px] h-[63vw] md:h-[500px]'>
					<div className='absolute w-full h-full flex-center -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>
						{/* 信封 - 三角形 */}
						<div className='absolute w-full h-full -z-10'>
							<div className='border-b-[212px] border-b-white border-x-[40vw] md:border-x-[300px] border-x-transparent' />
						</div>
						<div
							className='absolute text-center cursor-pointer flex pt-5 flex-col w-[540px] h-72 rounded bg-primary_yellow duration-500 ease-out z-10 bottom-20 hover:bottom-32'
							onClick={() => {
								handleEnvelopeDialog()
								handleCardDialog()
							}}
						>
							<h2>打開小卡...</h2>
						</div>
						<div className='absolute w-full h-full overflow-hidden'>
							<div className='absolute flex flex-col justify-between pt-28 text-sm text-zinc-500 px-3 pb-2 w-[600px] h-72 bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.5)] z-20 bottom-0'>
								<h3 className='text-5xl text-center'>{category}類祈福小卡</h3>
								<div className='flex items-end justify-between'>
									<div>
										<p>{user.user_id}</p>
										<p>{user.email}</p>
									</div>
									<p className='opacity-50'>{date}</p>
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			{/* 祈福小卡內容 */}
			<Dialog
				open={cardDialogOpen}
				maxWidth='md'
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
				fullWidth
			>
				<DialogContent className='text-center dark:text-zinc-100 dark:bg-zinc-800'>
					<Card/>
					<SubmitBtn
						text='查看本日光明燈'
						handleSubmit={() => {
							handleCardDialog()
							handleLaternDialog()
						}}
						style='mt-3 py-2.5'
					/>
				</DialogContent>
			</Dialog>
			{/* 先以光明燈呈現預測結果的五檔股票名稱 */}
			<Dialog open={laternDialogOpen} maxWidth='lg' fullWidth>
				<DialogTitle className='mt-4 mb-8 text-2xl text-center'>本日光明燈 － {category}股</DialogTitle>
				<DialogContent className='flex-col overflow-x-scroll text-center flex-center-between h-88 dark:text-zinc-100'>
					<div className='text-black flex-center'>
						{['台泥', '聯發科', '台積電', '長榮', '華南金'].map((stock, index) => (
							<div>
								<div className='mb-5 lantern lanterntag_container animate-none' key={index}>
									<div className='laternlight'></div>
									<div className='rounded-t-lg left rounded-b-md'></div>
									<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }}></div>
									<div className='lantern-flame'></div>
									<div className='absolute inset-x-0 top-10 right-6'></div>
								</div>
								<h3 className='font-semibold tracking-widest'>{stock}</h3>
							</div>
						))}
					</div>
					<SubmitBtn text='查看分析結果' handleSubmit={handleLaternDialog} style='my-4 py-2.5' />
				</DialogContent>
			</Dialog>
			{/* 最後分析的圖表、數據 */}
			<div className='px-4 pt-6 pb-12 bg-white rounded sm:px-8 lg:px-10 dark:bg-zinc-900/50'>
				<div className='inline-flex items-start justify-between w-full'>
					<h3 className='inline-flex items-end mb-6 tracking-wider'>
						天氣型態<span className='ml-2 text-sm opacity-60'>{date}</span>
					</h3>
				</div>
				<Chart option={multiLineOption()} customHeight={'h-72 sm:h-80 md:h-88 lg:h-96 xl:h-[520px]'} />
				<DataGrid
					sx={{
						my: 4,
						mb: 2,
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
					rows={[
						{
							id: 1,
							stock_id: '1101',
							stock_name: '台泥',
							price: 34,
							quote_change_percent: 2.26,
							week_quote_change_percent: 0.38,
							volume: 32099068,
							correlation: -0.019,
							predict_change_percent: 0.38,
						},
						{
							id: 2,
							stock_id: '2330',
							stock_name: '台積電',
							price: 532,
							quote_change_percent: 4.26,
							week_quote_change_percent: 1.124,
							volume: 32099068,
							correlation: -0.02,
							predict_change_percent: 2.543,
						},
						{
							id: 3,
							stock_id: '2603',
							stock_name: '長榮',
							price: 150.5,
							quote_change_percent: -0.33,
							week_quote_change_percent: 0.823,
							volume: 15244624,
							correlation: -0.02,
							predict_change_percent: 1.0021,
						},
						{
							id: 4,
							stock_id: '2454',
							stock_name: '聯發科',
							price: 698,
							quote_change_percent: 1.31,
							week_quote_change_percent: 3.172,
							volume: 4968629,
							correlation: 0.00125,
							predict_change_percent: -0.1211,
						},
						{
							id: 5,
							stock_id: '2880',
							stock_name: '華南金',
							price: 22.75,
							quote_change_percent: 0.952,
							week_quote_change_percent: 0.89,
							volume: 15869113,
							correlation: 0.0167,
							predict_change_percent: 1.1379,
						},
					]}
					columns={columns}
					onRowSelectionModelChange={(ids) => setRowIds(ids)}
					className='bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
					checkboxSelection
					hideFooter
					disableRowSelectionOnClick
					disableColumnMenu
				/>
				<p className='text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				<SaveBtn />
			</div>
		</StarryBackground>
	)
}

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SaveBtn = () => {
	const [open, setOpen] = useState(false)

	// 🚩 保存點燈紀錄至資料庫
	const handleSave = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<Stack>
			<SubmitBtn text='保存分析結果' handleSubmit={handleSave} style='mt-16 py-3' />
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					保存成功！
				</Alert>
			</Snackbar>
		</Stack>
	)
}
