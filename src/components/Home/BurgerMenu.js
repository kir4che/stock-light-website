import CloseIcon from '@mui/icons-material/Close'
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

export default function BurgerMenu({ pages }) {
	const [open, setState] = useState(false)
	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setState(open)
	}

	return (
		<Toolbar className='block md:hidden'>
			<Box
				component='div'
				sx={{
					display: {
						xs: 'none',
						sm: 'block',
					},
				}}
			></Box>
			<IconButton
				aria-label='open drawer'
				onClick={toggleDrawer(true)}
				sx={{
					display: {
						xs: 'block',
						sm: 'none',
					},
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor='right' open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				<Box sx={{ width: 200 }}>
					<IconButton sx={{ my: 1 }}>
						<CloseIcon onClick={toggleDrawer(false)} />
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
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							position: 'absolute',
							bottom: '0',
							left: '50%',
							transform: 'translate(-50%, 0)',
						}}
					></Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
