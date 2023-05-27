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
const rows = [createData(2330, '台積電', 531.0, -1.0, 7.06, 17186, 0.71)]

export default function AnalTable() {
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
							<TableCell align='right'>{row.price}</TableCell>
							<TableCell align='right'>{row.up_down.day}</TableCell>
							<TableCell align='right'>{row.up_down.week}</TableCell>
							<TableCell align='right'>{row.volume}</TableCell>
							<TableCell align='right'>{row.correlation}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
