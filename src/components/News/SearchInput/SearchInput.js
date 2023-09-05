import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import { X as Close, Search } from 'react-bootstrap-icons'

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
				`https://newsapi.org/v2/top-headlines?category=business&q=${keyword}&pageSize=${newsPerPage}&apiKey=${process.env.NEWS_API_KEY}`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setNewsByKeyword(data.articles)

			// 計算並設定總頁數
			setTotalPages(Math.ceil(data.totalResults / newsPerPage))
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<Paper component='form' className='flex relative items-center pl-3 py-1.5'>
			<InputBase placeholder='Search' value={keyword} onChange={handleInputChange} />
			{keyword && (
				<Close size={30} className='absolute cursor-pointer right-8 hover:opacity-80' onClick={clearSearch} />
			)}
			<Search size={20} className='absolute cursor-pointer right-3 hover:opacity-80' onClick={fetchNewsByKeyword} />
		</Paper>
	)
}
