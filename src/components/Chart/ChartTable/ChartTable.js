import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function createData(symbol, name, price, up_down_day, up_down_week, volume, correlation) {
	return {
		symbol,
		name,
		price,
		up_down: {
			day: up_down_day,
			week: up_down_week,
		},
		volume,
		correlation,
	}
}

// 個股數據
const stockTable = [
	createData(2330, '台積電', 532, 0.38, 7.26, 32099068, -0.0193),
	createData(2454, '聯發科', 698, 1.31, 3.71, 4968629, -0.1211),
	createData(2603, '長榮', 150.5, -0.33, -1.31, 15244624, 0.4775),
	createData(2880, '華南金', 22.75, 0.89, 3.88, 15869113, -0.1379),
	createData(3008, '大立光', 2260, 2.26, 7.88, 843935, -0.5256),
]

export default function ChartTable({ tab, stock }) {
	const rows = stockTable.filter((item) => item.symbol === stock)

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='right'>代號</TableCell>
						<TableCell align='left'>名稱</TableCell>
						<TableCell align='right'>股價</TableCell>
						<TableCell align='right'>漲跌率(％)</TableCell>
						<TableCell align='right'>週漲跌率(％)</TableCell>
						<TableCell align='right'>交易量</TableCell>
						<TableCell align='right'>相關係數</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.name}>
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
								<span className={(row.up_down.week >= 0 ? 'text-stock_red' : 'text-stock_green') + ' font-medium'}>
									{(row.up_down.week >= 0 ? '▲ ' : '▼ ') + row.up_down.week.toFixed(2)}
								</span>
							</TableCell>
							<TableCell align='right'>{row.volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</TableCell>
							<TableCell align='right'>{row.correlation.toFixed(4)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
