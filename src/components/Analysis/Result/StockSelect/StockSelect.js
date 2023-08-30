import { FormControl, MenuItem, Select } from '@mui/material'
import './style.module.css'

export default function StockSelect({ value, onChange }) {
	return (
		<FormControl sx={{ minWidth: 150 }} size='small'>
			<Select value={value} onChange={onChange}>
				<MenuItem value={2330}>2330 台積電</MenuItem>
				<MenuItem value={2454}>2454 聯發科</MenuItem>
				<MenuItem value={2603}>2603 長榮</MenuItem>
				<MenuItem value={2880}>2880 華南金</MenuItem>
				<MenuItem value={3008}>3008 大立光</MenuItem>
			</Select>
		</FormControl>
	)
}
