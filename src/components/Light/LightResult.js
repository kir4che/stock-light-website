import { useRouter } from 'next/navigation'
import { X as Close } from 'react-bootstrap-icons'
import LightChart from '../../components/Light/LightChart'
import ResultTable from '../../components/Light/ResultTable'
import SaveButton from '../../components/Light/SaveButton'

export default function LightResult() {
	const router = useRouter()
	const formattedDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`

	const goBack = () => router.push('/light')

	return (
		<div className='relative w-full p-8 bg-white rounded dark:bg-zinc-900/50'>
			<div className='flex items-start justify-between'>
				<div className='flex items-end mb-6 space-x-2 tracking-wider'>
					<h3>天氣型態</h3>
					<p className='text-sm opacity-80'>{formattedDate}</p>
				</div>
				<Close
					className='absolute text-3xl cursor-pointer top-3 right-3 opacity-80 hover:opacity-60'
					onClick={goBack}
				/>
			</div>
			<LightChart />
			<div className='my-6 space-y-5 sm:px-6'>
				<ResultTable />
				<p className='text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
			<SaveButton />
		</div>
	)
}
