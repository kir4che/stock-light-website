import LightResult from '../../../components/Light/LightResult'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'

export default function Result() {
	return (
		<StarryBackground>
			<div className='container flex pt-20 pb-32 mx-auto space-x-6'>
				<LightResult />
			</div>
		</StarryBackground>
	)
}
