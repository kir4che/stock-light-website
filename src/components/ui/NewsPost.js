import Image from 'next/image'
import Link from 'next/link'

import { convertDateTime } from '@/utils/convertDateTime'

export default function NewsPost({ news }) {
	return (
		news && (
			<article className='gap-6 space-y-2 xs:space-y-0 xs:flex'>
				<div className='xs:max-w-[225px] h-full w-full'>
					{news.imageSrc && (
						<Image
							src={news.imageSrc}
							width={400}
							height={400}
							className='xs:max-h-[145px] object-cover'
							alt={news.news_id || 'news-cover'}
						/>
					)}
				</div>
				<div className='space-y-1.5'>
					<Link href={news.link} target='_blank' className='hover:text-zinc-500 dark:hover:text-zinc-300'>
						<h4>{news.title}</h4>
					</Link>
					<p className='flex space-x-3 text-xs item-center text-zinc-500/80 dark:text-zinc-200/50'>
						<span className='space-x-1 flex-center'>
							{news.source_icon && (
								<Image src={news.source_icon} width={100} height={100} className='object-cover h-8' alt='news-icon' />
							)}
							<span>{news.source_name}</span>
						</span>
						<span>{convertDateTime(news.time)}</span>
					</p>
				</div>
			</article>
		)
	)
}
