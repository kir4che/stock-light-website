import Image from 'next/image'
import Link from 'next/link'

export default function NewsPost({ news }) {
	const coverImg = news.imageSrc.split(',')[0].replace(/1x$/, '').trim()

	return (
		<article className='gap-6 space-y-2 xs:space-y-0 xs:flex'>
			<div className='xs:max-w-[225px] h-full w-full'>
				<Image src={coverImg} width={400} height={400} className='xs:max-h-[145px] object-cover' alt={news.news_id} />
			</div>
			<div className='space-y-1.5'>
				<Link href={news.link} target='_blank' className='hover:text-zinc-500 dark:hover:text-zinc-300'>
					<h4>{news.title}</h4>
				</Link>
				<p className='text-xs text-zinc-500/80 dark:text-zinc-200/50'>
					{news.update_date && new Date(news.update_date).toISOString().split('T')[0] + ' ｜ '}
					{news.time}
				</p>
			</div>
		</article>
	)
}
