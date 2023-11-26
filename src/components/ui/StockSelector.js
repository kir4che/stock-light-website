import { FormControl, MenuItem, Select } from '@mui/material'

import { allStock } from '@/data/constants'

export default function StockSelector({ value, onChange }) {
	return (
		<FormControl sx={{ minWidth: 140 }} size='small'>
			<Select
				value={value}
				onChange={onChange}
				className='bg-white dark:bg-zinc-800 dark:text-zinc-100'
				inputProps={{
					classes: {
						icon: 'dark:text-zinc-100',
					},
				}}
				displayEmpty
			>
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
