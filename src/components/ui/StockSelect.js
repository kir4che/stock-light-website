import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import stock100 from '@/data/stock100.json'
import { useDarkMode } from '@/providers/DarkModeProvider'

const StockSelect = ({ setSelect }) => {
	const { isDarkMode } = useDarkMode()

	return (
		<Autocomplete
			options={stock100.map((stock) => `${stock.stock_id} ${stock.name}`)}
			defaultValue={`${stock100[0].stock_id} ${stock100[0].name}`}
			sx={{
				width: 150,
				bgcolor: isDarkMode ? '#18181b' : 'background.paper',
				borderRadius: '0.25rem',
				WebkitTextFillColor: isDarkMode ? '#f4f4f5' : '#27272a',
				'& .MuiAutocomplete-popupIndicator': {
					color: isDarkMode ? '#f4f4f5' : '#27272a',
				},
			}}
			size='small'
			renderInput={(params) => <TextField {...params} />}
			onChange={(e, newValue) => setSelect(parseInt(newValue))}
			disableClearable
			disablePortal
		/>
	)
}

export default StockSelect
