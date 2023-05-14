'use client'

import Banner from '@/components/banner'
import Sidebar from '@/components/home-sidebar'
import Taiex from '@/components/taiex'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<main>
			<Banner />
			<div className='container w-full mx-auto mt-12'>
				<div className='flex xl:space-x-28'>
					<Sidebar />
					<div className='mb-24'>
						<div className='mb-5 -mt-8 -ml-2'>
							<Taiex />
						</div>
						<div className='flex items-center w-full mb-12'>
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
							<img src='https://fakeimg.pl/920x320/' />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
