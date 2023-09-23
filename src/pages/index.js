'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'

import Hero from '@/components/common/Hero'

export default function Home() {
	const router = useRouter()

	return (
		<>
			<Hero />
			<article className='px-16 py-44 flex-center-between'>
				<section>
					<Image
						src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						width={600}
						height={600}
						alt='stock-market'
						className='rounded-md'
					/>
				</section>
				<section data-aos='fade-left' data-aos-duration='500'>
					<h3 className='mb-8 font-medium'>你曾在股市感到迷惘嗎？</h3>
					<p>
						超過九成以上的投資人績效比不過大盤指數
						<br />
						我們以光明燈的儀式感帶給您投資的方向
						<br />
						為您找出與股市漲跌有關的數據及優秀條件的個股
					</p>
				</section>
			</article>
			<article className='px-16 pb-44 flex-center-between'>
				<section data-aos='fade-right' data-aos-duration='800'>
					<h3 className='mb-8 font-medium'>股市光明燈提供您不同的觀點</h3>
					<p>
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
						className='rounded-md'
					/>
				</section>
			</article>
			<article className='px-16 pb-56 flex-center-between'>
				<section>
					<Image
						src='https://i.imgur.com/eUwF1X0.png'
						width={600}
						height={600}
						alt='stock-market'
						className='rounded-md'
					/>
				</section>
				<section data-aos='fade-left' data-aos-duration='600'>
					<h3 className='mb-8 font-medium'>每日更新最即時的股市資訊</h3>
					<p>
						我們從證交所、Yahoo Finance 抓取最新的股市資訊，
						<br />
						並從公開氣象局、政府公開資料平台抓取可用於分析的資料集
					</p>
				</section>
			</article>
			<article className='relative pb-48 text-center'>
				<div data-aos='fade-down' data-aos-duration='800' data-aos-once='true' className='z-10'>
					<h1 className='mb-6 text-5xl tracking-wider'>現在</h1>
					<h3 className='mb-8'>
						只要登入會員，就能使用<span className='text-amber-400 dark:text-primary_yellow'>股市光明燈</span>！
					</h3>
					<p>
						觀看基本面及技術面等等指標
						<br />
						讓我們帶給您新的希望
					</p>
				</div>
				<div data-aos='zoom-in-up' data-aos-delay='500' data-aos-once='true'>
					<button
						className='px-10 py-1.5 mt-10 tracking-wide rounded-full bg-primary_yellow text-zinc-800 hover:bg-amber-300'
						onClick={() => router.push('/light')}
					>
						我要點燈！
					</button>
				</div>
				<div className='absolute z-0 scale-75 -top-[450px] float'>
					<div className='flex h-40 w-48 animate-[rise_3s_ease-in-out] perspective-5 lanternone'>
						<div className='laternlight'></div>
						<div className='rounded-t-lg left rounded-b-md'></div>
						<div className='rounded-t-lg right rounded-b-md'></div>
						<div className='flame'></div>
					</div>
				</div>
				<div className='absolute z-0 -top-80 left-56 float'>
					<div className='flex h-40 w-48 animate-[rise_3s_ease-in-out] perspective-5 lanternone'>
						<div className='laternlight'></div>
						<div className='rounded-t-lg left rounded-b-md'></div>
						<div className='rounded-t-lg right rounded-b-md'></div>
						<div className='flame'></div>
					</div>
				</div>
				<div className='absolute z-0 scale-105 -top-[465px] right-56 float'>
					<div className='flex h-40 w-48 animate-[rise_3s_ease-in-out] perspective-5 lanternone'>
						<div className='laternlight'></div>
						<div className='rounded-t-lg left rounded-b-md'></div>
						<div className='rounded-t-lg right rounded-b-md'></div>
						<div className='flame'></div>
					</div>
				</div>
			</article>
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
