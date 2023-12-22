import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, Drawer, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

export default function BurgerMenu({ pageList, userData }) {
	const [open, setState] = useState(false)

	const toggleDrawer = (open) => (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return
		setState(open)
	}

	return (
		<Toolbar className='flex px-2 900:hidden'>
			<MenuIcon className='cursor-pointer dark:text-white' onClick={toggleDrawer(true)} />
			<Drawer anchor='right' open={open}>
				<Box sx={{ width: 240, height: '100%', pl: 1 }} className='dark:bg-zinc-800 dark:text-zinc-100'>
					<CloseIcon
						className='float-right m-4 cursor-pointer dark:text-zinc-100 opacity-80 hover:opacity-60'
						onClick={toggleDrawer(false)}
					/>
					<Box className='mt-8'>
						{pageList.map((page) => {
							if (page.childPages.length > 0) {
								return (
									<div key={page.url}>
										<ListItemText primary={page.name} className='py-2 pl-4' />
										{page.childPages.map((childPage) => {
											return (
												<ListItemButton key={childPage.url} onClick={toggleDrawer(false)}>
													<Link href={`/${page.url}/${childPage.url}`}>
														<ListItemText primary={childPage.name} className='pl-6' />
													</Link>
												</ListItemButton>
											)
										})}
									</div>
								)
							} else {
								return (
									<ListItemButton key={page.url} onClick={toggleDrawer(false)}>
										<Link href={`/${page.url}`}>
											<ListItemText primary={page.name} />
										</Link>
									</ListItemButton>
								)
							}
						})}
						{!userData && (
							<>
								<hr className='mt-10 mb-2' />
								<ListItemButton onClick={toggleDrawer(false)}>
									<Link href={'/login'} className='flex items-center'>
										<span>登入</span>
										<LoginIcon sx={{ ml: 0.3 }} fontSize='small' />
									</Link>
								</ListItemButton>
							</>
						)}
					</Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
