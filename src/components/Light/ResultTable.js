import {
	Box,
	Dialog,
	DialogContent,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import LinearRegChart from './Analysis/LinearRegChart'

export default function ResultTable() {
	// 數據，目前先呈現五檔(預測漲跌亂寫的)
	const data = [
		createData(2330, '台積電', 532, 0.38, 7.26, 3.2, 32099068, -0.0193),
		createData(2454, '聯發科', 698, 1.31, 3.71, 0.92, 4968629, -0.1211),
		createData(2603, '長榮', 150.5, -0.33, -1.31, 0.12, 15244624, 0.4775),
		createData(2880, '華南金', 22.75, 0.89, 3.88, -1.84, 15869113, -0.1379),
		createData(3008, '大立光', 2260, 2.26, 7.88, 4.3, 843935, -0.5256),
	]

	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const visibleRows = useMemo(() => stableSort(data, getComparator(order, orderBy)), [order, orderBy])

	const [selectedSymbol, setSelectedSymbol] = useState('')
	const [open, setOpen] = useState(false)

	const handleClickOpen = (symbol) => {
		setSelectedSymbol(symbol)
		setOpen(true)
	}
	const handleClose = () => setOpen(false)

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								return (
									<TableRow key={row.symbol} className='[&:nth-child(odd)]:bg-secondary_blue/5'>
										<TableCell align='right' component='th' scope='row'>
											{row.symbol}
										</TableCell>
										<TableCell align='left'>{row.name}</TableCell>
										<TableCell align='right'>{row.price.toFixed(2)}</TableCell>
										<TableCell align='right'>
											<span className={(row.up_down.day >= 0 ? 'text-stock_red' : 'text-stock_green') + ' font-medium'}>
												{(row.up_down.day >= 0 ? '▲ ' : '▼ ') + row.up_down.day.toFixed(2)}
											</span>
										</TableCell>
										<TableCell align='right'>
											<span
												className={(row.up_down.week >= 0 ? 'text-stock_red' : 'text-stock_green') + ' font-medium'}
											>
												{(row.up_down.week >= 0 ? '▲ ' : '▼ ') + row.up_down.week.toFixed(2)}
											</span>
										</TableCell>
										<TableCell align='right'>{row.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
										<TableCell align='right'>{row.correlation.toFixed(4)}</TableCell>
										<TableCell align='right'>
											<span
												className={(row.up_down.predict >= 0 ? 'text-stock_red' : 'text-stock_green') + ' font-medium'}
											>
												{(row.up_down.predict >= 0 ? '▲ ' : '▼ ') + row.up_down.predict.toFixed(2)}
											</span>
										</TableCell>
										<TableCell align='right'>
											<button
												className='px-3 py-1 text-xs text-white rounded-full bg-secondary_blue'
												onClick={() => handleClickOpen(row.symbol, row.name)}
											>
												詳細數據
											</button>
										</TableCell>
										<DetailDialog open={open} symbol={selectedSymbol} handleClose={handleClose} />
									</TableRow>
								)
							})}
							{
								<TableRow>
									<TableCell colSpan={6} />
								</TableRow>
							}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

function DetailDialog(props) {
	const { open, symbol, handleClose } = props

	return (
		<Dialog
			open={open}
			fullWidth={true}
			maxWidth='md'
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<IconButton className='absolute w-10 top-2 left-[850px]' onClick={handleClose}>
				<svg
					className='w-6 h-6'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					aria-hidden='true'
				>
					<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
				</svg>
			</IconButton>
			<DialogContent className='h-[480px] px-4 space-y-4 text-center'>
				<LinearRegChart
					tab={{
						label: '氣溫',
						isExplain: false,
						explanation: '',
						data: [
							24.2, 23.7, 23, 22.9, 23.4, 22.5, 29.1, 26.3, 29, 29.5, 27.8, 22.9, 22.2, 25.1, 26.6, 28.8, 29.4, 26.1,
							26.2, 28.2, 30.1, 29.2, 30.1, 29.3, 27.4, 29, 29.8, 29.9, 30.7, 30.2, 28.4, 27.6, 29.4, 29.2, 30.4, 31.6,
							31.3, 30.8, 31.2, 31.7, 31.1, 29.7, 29.4, 31.7, 32.6, 32, 30.9, 31.3, 30.7, 30.5, 30, 27.4, 29.5, 29.3,
							30, 31.1, 31.2, 30.9, 30.8, 30.5, 30.9, 30.3, 30.8, 30.2, 30.3, 32.1, 31.8, 31.6, 29.1, 30.9, 30.5, 30.8,
							30.5, 28, 26.6, 29.5, 27.2, 27.7, 27.5, 26, 26, 27.4, 27.5, 27.9, 27.8, 26.4, 25.9, 26.2, 26, 28.3, 28.9,
							29.6, 30, 29.6, 30.4, 29.4, 26.7, 25.5, 25.2, 21.2, 22.1, 23.1, 23.7, 23.1, 19.2, 21.2, 22.9, 24.4, 22.4,
							22.1, 23.9, 24.7, 23.8, 22.3, 20.9, 21.9, 23.4, 21.4, 22.7, 22.8, 26.1, 25.9, 26.1, 24.2, 25.5, 23.3,
							24.3, 25.1, 24.3, 25.8, 22.2, 20.8, 22.1, 25.5, 26.5, 19.6, 17.9, 19, 19.2, 17.6, 19.1, 18.7, 18.7, 16.4,
							15.7, 14.7, 16.6, 18.7, 14.8, 19.4, 15.8, 14.3, 12.1, 15.1, 16.5, 16.9, 16.4, 16.5, 16.1, 16.3, 19.3,
							18.2, 20.3, 19.8, 20.7, 21.5, 23.2, 12.8, 15.2, 14.7, 16.5, 17.6, 17.5, 17.5, 17.6, 18.8, 19.4, 18.5,
							18.2, 20.8, 13.9, 12.8, 15.9, 19, 15.3, 14.1, 16.3, 18.8, 17.3, 18.6, 16.7, 17.2, 18.9, 20.5, 20.3, 20,
							21.6, 14.7, 18.8, 20.7, 22.3, 22.3, 21.5, 24, 26.4, 25.1, 22.1, 17.1, 18, 20.7, 19.1, 18.6, 23.4, 17.6,
							22.7, 24.4, 23.5, 25.8, 25.8, 26.1, 27.1, 25.5, 22.9, 21.2, 21.2, 20, 18.8, 22.2, 25.1, 26.6, 28, 28.3,
							29.4, 19.9, 20.7, 22.4, 24.3, 24.7, 25.1, 26.9, 28.3, 29.9, 24.1,
						],
					}}
					stock={symbol}
				/>
			</DialogContent>
		</Dialog>
	)
}

function createData(symbol, name, price, up_down_day, up_down_week, up_down_predict, volume, correlation) {
	return {
		symbol,
		name,
		price,
		up_down: {
			day: up_down_day,
			week: up_down_week,
			predict: up_down_predict,
		},
		volume,
		correlation,
	}
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) return -1
	if (b[orderBy] > a[orderBy]) return 1
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead(props) {
	// 定義欄位名稱
	const headCells = [
		{
			id: 'symbol',
			numeric: true,
			label: '代號',
		},
		{
			id: 'name',
			numeric: false,
			label: '名稱',
		},
		{
			id: 'price',
			numeric: true,
			label: '股價',
		},
		{
			id: 'up_down.day',
			numeric: true,
			label: '漲跌率(％)',
		},
		{
			id: 'up_down.week',
			numeric: true,
			label: '週漲跌率(％)',
		},
		{
			id: 'volume',
			numeric: true,
			label: '成交量',
		},
		{
			id: 'correlation',
			numeric: true,
			label: '相關係數',
		},
		{
			id: 'up_down.predict',
			numeric: true,
			label: '預測漲跌率(％)',
		},
		{
			id: 'detail',
			numeric: false,
			label: '',
		},
	]

	const { order, orderBy, onRequestSort } = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}
