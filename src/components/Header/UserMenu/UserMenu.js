import { Menu, MenuItem } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PersonFill, Unindent } from 'react-bootstrap-icons'

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
			<PersonFill fontSize={22} onClick={handleClick} />
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleUserPage} style={{ cursor: 'pointer' }}>
					使用者頁面
				</MenuItem>
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
