import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import SaveButton from '@/components/Light/SaveButton'
import StarryBackground from '@/components/common/StarryBackground'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CloseIcon from '@mui/icons-material/Close'
import { Button, Dialog, DialogContent, Slide } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (!session)
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	else return { props: { user: session.user } }
}

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
	{
		field: 'detail',
		headerName: '',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			return <button className='px-3 py-1.5 text-xs rounded-full bg-secondary_blue'>{value}</button>
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

	const [dialogOpen, setDialogOpen] = useState(false)

	const handleDialogClose = () => setDialogOpen(false)

	const handleClose = () => router.push('/light')

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-14 md:pb-20'}>
			{/* 先以光明燈呈現預測結果的五檔股票名稱 */}
			<Dialog open={dialogOpen} maxWidth='md' TransitionComponent={Transition} keepMounted fullWidth>
				<DialogContent className='z-10 flex-col flex-center-between p-6 overflow-x-scroll overflow-y-hidden text-center h-[450px] dark:text-zinc-100 dark:bg-zinc-800'>
					<h3 className='tracking-wider'>本日光明燈（{category}股）</h3>
					<div className='flex-center'>
						{['台泥', '聯發科', '台積電', '長榮', '華南金'].map((stock, index) => (
							<div className=' lantern lanterntag_container animate-none' key={index}>
								<div className='laternlight'></div>
								<div className='rounded-t-lg left rounded-b-md'></div>
								<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }}>
									<h3 className='pl-8 font-bold tracking-widest text-zinc-100'>{stock}</h3>
								</div>
								<div className='flame'></div>
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
							detail: '詳細數據',
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
							detail: '詳細數據',
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
							detail: '詳細數據',
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
							detail: '詳細數據',
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
							detail: '詳細數據',
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
