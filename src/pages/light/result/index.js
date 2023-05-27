import LightResult from '@/components/Light/LightResult'

export default function Result() {
	return (
		<div id='stars-background-container'>
			<div className='container flex pt-20 pb-32 mx-auto space-x-6'>
				<LightResult />
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
