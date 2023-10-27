import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, DialogContent, Slide } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import StarryBackground from '@/components/common/StarryBackground'
import SaveButton from '@/components/Light/SaveButton'

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

// DIALOG TRANSITION
const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function Result() {
	const router = useRouter()
	const { category, date } = router.query
	const [dialogOpen, setDialogOpen] = useState(true)

	const handleDialogClose = () => setDialogOpen(false)
	const handleClose = () => router.push('/light')

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-14 md:pb-20'}>
			{/* 先以光明燈呈現預測結果的五檔股票名稱 */}
			<Dialog open={dialogOpen} maxWidth='lg' TransitionComponent={Transition} keepMounted fullWidth>
				<DialogContent className='z-10 flex-col flex-center-between py-6 overflow-x-scroll text-center h-[420px] dark:text-zinc-100 dark:bg-zinc-800'>
				  {/* 先做出一個感覺卡片的框架，但我不太清楚要怎製作出先後出現地效果 */}
					<div className='relative max-w-3xl bg-white shadow-md p-6 mb-5 rounded-3xl h-80 translate-x-5 '>
							<div className='flex align-middle '>
								<div className='relative w-80 shrink-0 h-60 shadow-black-500/50 '>
									<img src="https://img.lovepik.com/photo/40147/0563.jpg_wh300.jpg" alt="" />
								</div>
								<div className='pr-10 text-black'>
									<span className='font-medium'>28 October 2023</span>
									<div className=' text-lg text-black mb-6 block font-bold'>金融股</div>
									<div className='mb-3 leading-7 ml-4'>衷心祝賀您在投資領域的卓越成就，您的智慧和勇氣為我們帶來了成功的新里程碑。願您的投資之路充滿更多成功和繁榮！</div>
									<a href="#" className='inline-flex py-4 px-6 rounded-2xl shadow-md decoration-auto font-medium justify-center text-center tracking-widest bg-gradient-to-r bg-amber-400'>儲存</a>
								</div>
							</div>	
						<div class="praise_card_pagination"></div>
					</div>


					<h3 className='tracking-wider mb-6'>本日光明燈（{category}股）</h3>
					<div className='flex-center'>
						{['台泥', '聯發科', '台積電', '長榮', '華南金'].map((stock, index) => (
							<div className=' lantern lanterntag_container animate-none mb-4' key={index}>
								<div className='laternlight'></div>
								<div className='rounded-t-lg left rounded-b-md'></div>
								<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }}>
								</div>
								<div className='lantern-flame'></div>
								<div className='absolute inset-x-0 top-10 right-6'>
									<h3 className='pl-8 font-bold tracking-widest text-zinc-100 '>{stock}</h3>
								</div>
							</div>
						))}
					</div>
					<Button
						type='submit'
						size='large'
						onClick={handleDialogClose}
						className='px-24 my-4 rounded-full text-zinc-100 bg-secondary_blue hover:bg-sky-500'
					>
						查看詳情
					</Button>
				</DialogContent>
			</Dialog>
			<div className='px-4 pt-6 pb-12 bg-white rounded sm:px-8 lg:px-10 dark:bg-zinc-900/50'>
				<div className='inline-flex items-start justify-between w-full'>
					<h3 className='inline-flex items-end mb-6 tracking-wider'>
						天氣型態<span className='ml-2 text-sm opacity-60'>{date}</span>
					</h3>
					<CloseIcon className='-mr-4 cursor-pointer opacity-80 hover:opacity-60' onClick={handleClose} />
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
				<p className='mb-12 text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				<SaveButton />
			</div>
		</StarryBackground>
	)
}
