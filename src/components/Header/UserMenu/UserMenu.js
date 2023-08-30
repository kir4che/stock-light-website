'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Unindent } from 'react-bootstrap-icons'

export default function UserMenu() {
	const router = useRouter()
	const { data: session } = useSession()

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
				{/* 後續新增 */}
				<Link href={`/user/${session.id_token}`}>
					<MenuItem onClick={handleClose}>使用者頁面</MenuItem>
				</Link>
				<Link href={'/'}>
					<MenuItem className='space-x-1' onClick={handleSignOut}>
						<p>登出</p>
						<Unindent size={20} />
					</MenuItem>
				</Link>
			</Menu>
		</>
	)
}
