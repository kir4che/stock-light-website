'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import TaiexChart from '@/components/Chart/TaiexChart'
import Hero from '@/components/common/Hero'
import { FlexCard } from '@/components/ui/FlexCard'

export default function Home() {
	const router = useRouter()

	return (
		<>
			<Hero />
			<TaiexChart />
			<div className='flex flex-col gap-8 mt-[6vw] md:mt-[3vw] lg:gap-16 xl:gap-20 h-min'>
				<FlexCard
					title='你曾在股市中感到迷惘嗎？'
					content={
						<>
							超過九成以上的投資人績效比不過大盤指數
							<br />
							我們以光明燈的儀式感帶給您投資的方向
							<br />
							為您找出與股市漲跌有關的數據及優秀條件的個股
						</>
					}
					imgSrc='/assets/home/stock-1.jpg'
				/>
				<FlexCard
					title='股市光明燈提供您不同的觀點'
					content={<>用數據打破你原有的想法，你曾經想過天氣、節日、甚至星象和股市的漲跌有關嗎？</>}
					imgSrc='/assets/home/stock-2.jpg'
					reverse={true}
				/>
				<FlexCard
					title='每日更新最即時的股市資訊'
					content={
						<>
							從證交所、Yahoo Finance 抓取最新的股市資訊
							<br />
							並從公開氣象局、政府公開資料平台抓取可用於分析的資料集
						</>
					}
					imgSrc='/assets/home/stock-3.jpg'
				/>
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
					<div className='relative hidden md:block'>
						<Image
							src='/assets/lantern.png'
							width={120}
							height={120}
							alt='lantern-1'
							className='absolute left-12 -top-80'
						/>
						<Image
							src='/assets/lantern.png'
							width={100}
							height={100}
							alt='lantern-2'
							className='absolute -top-14 left-72'
						/>
						<Image
							src='/assets/lantern.png'
							width={100}
							height={100}
							alt='lantern-3'
							className='absolute -top-80 right-40'
						/>
					</div>
				</article>
			</div>
		</>
	)
}
