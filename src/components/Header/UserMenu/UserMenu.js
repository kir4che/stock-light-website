'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function UserMenu() {
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (e) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const handleSignOut = async () => {
		await signOut()
		router.push('/')
	}

	return (
		<>
			<AccountCircleIcon
				id='basic-button'
				fontSize='medium'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			/>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Link href={'/dashboard'}>
					<MenuItem onClick={handleClose}>用戶頁面</MenuItem>
				</Link>
				<Link href={'/'}>
					<MenuItem onClick={handleSignOut}>
						登出
						<LogoutIcon fontSize='small' />
					</MenuItem>
				</Link>
			</Menu>
		</>
	)
}
