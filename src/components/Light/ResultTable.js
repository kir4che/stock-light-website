import Box from '@mui/material/Box'
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

// 數據，目前先呈現五檔
const rows = [
	createData(2330, '台積電', 532.0, 0.0, 0.0, 0.0, 32099068, 0.0),
	createData(2454, '聯發科', 698.0, 0.0, 0.0, 0.0, 4968629, 0.0),
	createData(2603, '長榮', 150.5, 0.0, 0.0, 0.0, 15244624, 0.0),
	createData(2880, '華南金', 22.75, 0.0, 0.0, 0.0, 15869113, 0.0),
	createData(3008, '大立光', 2260.0, 0.0, 0.0, 0.0, 843935, 0.0),
]

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
]

function EnhancedTableHead(props) {
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

export default function ResultTable() {
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('name')

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const visibleRows = useMemo(() => stableSort(rows, getComparator(order, orderBy)), [order, orderBy])

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								return (
									<TableRow key={row.name} className='[&:nth-child(odd)]:bg-secondary_blue/10'>
										<TableCell align='right' component='th' scope='row'>
											{row.symbol}
										</TableCell>
										<TableCell align='left'>{row.name}</TableCell>
										<TableCell align='right'>{row.price.toFixed(2)}</TableCell>
										<TableCell align='right'>{row.up_down.day.toFixed(2)}</TableCell>
										<TableCell align='right'>{row.up_down.week.toFixed(2)}</TableCell>
										<TableCell align='right'>{row.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
										<TableCell align='right'>{row.correlation.toFixed(2)}</TableCell>
										<TableCell align='right'>{row.up_down.predict.toFixed(2)}</TableCell>
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
