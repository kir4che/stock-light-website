import Lantern from '../../components/Light/Lantern'
import StarryBackground from '../../components/StarryBackground/StarryBackground'

export default function Light() {
	return (
		<StarryBackground>
			<div className='min-h-screen'>
				<Lantern />
			</div>
		</StarryBackground>
	)
}
