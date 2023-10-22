'use client'

import LoginIcon from '@mui/icons-material/Login'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import BurgerMenu from '@/components/ui/BurgerMenu'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import UserMenu from '@/components/ui/UserMenu'
import { navigationLinks } from '@/data/navigationLinks'

export default function Header() {
	const { data: session } = useSession()

	return (
		<div className='fixed left-0 z-50 w-full px-4 py-1 bg-white sm:px-6 md:px-10 lg:px-16 dark:bg-zinc-800 flex-center-between md:py-4'>
			<Link href='/' className='flex items-center space-x-1'>
				<Image src='/favicon.ico' width={32} height={32} alt='股市光明燈' />
				<h4>股市光明燈</h4>
			</Link>
			<nav className='hidden ml-6 mr-auto space-x-3 leading-5 lg:ml-8 lg:pt-1 md:flex lg:space-x-8'>
				{navigationLinks.map((link) => (
					<Link href={`/${link.url}`} key={link.url}>
						<span>{link.name}</span>
						<span className='hidden text-sm capitalize lg:block'>{link.url}</span>
					</Link>
				))}
			</nav>
			<div className='flex-center md:space-x-2 xl:space-x-3'>
				<Link href={'/light'}>
					<button
						type='button'
						className={`block px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 ease-out rounded-full dark:text-zinc-800 bg-primary_yellow hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow dark:hover:ring-offset-zinc-900 ${
							session ? 'mr-3 md:mr-0' : ''
						}`}
					>
						我要點燈
					</button>
				</Link>
				{session ? (
					<UserMenu session={session} />
				) : (
					<Link href={'/login'} className='items-center hidden md:flex'>
						<span>登入</span>
						<LoginIcon sx={{ ml: 0.3 }} fontSize='small' />
					</Link>
				)}
				<BurgerMenu navigationLinks={navigationLinks} session={session} />
				<DarkModeToggle />
			</div>
		</div>
	)
}
