import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'

import DetailChart from '@/components/Light/DetailChart'

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

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => setOpen(true)
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
												onClick={handleClickOpen}
											>
												詳細數據
											</button>
										</TableCell>
										<DetailDialog open={open} symbol={row.symbol} name={row.name} handleClose={handleClose} />
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
	const { open, symbol, name, handleClose } = props

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
			<DialogContent className='space-y-4 text-center'>
				<DetailChart symbol={symbol} name={name} />
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
