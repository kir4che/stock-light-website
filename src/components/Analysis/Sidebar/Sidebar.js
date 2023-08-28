import Image from 'next/image'
import { analEvent } from '../../../data/analEvent.js'

export default function Sidebar({ active, handleClickActive }) {
	return (
		<div className='hidden bg-white rounded w-72 md:block'>
			<h4 className='flex items-center pl-6 font-medium border-b h-14'>股市預測</h4>
			<ul className='flex flex-col pt-4 pb-8 space-y-1.5'>
				{analEvent.map((event) => (
					<li key={event.id}>
						<button
							className={
								'flex items-center w-full py-1.5 pl-4 space-x-2 border-l-8 border-transparent hover:bg-yellow-200/20 hover:border-primary_yellow ' +
								(active === event.id ? `bg-yellow-200/20 border-primary_yellow` : ``)
							}
							onClick={() => handleClickActive(event.id)}
						>
							<Image src={event.icon} width={36} height={36} alt={event.category} />
							<span className='tracking-wider'>{event.category}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
