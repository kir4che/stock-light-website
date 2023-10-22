import Link from 'next/link'

export default function NewsPost({ news }) {
	return (
		<div>
			<Link href={news.url} target='_blank' className='hover:text-zinc-500 dark:hover:text-zinc-300'>
				<h4>{news.title}</h4>
			</Link>
			<p className='w-full mt-2 mb-4 text-sm leading-7 opacity-80 line-clamp-2'>{news.description}</p>
			<p className='text-xs text-zinc-500/80 dark:text-secondary_blue/80'>
				{new Date(news.publishedAt).toISOString().split('T')[0]}｜{news.source.name}
			</p>
		</div>
	)
}
