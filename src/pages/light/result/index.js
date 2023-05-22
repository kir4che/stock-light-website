import LightResult from '@/components/LightResult'

export default function Result() {
	return (
		<div id='stars-background-container'>
			<div className='container flex py-20 mx-auto space-x-6'>
				<LightResult />
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
