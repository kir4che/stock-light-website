import Link from 'next/link'

import Lantern from '@/components/Light/Lantern'

export default function Light() {
	return (
		<div id='stars-background-container'>
			<div className='container flex py-20 mx-auto space-x-6'>
				<Lantern />
				<Link href='/light/result'>
					<button>祈福</button>
				</Link>
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
