import Sidebar from '@/components/anal-sidebar'
export default function Analysis() {
	return (
		<>
			<div id='stars-background-container'>
				<div className='container flex py-20 mx-auto space-x-6'>
					<Sidebar />
					<div className='bg-gray-100 rounded h-72 w-72'></div>
				</div>
				<div className='stars'></div>
				<div className='twinkling'></div>
				<div className='clouds'></div>
			</div>
		</>
	)
}
