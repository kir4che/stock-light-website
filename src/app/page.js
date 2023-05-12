'use client'

import Banner from '@/components/banner'
import Sidebar from '@/components/home-sidebar'
import Taiex from '@/components/taiex'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<main className='container w-full mx-auto'>
			<Banner />
			<div className='grid grid-flow-col grid-rows-3 mt-12 mb-20 lg:gap-20'>
				<Sidebar />
				<div className='col-span-12'>
					<div className='mb-8 -mt-6'>
						<Taiex />
					</div>
					<div className='flex items-center w-full'>
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
				</div>
				<div className='col-span-12 row-span-2'>
					<h3 className='mb-2 font-medium'>本日最佳趨勢</h3>
				</div>
			</div>
		</main>
	)
}
