'use client'

import LinearRegChart from '@/components/Analysis/LinearRegChart'
import Banner from '@/components/Home/Banner'
import NewsTicker from '@/components/Home/NewsTicker'
import Sidebar from '@/components/Home/Sidebar'
import TaiexChart from '@/components/Home/TaiexChart'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<div>
			<Banner />
			<NewsTicker />
			<main className='pt-12 pb-24'>
				<div className='container w-full mx-auto'>
					<div className='flex justify-between md:space-x-10 xl:space-x-16'>
						<div>
							<Sidebar />
						</div>
						<div className='w-full px-4 md:px-0'>
							<div className='flex items-baseline space-x-2'>
								<h5 className='mb-2 text-zinc-600 dark:text-white/80'>台股大盤指數</h5>
								<button className='px-2.5 py-1 text-sm rounded-xl bg-stock_green/10 text-stock_green dark:bg-stock_green/80 dark:text-white'>
									↗ {(((16174.92 - 16101.88) / 16101.88) * 100).toFixed(2)}%
								</button>
							</div>
							<div className='h-80 lg:h-[400px]'>
								<TaiexChart />
							</div>
							<div className='flex items-center mt-16 mb-20'>
								<Image src='/images/good-quality-64.png' width={40} height={40} alt='recommend' />
								<h4 className='pl-1 pr-6 font-bold'>本日預測股票</h4>
								<button
									className='light-btn font-medium text-zinc-900 px-12 py-1.5 bg-primary_yellow'
									type='button'
									onClick={() => router.push('/light')}
								>
									我要點燈！
								</button>
							</div>
							<div>
								<h5 className='mb-4 text-zinc-600 dark:text-white/80'>本日最佳趨勢</h5>
								<div className='h-80 sm:h-96 lg:h-[450px]'>
									<LinearRegChart
										tab={{
											label: '氣溫',
											isExplain: false,
											explanation: '',
											data: [
												24.2, 23.7, 23, 22.9, 23.4, 22.5, 29.1, 26.3, 29, 29.5, 27.8, 22.9, 22.2, 25.1, 26.6, 28.8,
												29.4, 26.1, 26.2, 28.2, 30.1, 29.2, 30.1, 29.3, 27.4, 29, 29.8, 29.9, 30.7, 30.2, 28.4, 27.6,
												29.4, 29.2, 30.4, 31.6, 31.3, 30.8, 31.2, 31.7, 31.1, 29.7, 29.4, 31.7, 32.6, 32, 30.9, 31.3,
												30.7, 30.5, 30, 27.4, 29.5, 29.3, 30, 31.1, 31.2, 30.9, 30.8, 30.5, 30.9, 30.3, 30.8, 30.2,
												30.3, 32.1, 31.8, 31.6, 29.1, 30.9, 30.5, 30.8, 30.5, 28, 26.6, 29.5, 27.2, 27.7, 27.5, 26, 26,
												27.4, 27.5, 27.9, 27.8, 26.4, 25.9, 26.2, 26, 28.3, 28.9, 29.6, 30, 29.6, 30.4, 29.4, 26.7,
												25.5, 25.2, 21.2, 22.1, 23.1, 23.7, 23.1, 19.2, 21.2, 22.9, 24.4, 22.4, 22.1, 23.9, 24.7, 23.8,
												22.3, 20.9, 21.9, 23.4, 21.4, 22.7, 22.8, 26.1, 25.9, 26.1, 24.2, 25.5, 23.3, 24.3, 25.1, 24.3,
												25.8, 22.2, 20.8, 22.1, 25.5, 26.5, 19.6, 17.9, 19, 19.2, 17.6, 19.1, 18.7, 18.7, 16.4, 15.7,
												14.7, 16.6, 18.7, 14.8, 19.4, 15.8, 14.3, 12.1, 15.1, 16.5, 16.9, 16.4, 16.5, 16.1, 16.3, 19.3,
												18.2, 20.3, 19.8, 20.7, 21.5, 23.2, 12.8, 15.2, 14.7, 16.5, 17.6, 17.5, 17.5, 17.6, 18.8, 19.4,
												18.5, 18.2, 20.8, 13.9, 12.8, 15.9, 19, 15.3, 14.1, 16.3, 18.8, 17.3, 18.6, 16.7, 17.2, 18.9,
												20.5, 20.3, 20, 21.6, 14.7, 18.8, 20.7, 22.3, 22.3, 21.5, 24, 26.4, 25.1, 22.1, 17.1, 18, 20.7,
												19.1, 18.6, 23.4, 17.6, 22.7, 24.4, 23.5, 25.8, 25.8, 26.1, 27.1, 25.5, 22.9, 21.2, 21.2, 20,
												18.8, 22.2, 25.1, 26.6, 28, 28.3, 29.4, 19.9, 20.7, 22.4, 24.3, 24.7, 25.1, 26.9, 28.3, 29.9,
												24.1,
											],
										}}
										stock={2330}
									/>
								</div>
								<div className='flex flex-row-reverse'>
									<button
										className='px-12 py-2 mt-6 font-medium duration-300 border-none rounded-full dark:text-zinc-900 bg-secondary_blue hover:ring-2 hover:ring-offset-2'
										type='button'
										onClick={() => router.push('/analysis')}
									>
										查看更多預測模式
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
