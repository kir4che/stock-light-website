import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

export default function SearchInput({ allNews, keyword, setKeyword, newsPerPage, setPaginatedNews }) {
	const handleKeywordChange = (e) => setKeyword(e.target.value)

	const handleKeywordSearch = () => {
		if (keyword.trim() === '') setPaginatedNews(allNews.slice(0, newsPerPage))
		else {
			const filteredNews = allNews.filter((news) => news.title.toLowerCase().includes(keyword.toLowerCase()))
			setPaginatedNews(filteredNews.slice(0, newsPerPage))
		}
	}
	return (
		<Paper component='form' className='flex relative items-center pl-3 py-1.5'>
			<InputBase placeholder='Search' value={keyword} onChange={handleKeywordChange} />
			{keyword && (
				<CloseIcon
					fontSize='small'
					className='absolute mr-1 cursor-pointer text-zinc-800 dark:text-zinc-800 right-9 hover:opacity-80'
					onClick={() => {
						setPaginatedNews(allNews.slice(0, newsPerPage))
						setKeyword('')
					}}
				/>
			)}
			<SearchIcon
				className='absolute cursor-pointer text-zinc-800 dark:text-zinc-800 right-3 hover:opacity-80'
				onClick={handleKeywordSearch}
			/>
		</Paper>
	)
}
