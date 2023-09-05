import { Alert, Button, Snackbar } from '@mui/material'
import router from 'next/router'
import { useState } from 'react'
import InputField from '../../../../components/InputField/InputField'
import StarryBackground from '../../../../components/StarryBackground/StarryBackground'

export default function ChangePassword() {
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [open, setOpen] = useState(false)

	// 🚩修改密碼功能：待檢查
	const handlePasswordChange = async (e) => {
		e.preventDefault()

		if (newPassword !== confirmPassword) {
			alert('密碼與確認密碼不相符，請重新輸入！', { type: 'error' })
			setNewPassword('')
			setConfirmPassword('')
			return
		}

		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/update/password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: newPassword,
				}),
			})

			if (response.ok) setOpen(true)
			else alert('修改失敗，請稍後再試！', { type: 'error' })
		} catch (error) {
			console.log('error', error)
		}

		setNewPassword('')
		setConfirmPassword('')
	}

	return (
		<StarryBackground className={'pt-12 pb-9 sm:pt-20 sm:pb-16 text-zinc-100'}>
			<p className='w-full mx-auto mb-3 text-xs sm:max-w-md lg:max-w-lg text-zinc-100'>
				<button type='button' onClick={() => router.back()}>
					使用者頁面
				</button>
				／修改密碼
			</p>
			<div className='w-full px-10 pt-10 mx-auto mb-8 pb-14 sm:max-w-md lg:max-w-lg sm:px-12 bg-white/20 backdrop-blur-xl sm:rounded-xl dark:bg-zinc-900/50'>
				<h2 className='mb-3 tracking-wide'>修改密碼</h2>
				<form className='flex flex-col mt-8'>
					<InputField
						label={'新密碼'}
						type={'password'}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<InputField
						label={'請再輸入一次新密碼'}
						type={'password'}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button
						variant='contained'
						className='py-2.5 mt-8 text-zinc-800 bg-primary_yellow hover:bg-amber-300'
						onClick={handlePasswordChange}
					>
						修改
					</Button>
					<Snackbar
						open={open}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
						autoHideDuration={6000}
						onClose={() => setOpen(false)}
					>
						<Alert severity='success' onClose={() => setOpen(false)}>
							修改成功！
						</Alert>
					</Snackbar>
				</form>
			</div>
		</StarryBackground>
	)
}
