import AnalChart from '@/components/AnalChart'
import Sidebar from '@/components/AnalSidebar'

export default function Analysis() {
	return (
		<div id='stars-background-container'>
			<div className='container flex pt-20 mx-auto space-x-6'>
				<Sidebar />
				<div className='flex flex-col w-full'>
					<h3 className='mb-4 font-medium tracking-wider text-white'>天氣型態</h3>
					<div className='h-full px-4 pt-8 bg-gray-100 rounded'>
						<AnalChart />
					</div>
				</div>
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
