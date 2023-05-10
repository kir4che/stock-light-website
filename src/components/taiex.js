import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

export default function Taiex() {
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		setIsLoading(false)
	}, [])

	return (
		<>
			<div class='inline-flex float-right text-xs' role='group'>
				<button
					type='button'
					class='inline-block px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					1D
				</button>
				<button
					type='button'
					class='-ml-0.5 inline-block border-l-2 px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					5D
				</button>
				<button
					type='button'
					class='-ml-0.5 inline-block border-l-2 px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					1M
				</button>
				<button
					type='button'
					class='-ml-0.5 inline-block border-l-2 px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					6M
				</button>
				<button
					type='button'
					class='-ml-0.5 inline-block border-l-2 px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					1Y
				</button>
				<button
					type='button'
					class='-ml-0.5 inline-block border-l-2 px-6 pb-2 pt-2 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
				>
					3Y
				</button>
			</div>
			{isLoading ? <ReactLoading type={'spin'} /> : <></>}
		</>
	)
}
