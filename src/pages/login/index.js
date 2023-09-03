import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Facebook, Google, Line } from 'react-bootstrap-icons'
import SubmitButton from '../../components/Buttons/SubmitButton/SubmitButton'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PrivacyAndTerms from '../../components/PrivacyAndTerms/PrivacyAndTerms'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import { getServerAuthSession } from '../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (session) return { redirect: { destination: `/user/${session.user.id}`, permanent: false } }
	const providers = await getProviders()
	return { props: { user: session?.user ?? [], providers: providers ?? [] } }
}

export default function Login({ user, providers }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// 🚩使用帳號密碼登入功能待確認
	const handleLoginSubmit = async (e) => {
		e.preventDefault()

		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		})

		console.log('res', res)

		if (res?.ok) router.push(`/user${user.id}`)
		else alert('登入失敗，請檢查帳號密碼是否正確！', { type: 'error' })
	}

	const providerStyles = {
		google: 'bg-red-500 hover:bg-red-600',
		facebook: 'bg-blue-500 hover:bg-blue-600',
		line: 'bg-green-500 hover:bg-green-600',
	}

	return (
		<StarryBackground className={'flex flex-col items-center justify-center pt-10 pb-12'}>
			<div className='w-full px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='font-extrabold text-zinc-100'>登入股市光明燈</h3>
				<p className='mt-4 mb-8 text-sm text-zinc-100 opacity-80'>
					還沒有帳號嗎？{' '}
					<Link href={'/register'} className='underline opacity-80'>
						註冊新帳號
					</Link>
				</p>
				<form className='mb-10 text-sm' onSubmit={handleLoginSubmit}>
					<lable className='text-zinc-100'>Email</lable>
					<input
						type='email'
						value={user.email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='輸入您的 Email 帳號'
						className='w-full py-3 pl-3 mt-1 mb-3 border rounded focus:outline-none bg-zinc-200'
						required
					/>
					<PasswordInput
						label='密碼'
						value={user.password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='輸入密碼'
					/>
					<SubmitButton text={'登入'} />
				</form>
				<div className='flex items-center w-full mt-8 mb-5 text-sm'>
					<hr className='w-full' />
					<p className='px-4 opacity-40 whitespace-nowrap text-zinc-100'>OR</p>
					<hr className='w-full' />
				</div>
				<div className='flex items-center space-x-2'>
					{Object.values(providers).map(
						(provider, index) =>
							// 跳過自行註冊或登入的按鈕
							index !== 0 && (
								<button
									className={`w-1/3 py-2 rounded-full flex justify-center ${providerStyles[provider.id] || ''}`}
									onClick={() => signIn(provider.id)}
									key={provider.name}
								>
									<div className='text-xl text-zinc-100'>
										{provider.id === 'facebook' ? <Facebook /> : provider.id === 'google' ? <Google /> : <Line />}
									</div>
								</button>
							)
					)}
				</div>
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
