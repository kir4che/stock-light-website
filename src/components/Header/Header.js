'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { BoxArrowInRight } from 'react-bootstrap-icons'
import Link from '../../../node_modules/next/link'
import { navigationLinks } from '../../data/navigationLinks'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle'
import UserMenu from './UserMenu/UserMenu'

export default function Header() {
	const { data: session } = useSession()

	return (
		<div className='flex items-center justify-between py-1 mx-auto md:py-4'>
			<Link href='/' className='flex items-center space-x-1'>
				<Image src='/favicon.ico' width={32} height={32} alt='股市光明燈' />
				<h4 className='font-medium'>股市光明燈</h4>
			</Link>
			<nav className='hidden ml-6 mr-auto space-x-3 leading-5 lg:ml-8 lg:pt-1 md:flex lg:space-x-8'>
				{navigationLinks.map((link) => (
					<Link href={`/${link.url}`} key={link.url}>
						<span>{link.name}</span>
						<span className='hidden text-sm capitalize lg:block'>{link.url}</span>
					</Link>
				))}
			</nav>
			<div className='flex items-center md:space-x-2 lg:space-x-3 xl:space-x-4'>
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
					<Link href={'/login'} className='hidden md:space-x-0.5 md:flex md:items-center'>
						<span>登入</span>
						<BoxArrowInRight size={20} />
					</Link>
				)}
				<BurgerMenu navigationLinks={navigationLinks} session={session} />
				<DarkModeToggle />
			</div>
		</div>
	)
}
