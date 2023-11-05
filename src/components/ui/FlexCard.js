import Image from 'next/image'

export function FlexCard({ title, content, imgSrc, reverse = false }) {
	return (
		<article
			className={`flex xl:max-w-[80%] items-start rounded-lg justify-between gap-5 px-6 py-8 shadow-lg md:flex-row bg-white dark:bg-zinc-900 md:items-center md:gap-12 lg:px-8 lg:py-9 ${
				reverse ? 'ml-auto flex-col-reverse ' : 'flex-col'
			}`}
		>
			<section>
				<Image
					src={imgSrc}
					width={500}
					height={500}
					alt='stock-market'
					className='object-cover w-screen h-72 lg:w-[64vw] rounded-lg'
				/>
			</section>
			<section data-aos={reverse ? 'fade-left' : 'fade-right'} data-aos-duration='500' className='w-full md:max-w-sm'>
				<h3 className='mb-8'>{title}</h3>
				<p className='opacity-75'>{content}</p>
			</section>
		</article>
	)
}
