'use client'

import AnalChart from '@/components/Analysis/AnalChart'
import Banner from '@/components/Home/Banner'
import Sidebar from '@/components/Home/Sidebar'
import TaiexChart from '@/components/Home/TaiexChart'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<main>
			<Banner />
			<div className='container w-full mx-auto mt-12 mb-20'>
				<div className='flex lg:space-x-10 xl:space-x-16'>
					<Sidebar />
					<div className='w-full'>
						<div className='h-96'>
							<TaiexChart />
						</div>
						<div className='flex items-center mt-6 mb-14'>
							<img className='w-10' src='../images/good-quality-64.png' alt='recommend' />
							<h4 className='pl-1 pr-6 font-bold'>本日預測股票</h4>
							<button
								className='light-btn font-medium cursor-pointer px-12 py-1.5 bg-primary_yellow'
								type='button'
								onClick={() => router.push('/light')}
							>
								我要點燈！
							</button>
						</div>
						<div>
							<h3 className='mb-4 font-medium'>本日最佳趨勢</h3>
							<div className='h-[480px]'>
								<AnalChart />
							</div>
							<div className='flex flex-row-reverse'>
								<button
									className='px-12 py-2 mt-4 font-medium text-white duration-300 border-0 rounded-full cursor-pointer bg-secondary_blue hover:ring-2 hover:ring-offset-2'
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
	)
}
