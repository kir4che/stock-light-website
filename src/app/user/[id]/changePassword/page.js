'use client'

import { Alert, Button, Snackbar } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import InputField from '@/components/ui/InputField'

export default function ChangePassword() {
	const { data: session } = useSession()

	const [isSucceeded, setIsSucceeded] = useState(false)
	const [newData, setNewData] = useState({
		newPassword: '',
		confirmPassword: '',
	})
	const { newPassword, confirmPassword } = newData

	const handleChange = async (e) => {
		e.preventDefault()

		if (newPassword === '' || confirmPassword === '') {
			alert('請輸入新密碼！', { type: 'error' })
			return
		} else if (newPassword !== confirmPassword) {
			alert('密碼與確認密碼不相符，請重新輸入！', { type: 'error' })
			setNewData({
				newPassword: '',
				confirmPassword: '',
			})
			return
		}

		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/update/password`, {
				method: 'PATCH',
				body: JSON.stringify({
					password: newData.newPassword,
				}),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: session.token,
				},
			})
			if (response.ok) setIsSucceeded(true)
			else alert('修改失敗，請稍後再試！')
		} catch (error) {
			console.error('Error: ', error)
		} finally {
			setNewData({
				newPassword: '',
				confirmPassword: '',
			})
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setIsSucceeded(false)
		}, 3000)
	}, [isSucceeded])

	return (
		<StarryBackground className='pt-12 pb-9 sm:pt-20 sm:pb-16 text-zinc-100'>
			<div className='w-full mx-auto sm:max-w-md lg:max-w-lg'>
				<Breadcrumbs prevPage='會員管理' curPage='修改密碼' />
			</div>
			<div className='w-full p-10 pb-12 mx-auto mb-8 sm:max-w-md lg:max-w-lg sm:px-12 bg-white/20 backdrop-blur-xl sm:rounded-xl dark:bg-zinc-900/50'>
				<h2>修改密碼</h2>
				<form className='flex flex-col mt-8'>
					<InputField
						label={'新密碼'}
						type={'password'}
						value={newPassword}
						onChange={(e) => setNewData({ ...newData, newPassword: e.target.value })}
					/>
					<InputField
						label={'請再輸入一次新密碼'}
						type={'password'}
						value={confirmPassword}
						onChange={(e) => setNewData({ ...newData, confirmPassword: e.target.value })}
					/>
					<Button
						variant='contained'
						className='py-2.5 mt-8 text-zinc-800 bg-primary_yellow hover:bg-amber-300'
						onClick={handleChange}
					>
						修改
					</Button>
					<Snackbar open={isSucceeded} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
						<Alert severity='success' onClose={() => setIsSucceeded(false)}>
							修改成功！
						</Alert>
					</Snackbar>
				</form>
			</div>
		</StarryBackground>
	)
}
