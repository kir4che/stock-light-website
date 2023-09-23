import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserMenu({ session }) {
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (e) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const handleUserPage = () => {
		if (session && session.user) {
			handleClose()
			router.push(`/user/${session.user.id}`)
		}
	}

	const handleSignOut = async () => {
		await signOut()
		router.push('/')
	}

	return (
		<>
			<PersonIcon className='dark:text-white' onClick={handleClick} />
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleUserPage} style={{ cursor: 'pointer' }}>
					使用者頁面
				</MenuItem>
				<Link href={'/'}>
					<MenuItem onClick={handleSignOut}>
						<p>登出</p>
						<LogoutIcon sx={{ ml: 0.3 }} fontSize='small' />
					</MenuItem>
				</Link>
			</Menu>
		</>
	)
}
