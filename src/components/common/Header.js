'use client'

import LoginIcon from '@mui/icons-material/Login'
import { Menu, MenuItem } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import BurgerMenu from '@/components/ui/BurgerMenu'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import UserMenu from '@/components/ui/UserMenu'
import { pageList } from '@/data/pageList'

export default function Header() {
	const { data: session } = useSession()
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (e) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	return (
		<div className='fixed left-0 z-50 w-full px-4 py-1 bg-white sm:px-6 md:px-10 lg:px-16 dark:bg-zinc-800 flex-center-between md:py-4'>
			<Link href='/' className='flex items-center space-x-1.5'>
				<Image src='/assets/logo.png' width={32} height={32} alt='logo' />
				<h4>股市光明燈</h4>
			</Link>
			<nav className='hidden ml-6 mr-auto space-x-3 leading-5 lg:ml-8 lg:pt-1 md:flex lg:space-x-8'>
				{pageList.map((page) => {
					if (page.childPages.length > 0) {
						return (
							<div key={page.url}>
								<p className='cursor-pointer' onClick={handleClick}>
									<span>{page.name}</span>
									<span className='hidden text-sm capitalize lg:block'>{page.url}</span>
								</p>
								<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
									{page.childPages.map((childPage) => {
										return (
											<MenuItem key={childPage.url} onClick={() => router.push(`/${page.url}/${childPage.url}`)}>
												{childPage.name}
											</MenuItem>
										)
									})}
								</Menu>
							</div>
						)
					} else {
						return (
							<Link href={`/${page.url}`} key={page.url}>
								<span>{page.name}</span>
								<span className='hidden text-sm capitalize lg:block'>{page.url}</span>
							</Link>
						)
					}
				})}
			</nav>
			<div className=' flex-center md:space-x-2 xl:space-x-3'>
				<Image src='/assets/lantern-animate.gif' width={44} height={44} />
				<button
					type='button'
					className={`hidden md:block px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 ease-out rounded-full dark:text-zinc-800 bg-primary_yellow hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow dark:hover:ring-offset-zinc-900 ${
						session ? 'mr-3 md:mr-0' : ''
					}`}
					onClick={() => router.push('/light')}
				>
					我要點燈
				</button>
				<button
					className='w-8 p-1 mr-0.5 rounded-full md:hidden hover:bg-primary_yellow/20'
					onClick={() => router.push('/light')}
				>
					<Image src='/assets/lantern.png' width={28} height={28} alt='line' />
				</button>
				{session ? (
					<UserMenu session={session} />
				) : (
					<button className='items-center hidden md:flex' onClick={() => router.push('/login')}>
						<span>登入</span>
						<LoginIcon sx={{ ml: 0.3 }} fontSize='small' />
					</button>
				)}
				<BurgerMenu pageList={pageList} session={session} />
				<DarkModeToggle />
			</div>
		</div>
	)
}
