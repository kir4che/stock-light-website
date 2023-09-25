import Image from 'next/image'

import { analEvent } from '@/data/analEvent.js'

export default function AnalMenu({ activeIndex, handleActive }) {
	const isActive = (id) => activeIndex === id

	return (
		<div className='flex items-center w-full text-sm bg-white md:text-base md:rounded md:border-none md:block md:dark:bg-zinc-900/50 dark:bg-zinc-900/60 md:w-72'>
			<h4 className='flex items-center mx-4 sm:mx-3 md:mx-0 md:pl-6 md:border-b md:dark:border-zinc-600 md:h-14'>
				股市預測
			</h4>
			<ul className='flex md:flex-col md:mt-4 md:mb-8 md:space-y-1.5'>
				{analEvent.map((event) => (
					<li key={event.id}>
						<button
							className={`flex items-center px-2 md:px-0 w-full py-1.5 md:pl-4 sm:space-x-1 md:space-x-2 md:border-l-8 border-transparent hover:bg-primary_yellow/20 ${
								isActive(event.id)
									? 'md:border-primary_yellow bg-primary_yellow/10 dark:bg-primary_yellow dark:text-zinc-800'
									: ''
							}`}
							onClick={() => handleActive(event.id)}
						>
							<Image src={event.icon} width={36} height={36} alt={event.category} className='hidden sm:block' />
							<span className='tracking-wider'>{event.category}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
