import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserMenu({ session }) {
	const router = useRouter()

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (e) => setAnchorEl(e.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const handleUserPage = () => {
		if (session.user) {
			handleClose()
			router.push(`/user/${session.user.name}`)
		}
	}

	const handleSignOut = async () => {
		await signOut()
		router.push('/')
	}

	return (
		<>
			<PersonIcon className='ml-2 dark:text-white' onClick={handleClick} />
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleUserPage} style={{ cursor: 'pointer' }}>
					會員管理
				</MenuItem>
				<MenuItem onClick={handleSignOut}>
					<p>登出</p>
					<LogoutIcon sx={{ ml: 0.3 }} fontSize='small' />
				</MenuItem>
			</Menu>
		</>
	)
}
