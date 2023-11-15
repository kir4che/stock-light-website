import Image from 'next/image'
import Link from 'next/link'

export default function NewsPost({ news }) {
	const coverImg = news.imageSrc.split(',')[0].replace(/1x$/, '').trim()

	return (
		<article className='flex gap-6'>
			<div className='max-w-[225px] w-full'>
				<Image src={coverImg} alt={news.news_id} width={225} height={200} />
			</div>
			<div className='space-y-1.5'>
				<Link href={news.link} target='_blank' className='hover:text-zinc-500 dark:hover:text-zinc-300'>
					<h4>{news.title}</h4>
				</Link>
				{/* <p className='w-full mt-2 mb-4 text-sm leading-7 opacity-80 line-clamp-2'>{news.description}</p> */}
				<p className='text-xs text-zinc-500/80 dark:text-zinc-200/50'>
					{new Date(news.update_date).toISOString().split('T')[0]} ｜ {news.time}
				</p>
			</div>
		</article>
	)
}
