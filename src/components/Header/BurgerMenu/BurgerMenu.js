import { Box, Drawer, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { X as Close, List } from 'react-bootstrap-icons'

export default function BurgerMenu({ navigationLinks }) {
	const [open, setState] = useState(false)

	const toggleDrawer = (open) => (e) => {
		if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return
		setState(open)
	}

	return (
		<Toolbar className='flex px-2 md:hidden'>
			<List size={28} className='cursor-pointer' onClick={toggleDrawer(true)} />
			<Drawer anchor='right' open={open}>
				<Box sx={{ width: 240 }}>
					<Close
						size={28}
						className='float-right m-2 cursor-pointer opacity-80 hover:opacity-60'
						onClick={toggleDrawer(false)}
					/>
					<Box className='mt-10'>
						{navigationLinks.map((page) => (
							<ListItemButton key={page.url}>
								<Link href={`/${page.url}`}>
									<ListItemText primary={page.name} />
								</Link>
							</ListItemButton>
						))}
					</Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
