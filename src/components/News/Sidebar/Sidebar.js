import CampaignIcon from '@mui/icons-material/Campaign'
import Link from 'next/link'
import SearchInput from '../SearchInput/SearchInput'

export default function NewsSidebar({ hotNews, updateNewsByKeyword }) {
	return (
		<div className='hidden space-y-8 w-96 md:block'>
			<SearchInput updateNewsByKeyword={updateNewsByKeyword} />
			<div className='space-y-6'>
				<div className='flex items-center pb-2.5 space-x-2 border-b-[3px] border-b-primary_yellow'>
					<CampaignIcon />
					<h5>熱門新聞</h5>
				</div>
				<ul className='space-y-3'>
					{hotNews &&
						hotNews.map((news, index) => (
							<li key={index}>
								<Link href={news.url} target='_blank' className='hover:text-zinc-300'>
									{news.title}
								</Link>
								<hr className='mt-3' />
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}
