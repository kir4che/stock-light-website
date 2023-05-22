'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
	const router = useRouter()

	return (
		<header className='bg-white'>
			<div className='container flex flex-col items-center py-5 mx-auto mb-2 sm:flex-row'>
				<Link href='/' className='flex items-center font-bold sm:mb-0'>
					<img src='/favicon.ico' alt='股市光明燈' />
					<h4 className='ml-2'>股市光明燈</h4>
				</Link>
				<nav className='flex items-center mt-2 space-x-4 sm:mr-auto sm:mt-0 sm:ml-10 md:space-x-8'>
					<Link href='/news'>
						最新消息<span className='hidden ml-1 text-xs lg:block'>News</span>
					</Link>
					<Link href='/analysis'>
						股市預測<span className='hidden ml-1 text-xs lg:block'>Analysis</span>
					</Link>
					<Link href='/about'>
						關於我們<span className='hidden ml-1 text-xs lg:block'>About</span>
					</Link>
					<Link href='/feedback'>
						意見回饋<span className='hidden ml-1 text-xs lg:block'>Feedback</span>
					</Link>
				</nav>
				<button
					className='inline-flex items-center px-6 py-2 mt-2 font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow focus:outline-none sm:mt-0 hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
					type='button'
					onClick={() => router.push('/light')}
				>
					我要點燈！
				</button>
			</div>
		</header>
	)
}
