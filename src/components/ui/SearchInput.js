import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useState } from 'react'

export default function SearchInput({ setNewsByKeyword, setTotalPages }) {
	const [keyword, setKeyword] = useState('')

	// 清除搜索结果
	const clearSearch = () => {
		setKeyword('')
		setNewsByKeyword(null)
	}

	const handleInputChange = (e) => setKeyword(e.target.value)

	const fetchNewsByKeyword = async () => {
		const newsPerPage = 6

		try {
			const response = await fetch(
				`https://gnews.io/api/v4/top-headlines?category=business&country=tw&q=${keyword}&max=${newsPerPage}&apikey=${process.env.GNEWS_API_KEY}`,
				{ method: 'GET' }
			)

			const data = await response.json()
			setNewsByKeyword(data.articles)

			// 計算並設定總頁數
			setTotalPages(Math.ceil(data.totalResults / newsPerPage))
		} catch (error) {
			console.error('error', error)
		}
	}

	return (
		<Paper component='form' className='flex relative items-center pl-3 py-1.5'>
			<InputBase placeholder='Search' value={keyword} onChange={handleInputChange} />
			{keyword && (
				<CloseIcon
					fontSize='small'
					className='absolute mr-1 cursor-pointer text-zinc-800 dark:text-zinc-800 right-8 hover:opacity-80'
					onClick={clearSearch}
				/>
			)}
			<SearchIcon
				className='absolute cursor-pointer text-zinc-800 dark:text-zinc-800 right-3 hover:opacity-80'
				onClick={fetchNewsByKeyword}
			/>
		</Paper>
	)
}
