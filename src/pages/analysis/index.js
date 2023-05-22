import AnalChart from '@/components/Analysis/AnalChart'
import Sidebar from '@/components/Analysis/AnalSidebar'

export default function Analysis() {
	return (
		<div id='stars-background-container'>
			<div className='container flex w-full pt-20 mx-auto space-x-6 pb-36'>
				<Sidebar />
				<AnalChart />
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
