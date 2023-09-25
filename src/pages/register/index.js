import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import PrivacyAndTerms from '@/components/ui/PrivacyAndTerms'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Register() {
	const router = useRouter()

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleRegisterSubmit = async (e) => {
		e.preventDefault()

		if (user.password !== user.confirmPassword) {
			alert('密碼與確認密碼不相符，請重新輸入！', { type: 'error' })
			return
		}

		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: user.name,
					email: user.email,
					password: user.password,
				}),
			})

			if (response.ok) router.push('/login')
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<StarryBackground className={'flex-col flex-center pt-10 pb-12'}>
			<div className='w-full px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='text-zinc-100'>註冊股市光明燈</h3>
				<p className='mt-4 mb-8 text-sm text-zinc-100 opacity-80'>
					已經有帳號了！{' '}
					<Link href={'/login'} className='underline opacity-80'>
						登入
					</Link>
				</p>
				<InputField
					label='使用者名稱'
					type='text'
					onChange={(e) => setUser({ ...user, name: e.target.value })}
					placeholder='輸入您的使用者名稱'
				/>
				<InputField
					label='Email'
					type='email'
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					placeholder='輸入您的 Email 帳號'
				/>
				<InputField
					label='密碼'
					type='password'
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					placeholder='輸入密碼'
				/>
				<InputField
					label='密碼'
					type='password'
					onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
					placeholder='確認密碼'
				/>
				<Button
					type='submit'
					size='large'
					fullWidth
					onClick={handleRegisterSubmit}
					className='mt-6 text-zinc-100 bg-secondary_blue hover:bg-sky-500'
				>
					註冊
				</Button>
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
