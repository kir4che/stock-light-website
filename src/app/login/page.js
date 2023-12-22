'use client'

import { Tooltip } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import SocialLoginBtn from '@/components/Login/SocialLoginBtn'
import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import PrivacyAndTerms from '@/components/ui/PrivacyAndTerms'
import SubmitBtn from '@/components/ui/SubmitBtn'

export default function Login() {
	const { data: session } = useSession()
	const router = useRouter()

	const [isTipOpen, setIsTipOpen] = useState(false)
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const handleLogin = async (e) => {
		e.preventDefault()

		if (!userData.email || !userData.password) return alert('請輸入帳號密碼！')

		try {
			const responce = await signIn('credentials', {
				email: userData.email,
				password: userData.password,
				redirect: false,
			})
			if (!responce.ok) alert('登入失敗，請重新登入！')
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		setIsTipOpen(true)
		setTimeout(() => setIsTipOpen(false), 7500)
	}, [])

	useEffect(() => {
		if (session) router.push(`/user/${session.user.id}`)
	}, [session])

	return (
		<StarryBackground className='flex-col flex-center'>
			<div className='px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='text-zinc-100'>登入股市光明燈</h3>
				<p className='mt-4 mb-8 space-x-1 text-sm text-zinc-100 opacity-80'>
					<span>還沒有帳號嗎？</span>
					<Tooltip
						title='誠心建議註冊本網站帳號，以便體驗更多功能！'
						placement={window.innerWidth < 500 ? 'top-start' : 'right'}
						open={isTipOpen}
						onOpen={() => setIsTipOpen(true)}
						onClose={() => setIsTipOpen(false)}
						componentsProps={{
							tooltip: {
								sx: {
									color: '#3D4664',
									backgroundColor: '#fff',
									border: '1px solid #3D4664',
									borderRadius: '8px',
									fontSize: '0.8rem',
								},
							},
							arrow: {
								sx: {
									color: '#fff',
								},
							},
						}}
						arrow
					>
						<Link href={'/register'} className='underline opacity-80'>
							註冊新帳號
						</Link>
					</Tooltip>
				</p>
				<InputField
					label='Email'
					type='email'
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					placeholder='輸入您的 Email'
				/>
				<InputField
					label='密碼'
					type='password'
					onChange={(e) => setUserData({ ...userData, password: e.target.value })}
					placeholder='輸入密碼'
				/>
				<SubmitBtn text='登入' handleSubmit={handleLogin} style='mt-5 mb-8' />
				<SocialLoginBtn />
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
