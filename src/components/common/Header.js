'use client'

import LoginIcon from '@mui/icons-material/Login'
import { Menu, MenuItem } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import BurgerMenu from '@/components/ui/BurgerMenu'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import UserMenu from '@/components/ui/UserMenu'
import pageList from '@/data/pageList.json'

export default function Header() {
	const { data: session } = useSession()
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (e) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	return (
		<div className='fixed left-0 z-50 w-full h-20 px-4 bg-white md:px-8 lg:px-12 dark:bg-zinc-800 flex-center-between'>
			<Link href='/' className='flex items-center space-x-1.5'>
				<Image src='/assets/logo.png' width={32} height={32} alt='logo' />
				<h4>股市光明燈</h4>
			</Link>
			<nav className='hidden mr-auto space-x-3 leading-6 md:ml-4 lg:ml-8 900:flex 1080:space-x-6'>
				{pageList.map((page) => {
					if (page.childPages.length > 0) {
						return (
							<div key={page.url}>
								<button type='button' className='flex flex-col' onClick={handleClick}>
									<span>{page.name}</span>
									<span className='hidden text-xs capitalize 1080:block'>{page.url}</span>
								</button>
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
							<button
								type='button'
								className='flex flex-col'
								onClick={() => router.push(`/${page.url}`)}
								key={page.url}
							>
								<span>{page.name}</span>
								<span className='hidden text-xs capitalize 1080:block'>{page.url}</span>
							</button>
						)
					}
				})}
			</nav>
			<div className='flex-center'>
				<button
					className='border-0 rounded-full md:py-0 md:px-1 flex-center md:border-2 border-primary_yellow hover:bg-primary_yellow/20'
					onClick={() => router.push('/light')}
				>
					<Image src='/assets/lantern-animate.gif' width={40} height={40} alt='lantern' />
					<span className='hidden pr-1 text-sm font-medium md:inline'>
						<span className='hidden lg:inline'>我要</span>
						<span>點燈</span>
					</span>
				</button>
				{session ? (
					<UserMenu session={session} />
				) : (
					<button className='items-center hidden md:ml-2 md:flex' onClick={() => router.push('/login')}>
						<span>登入</span>
						<LoginIcon fontSize='small' />
					</button>
				)}
				<BurgerMenu pageList={pageList} session={session} />
				<DarkModeToggle />
			</div>
		</div>
	)
}
