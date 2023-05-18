'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
	const router = useRouter()

	return (
		<div className='container flex flex-col flex-wrap items-center py-4 mx-auto sm:flex-row'>
			<Link href='/' className='flex items-center font-bold sm:mb-0'>
				<img src='/favicon.ico' alt='股市光明燈' />
				<h4 className='ml-2'>股市光明燈</h4>
			</Link>
			<nav className='flex flex-wrap items-center justify-center mt-2 space-x-3 list-none sm:mr-auto sm:mt-0 sm:ml-10 sm:space-x-6'>
				<Link href='/analysis'>股市預測</Link>
				<Link href='/about'>關於我們</Link>
			</nav>
			<button
				className='inline-flex items-center px-6 py-2 mt-2 font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow focus:outline-none sm:mt-0 hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
				type='button'
				onClick={() => router.push('/light')}
			>
				我要點燈！
			</button>
		</div>
	)
}
