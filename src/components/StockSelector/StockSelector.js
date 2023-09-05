import { FormControl, MenuItem, Select } from '@mui/material'
import { allStock } from '../../data/allStock'
import '../../styles/StockSelector.css'

export default function StockSelector({ value, onChange }) {
	return (
		<FormControl sx={{ minWidth: 140 }} size='small'>
			<Select value={value} onChange={onChange} displayEmpty>
				<MenuItem value='' disabled>
					請選擇股票
				</MenuItem>
				{allStock &&
					allStock.map((stock) => (
						<MenuItem value={stock.symbol} key={stock.symbol}>
							{stock.symbol} {stock.name}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	)
}
