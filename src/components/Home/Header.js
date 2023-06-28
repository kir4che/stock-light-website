'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import BurgerMenu from '@/components/Home/BurgerMenu'

export default function Header() {
	const pages = [
		{
			name: '最新消息',
			url: 'news',
		},
		{
			name: '股市預測',
			url: 'analysis',
		},
		{
			name: '關於我們',
			url: 'about',
		},
		{
			name: '意見回饋',
			url: 'feedback',
		},
	]

	const router = useRouter()

	const { theme, setTheme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const switchTheme = () => {
		if (isMounted) {
			setTheme(theme === 'light' ? 'dark' : 'light')
		}
	}

	return (
		<header>
			<div className='container flex items-center justify-between px-4 py-2 mx-auto md:justify-start md:px-0 md:py-5'>
				<Link href='/' className='flex items-center font-bold'>
					<img src='/favicon.ico' alt='股市光明燈' />
					<h4 className='ml-2'>股市光明燈</h4>
				</Link>
				<nav className='hidden ml-8 mr-auto space-x-5 leading-5 sm:flex xl:mt-1 lg:space-x-10'>
					{pages.map((page) => (
						<Link href={page.url} key={page.url}>
							<p>{page.name}</p>
							<span className='hidden text-xs capitalize xl:block'>{page.url}</span>
						</Link>
					))}
				</nav>
				<div className='flex items-center'>
					<button
						className='hidden px-6 py-2 mr-2 font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow md:block focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
						type='button'
						onClick={() => router.push('/light')}
					>
						我要點燈！
					</button>
					<BurgerMenu pages={pages} />
					<button className='p-1.5 rounded-full hover:bg-gray-500/10' onClick={switchTheme}>
						{theme === 'light' ? (
							<img width='24' height='24' src='https://img.icons8.com/ios/50/moon-symbol.png' alt='moon-symbol' />
						) : (
							<img width='24' height='24' src='https://img.icons8.com/ios/50/sun.png' alt='moon-symbol' />
						)}
					</button>
				</div>
			</div>
		</header>
	)
}
