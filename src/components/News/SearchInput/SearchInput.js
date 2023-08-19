import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useState } from 'react'

export default function SearchInput({ updateNewsByKeyword }) {
	const [keyword, setKeyword] = useState('')

	// 清除搜索结果
	const clearSearch = () => {
		setKeyword('')
		updateNewsByKeyword(null)
	}

	const handleInputChange = (e) => setKeyword(e.target.value)

	const fetchNewsByKeyword = async () => {
		const pageSize = 1

		try {
			const response = await fetch(
				`https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&apiKey=d65cd2341b4b4b06a3f8bb45215b997d`,
				{ method: 'GET' }
			)
			const data = await response.json()
			updateNewsByKeyword(data.articles)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<Paper component='form' sx={{ p: '6px 4px', display: 'flex' }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder='Search'
				inputProps={{ 'aria-label': 'search post' }}
				value={keyword}
				onChange={handleInputChange}
			/>
			<IconButton type='button' sx={{ p: '2px' }} aria-label='clear' onClick={clearSearch}>
				<ClearIcon />
			</IconButton>
			<IconButton type='button' sx={{ p: '2px' }} aria-label='search' onClick={fetchNewsByKeyword}>
				<SearchIcon />
			</IconButton>
		</Paper>
	)
}
