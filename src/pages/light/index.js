import Link from 'next/link'
import Lantern from '../../components/Light/Lantern'
import StarryBackground from '../../components/StarryBackground/StarryBackground'

export default function Light() {
	return (
		<StarryBackground>
			<div className='min-h-screen'>
				<Lantern />
				<Link href='/light/checkout'>
					<button>祈福</button>
				</Link>
			</div>
		</StarryBackground>
	)
}
