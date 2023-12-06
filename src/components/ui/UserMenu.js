import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserMenu({ session }) {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleUserPage = () => {
		if (session.user) {
			setAnchorEl(null)
			router.push(`/user/${session.user.id}`)
		}
	}

	const handleSignOut = async () => {
		await signOut({
			redirect: true,
			callbackUrl: '/',
		})
	}

	return (
		<>
			<PersonIcon className='ml-2 dark:text-white' onClick={(e) => setAnchorEl(e.currentTarget)} />
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
				<MenuItem onClick={handleUserPage}>會員管理</MenuItem>
				<MenuItem onClick={handleSignOut}>
					<p>登出</p>
					<LogoutIcon sx={{ ml: 0.3 }} fontSize='small' />
				</MenuItem>
			</Menu>
		</>
	)
}
