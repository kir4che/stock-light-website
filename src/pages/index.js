'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { candlestickOption } from '@/components/Chart/options/candlestickOption'
import Hero from '@/components/common/Hero'
import Loading from '@/components/common/Loading'
import { FlexCard } from '@/components/ui/FlexCard'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function Home() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(true)

	const [dateData, setDateData] = useState([])
	const [priceData, setPriceData] = useState([])

	const fetchTaiexData = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/taiex/all`, { method: 'GET' })
			let data = await response.json()

			const dates = data.map((item) => item.date.split('T')[0]).reverse()
			setDateData(dates)

			const closingIndexs = data.map((item) => item.closing_index).reverse()
			const openingIndexs = data.map((item) => item.opening_index).reverse()
			const lowestIndexs = data.map((item) => item.lowest_index).reverse()
			const highestIndexs = data.map((item) => item.highest_index).reverse()

			const combinedArray = highestIndexs.map((_, index) => [
				closingIndexs[index],
				openingIndexs[index],
				lowestIndexs[index],
				highestIndexs[index],
			])
			setPriceData(combinedArray)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchTaiexData()
	}, [])

	return (
		<>
			<Hero />
			<h4 className='mt-6 mb-3'>台股大盤加權指數走勢</h4>
			{!isLoading ? (
				<Chart option={candlestickOption(dateData, priceData)} customHeight='h-72 md:h-80 xl:h-[480px]' />
			) : (
				<Loading />
			)}
			<div className='flex flex-col gap-8 mt-[6vw] md:mt-[3vw] md:gap-24 h-min'>
				<FlexCard
					title={'你曾在股市中感到迷惘嗎？'}
					content={
						<>
							超過九成以上的投資人績效比不過大盤指數
							<br />
							我們以光明燈的儀式感帶給您投資的方向
							<br />
							為您找出與股市漲跌有關的數據及優秀條件的個股
						</>
					}
					imgSrc={'/assets/home/stock-1.jpg'}
				/>
				<FlexCard
					title={'股市光明燈提供您不同的觀點'}
					content={<>用數據打破你原有的想法，你曾經想過天氣、節日、甚至星象和股市的漲跌有關嗎？</>}
					imgSrc={'/assets/home/stock-2.jpg'}
					reverse={true}
				/>
				<FlexCard
					title={'每日更新最即時的股市資訊'}
					content={
						<>
							從證交所、Yahoo Finance 抓取最新的股市資訊
							<br />
							並從公開氣象局、政府公開資料平台抓取可用於分析的資料集
						</>
					}
					imgSrc={'/assets/home/stock-3.png'}
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
					<LanternLayout otherStyle={'hidden md:block'}>
						<Lantern position={'z-0 scale-75 -top-80 -left-12 lg:-left-10 xl:left-0'} />
						<Lantern position={'z-0 -top-28 scale-100 left-20 lg:left-32 xl:left-56'} />
						<Lantern position={'z-0 -top-[420px] scale-105 -right-8 lg:right-0 xl:right-28'} />
					</LanternLayout>
				</article>
			</div>
		</>
	)
}
