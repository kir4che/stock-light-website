import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'react-bootstrap-icons'
import Chart from '../../Chart/Chart'
import TaiexChart from '../../Chart/TaiexChart'

export default function MainContent() {
	const router = useRouter()

	return (
		<main className='w-full px-4 space-y-20 md:w-2/3 lg:w-3/4 xl:w-4/5 md:px-0'>
			{/* 區塊一 */}
			<div>
				<TaiexChart />
				<div className='flex items-center mt-8'>
					<Image src='/images/good-quality-64.png' width={40} height={40} alt='recommend' />
					<h4 className='pl-1 pr-6 font-bold'>查看今日股市預測</h4>
					<button
						className='relative inline-flex items-center px-10 py-2 font-medium rounded-md text-zinc-800 group bg-primary_yellow active:bg-amber-300'
						onClick={() => router.push('/light')}
					>
						<span className='transition-all group-hover:me-4'>我要點燈</span>
						<span className='absolute transition-all -end-full group-hover:end-4'>
							<ArrowRight />
						</span>
					</button>
				</div>
			</div>
			{/* 區塊二 */}
			<div>
				<Chart
					tab={{
						label: '氣溫',
						isExplain: false,
						explanation: '',
						data: [
							24.2, 23.7, 23, 22.9, 23.4, 22.5, 29.1, 26.3, 29, 29.5, 27.8, 22.9, 22.2, 25.1, 26.6, 28.8, 29.4, 26.1,
							26.2, 28.2, 30.1, 29.2, 30.1, 29.3, 27.4, 29, 29.8, 29.9, 30.7, 30.2, 28.4, 27.6, 29.4, 29.2, 30.4, 31.6,
							31.3, 30.8, 31.2, 31.7, 31.1, 29.7, 29.4, 31.7, 32.6, 32, 30.9, 31.3, 30.7, 30.5, 30, 27.4, 29.5, 29.3,
							30, 31.1, 31.2, 30.9, 30.8, 30.5, 30.9, 30.3, 30.8, 30.2, 30.3, 32.1, 31.8, 31.6, 29.1, 30.9, 30.5, 30.8,
							30.5, 28, 26.6, 29.5, 27.2, 27.7, 27.5, 26, 26, 27.4, 27.5, 27.9, 27.8, 26.4, 25.9, 26.2, 26, 28.3, 28.9,
							29.6, 30, 29.6, 30.4, 29.4, 26.7, 25.5, 25.2, 21.2, 22.1, 23.1, 23.7, 23.1, 19.2, 21.2, 22.9, 24.4, 22.4,
							22.1, 23.9, 24.7, 23.8, 22.3, 20.9, 21.9, 23.4, 21.4, 22.7, 22.8, 26.1, 25.9, 26.1, 24.2, 25.5, 23.3,
							24.3, 25.1, 24.3, 25.8, 22.2, 20.8, 22.1, 25.5, 26.5, 19.6, 17.9, 19, 19.2, 17.6, 19.1, 18.7, 18.7, 16.4,
							15.7, 14.7, 16.6, 18.7, 14.8, 19.4, 15.8, 14.3, 12.1, 15.1, 16.5, 16.9, 16.4, 16.5, 16.1, 16.3, 19.3,
							18.2, 20.3, 19.8, 20.7, 21.5, 23.2, 12.8, 15.2, 14.7, 16.5, 17.6, 17.5, 17.5, 17.6, 18.8, 19.4, 18.5,
							18.2, 20.8, 13.9, 12.8, 15.9, 19, 15.3, 14.1, 16.3, 18.8, 17.3, 18.6, 16.7, 17.2, 18.9, 20.5, 20.3, 20,
							21.6, 14.7, 18.8, 20.7, 22.3, 22.3, 21.5, 24, 26.4, 25.1, 22.1, 17.1, 18, 20.7, 19.1, 18.6, 23.4, 17.6,
							22.7, 24.4, 23.5, 25.8, 25.8, 26.1, 27.1, 25.5, 22.9, 21.2, 21.2, 20, 18.8, 22.2, 25.1, 26.6, 28, 28.3,
							29.4, 19.9, 20.7, 22.4, 24.3, 24.7, 25.1, 26.9, 28.3, 29.9, 24.1,
						],
					}}
					stock={2330}
				/>
				<button
					type='button'
					className='float-right px-12 py-2 mt-6 rounded-full text-zinc-100 dark:text-zinc-800 bg-secondary_blue hover:bg-sky-500'
					onClick={() => router.push('/analysis')}
				>
					查看更多預測模式
				</button>
			</div>
		</main>
	)
}
