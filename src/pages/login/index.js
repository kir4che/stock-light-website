import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import PrivacyAndTerms from '@/components/ui/PrivacyAndTerms'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'
import { Button } from '@mui/material'
import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (session) return { redirect: { destination: `/user/${session.user.id}`, permanent: false } }
	else return { props: { providers: await getProviders() } }
}

export default function Login({ providers }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// const providerStyles = {
	// 	google: 'bg-red-500 hover:bg-red-600',
	// 	facebook: 'bg-blue-500 hover:bg-blue-600',
	// }

	const handleLogin = async (e) => {
		e.preventDefault()

		const res = await signIn('credentials', {
			email,
			password,
		})

		if (res.error) alert('帳號或密碼有誤！')
	}

	return (
		<StarryBackground className={'flex-col h-[100vh-72px] flex-center'}>
			<div className='w-full px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='text-zinc-100'>登入股市光明燈</h3>
				<p className='mt-4 mb-8 text-sm text-zinc-100 opacity-80'>
					還沒有帳號嗎？{' '}
					<Link href={'/register'} className='underline opacity-80'>
						註冊新帳號
					</Link>
				</p>
				<InputField
					label='Email'
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					placeholder='輸入您的 Email（測試用: test@gmail.com）'
				/>
				<InputField
					label='密碼'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='輸入密碼（測試用: 12345）'
				/>
				<Button
					type='submit'
					size='large'
					fullWidth
					onClick={handleLogin}
					className='mt-6 mb-10 text-zinc-100 bg-secondary_blue hover:bg-sky-500'
				>
					登入
				</Button>
				{/* <div className='flex items-center mb-5 text-sm mt-14'>
					<hr className='w-full' />
					<p className='px-4 opacity-40 whitespace-nowrap text-zinc-100'>OR</p>
					<hr className='w-full' />
				</div>
				<div className='flex items-center space-x-3'>
					{Object.values(providers).map(
						(provider, index) =>
							// 跳過自行註冊或登入的按鈕
							index !== 0 && (
								<button
									className={`w-1/2 py-2 rounded-full flex-center ${providerStyles[provider.id] || ''}`}
									onClick={() => signIn(provider.id)}
									key={provider.name}
								>
									{provider.id === 'facebook' ? (
										<FacebookIcon className='text-white dark:text-white' />
									) : (
										<GoogleIcon className='text-white dark:text-white' />
									)}
								</button>
							)
					)}
				</div> */}
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
