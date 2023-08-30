import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import { useState } from 'react'
import { X as Close } from 'react-bootstrap-icons'

export default function BurgerMenu({ session, navigationLinks }) {
	const [open, setState] = useState(false)

	const toggleDrawer = (open) => (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return
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
				className='dark:text-zinc-100'
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
					<Close
						className='float-right m-2 text-3xl cursor-pointer opacity-80 hover:opacity-60'
						onClick={toggleDrawer(false)}
					/>
					<Divider sx={{ mb: 2 }} />
					<Box>
						{navigationLinks.map((page) => (
							<ListItemButton key={page.url}>
								<Link href={`/${page.url}`} key={page.url}>
									<ListItemText primary={page.name} />
								</Link>
							</ListItemButton>
						))}
						{!session ? (
							<button type='button' className='absolute flex items-center space-x-1 left-4 bottom-10'>
								<span>登入／註冊</span>
								<LoginIcon fontSize='small' />
							</button>
						) : null}
					</Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
