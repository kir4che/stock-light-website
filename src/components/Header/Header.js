'use client'

import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import Link from '../../../node_modules/next/link'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle'

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
		{
			name: '版本資訊',
			url: 'version',
		},
	]

	return (
		<header className='bg-white dark:bg-zinc-900'>
			<div className='flex items-center justify-between px-4 py-2 mx-auto md:justify-start md:px-0 md:py-4'>
				<Link href='/' className='flex items-center'>
					<Image src='/favicon.ico' width={32} height={32} alt='股市光明燈' />
					<h4 className='ml-1 font-medium'>股市光明燈</h4>
				</Link>
				<nav className='hidden ml-8 mr-auto space-x-4 leading-4 md:flex lg:space-x-8'>
					{pages.map((page) => (
						<Link href={page.url} key={page.url}>
							<p className='text-sm'>{page.name}</p>
							<span className='hidden text-xs capitalize lg:block'>{page.url}</span>
						</Link>
					))}
				</nav>
				<div className='flex items-center md:space-x-2 lg:space-x-3 xl:space-x-4'>
					<Link href={'/light'}>
						<button
							type='button'
							className='block px-4 py-1 text-sm transition-all duration-300 ease-out border-0 rounded-full text-zinc-800 bg-primary_yellow focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow hover:ring-offset-gray-900'
						>
							我要點燈
						</button>
					</Link>
					<button type='button' className='hidden space-x-1 text-sm md:block' onClick={signIn}>
						<span>登入／註冊</span>
						<LogoutIcon fontSize='small' />
					</button>
					<BurgerMenu pages={pages} />
					<DarkModeToggle />
				</div>
			</div>
		</header>
	)
}

function BurgerMenu({ pages }) {
	const [open, setState] = useState(false)
	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
		setState(open)
	}

	return (
		<Toolbar className='flex px-1 m-0 md:hidden'>
			<Box
				component='div'
				sx={{
					display: {
						sm: 'none',
						md: 'flex',
					},
				}}
			></Box>
			<IconButton
				className='dark:text-white'
				aria-label='open drawer'
				onClick={toggleDrawer(true)}
				sx={{
					display: {
						sm: 'flex',
						md: 'none',
					},
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor='right' open={open}>
				<Box sx={{ width: 240 }}>
					<IconButton sx={{ my: 1 }} onClick={toggleDrawer(false)}>
						<CloseIcon />
					</IconButton>
					<Divider sx={{ mb: 2 }} />
					<Box>
						{pages.map((page) => (
							<ListItemButton key={page.url}>
								<Link href={page.url} key={page.url}>
									<ListItemText primary={page.name} />
								</Link>
							</ListItemButton>
						))}
						<button type='button' className='ml-3.5 absolute bottom-10 space-x-1'>
							<span>登入／註冊</span>
							<LogoutIcon fontSize='small' />
						</button>
					</Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
