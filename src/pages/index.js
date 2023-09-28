'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'

import Hero from '@/components/common/Hero'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function Home() {
	const router = useRouter()

	return (
		<>
			<Hero />
			<div className='flex flex-col gap-8 mt-[6vw] md:mt-[3vw] md:gap-24 h-min'>
				<article className='flex xl:max-w-[80%] flex-col items-start justify-between gap-5 px-6 py-8 bg-white shadow-md md:flex-row dark:bg-zinc-900 md:items-center md:gap-12 lg:px-8 lg:py-9 rounded-3xl'>
					<section>
						<Image
							src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							width={500}
							height={500}
							alt='stock-market'
							className='object-cover w-screen h-72 lg:w-[64vw] rounded-xl'
						/>
					</section>
					<section data-aos='fade-left' data-aos-duration='500' className='w-full md:max-w-sm'>
						<h3 className='mb-8'>你曾在股市中感到迷惘嗎？</h3>
						<p className='opacity-75'>
							超過九成以上的投資人績效比不過大盤指數
							<br />
							我們以光明燈的儀式感帶給您投資的方向
							<br />
							為您找出與股市漲跌有關的數據及優秀條件的個股
						</p>
					</section>
				</article>
				<article className='flex ml-auto xl:max-w-[80%] flex-col-reverse items-start justify-between gap-5 px-6 py-8 bg-white dark:bg-zinc-900 shadow-md md:flex-row md:items-center md:gap-12 lg:px-8 lg:py-9 rounded-3xl'>
					<section data-aos='fade-right' data-aos-duration='800' className='w-full max-w-sm'>
						<h3 className='mb-8'>股市光明燈提供您不同的觀點</h3>
						<p className='opacity-75'>
							用數據打破您原有的想法，
							<br />
							你曾經想過天氣、節日，甚至是氣象和
							<br />
							股市的漲跌有關嗎？
						</p>
					</section>
					<section>
						<Image
							src='https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							width={600}
							height={600}
							alt='statistical-analysis'
							className='object-cover w-screen h-72 lg:w-[64vw] rounded-xl'
						/>
					</section>
				</article>
				<article className='flex xl:max-w-[80%] dark:bg-zinc-900 flex-col items-start justify-between gap-5 px-6 py-8 bg-white shadow-md md:flex-row md:items-center md:gap-12 lg:px-8 lg:py-9 rounded-3xl'>
					<section>
						<Image
							src='https://i.imgur.com/eUwF1X0.png'
							width={600}
							height={600}
							alt='stock-market'
							className='object-cover w-screen h-72 lg:w-[64vw] rounded-xl'
						/>
					</section>
					<section data-aos='fade-left' data-aos-duration='600' className='w-full max-w-sm'>
						<h3 className='mb-8'>每日更新最即時的股市資訊</h3>
						<p className='opacity-75'>
							從證交所、Yahoo Finance 抓取最新的股市資訊
							<br />
							並從公開氣象局、政府公開資料平台抓取可用於分析的資料集
						</p>
					</section>
				</article>
				<article className='relative mt-20 mb-48 text-center'>
					<div data-aos='fade-down' data-aos-duration='800' data-aos-once='true' className='z-10'>
						<h2 className='mb-5 text-5xl tracking-wider'>現在</h2>
						<h3 className='mb-6 font-light'>
							「 只要登入會員，就能使用<span className='text-amber-400 dark:text-primary_yellow'>股市光明燈</span>！ 」
						</h3>
						<p className='opacity-75'>
							觀看基本面及技術面等等指標
							<br />
							讓我們帶給您新的希望
						</p>
					</div>
					<button
						className='px-10 py-1.5 mt-8 tracking-wide rounded-full bg-primary_yellow text-zinc-800 hover:bg-amber-300'
						onClick={() => router.push('/light')}
					>
						我要點燈！
					</button>
					<LanternLayout otherStyle={'hidden md:block'}>
						<Lantern position={'z-0 scale-75 -top-80 -left-12 lg:-left-10 xl:left-0'} />
						<Lantern position={'z-0 -top-28 scale-100 left-20 lg:left-32 xl:left-56'} />
						<Lantern position={'z-0 -top-[420px] scale-105 -right-8 lg:right-0 xl:right-28'} />
					</LanternLayout>
				</article>
			</div>
			{/*
        前一版本舊有的內容
      <Marquee />
			<div className='pt-8 pb-12 sm:pt-12 sm:pb-16'>
				<div className='flex w-full md:gap-12 lg:gap-20 xl:gap-24'>
					<Sidebar />
					<MainContent />
				</div>
			</div>
      */}
		</>
	)
}
