import Link from 'next/link'
import Lantern from '../../components/Light/Lantern'

/*還在測試*/
export default function Light() {
	return (
		<div id='stars-background-container'>
			<div className='min-h-screen'>
				<Lantern />
				<Link href='/light/checkout'>
					<button>祈福</button>
				</Link>
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
