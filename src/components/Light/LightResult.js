import LightChart from '@/components/Light/LightChart'
import ResultTable from '@/components/Light/ResultTable'
import SaveButton from '@/components/Light/SaveButton'

import { useRouter } from 'next/navigation'

export default function LightResult() {
	const router = useRouter()

	return (
		<div className='w-full p-10 pb-12 bg-white rounded-2xl'>
			<div className='flex items-start justify-between'>
				<div className='flex items-end mb-6 space-x-2 tracking-wider'>
					<h3 className='font-medium '>天氣型態</h3>
					<p className='text-sm opacity-80'>
						{new Date().getFullYear()}/{new Date().getMonth() + 1}/{new Date().getDate()}
					</p>
				</div>
				<button
					type='button'
					onClick={() => router.push('/light')}
					className='inline-flex items-center justify-center mr-4 text-gray-700 rounded-full'
				>
					<svg
						className='w-6 h-6'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
					</svg>
				</button>
			</div>
			<LightChart />
			<div className='px-6 my-6 space-y-5'>
				<ResultTable />
				<p className='text-sm opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
			<SaveButton />
		</div>
	)
}
