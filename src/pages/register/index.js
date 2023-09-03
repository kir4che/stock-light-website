import { getProviders } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SubmitButton from '../../components/Buttons/SubmitButton/SubmitButton'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PrivacyAndTerms from '../../components/PrivacyAndTerms/PrivacyAndTerms'
import StarryBackground from '../../components/StarryBackground/StarryBackground'

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx)
	if (session) return { redirect: { destination: '/login', permanent: false } }

	const providers = await getProviders()
	return { props: { providers: providers ?? [] } }
}

export default function Register({ providers }) {
	const router = useRouter()

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	// 🚩待確認
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
		<StarryBackground className={'flex flex-col items-center justify-center pt-10 pb-12'}>
			<div className='w-full px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='font-extrabold text-zinc-100'>註冊股市光明燈</h3>
				<p className='mt-4 mb-8 text-sm text-zinc-100 opacity-80'>
					已經有帳號了！{' '}
					<Link href={'/login'} className='underline opacity-80'>
						登入
					</Link>
				</p>
				<form className='mb-10 text-sm' onSubmit={handleRegisterSubmit}>
					<lable className='text-zinc-100'>使用者名稱</lable>
					<input
						name='name'
						type='text'
						value={user.name}
						onChange={(e) => setUser({ ...user, name: e.target.value })}
						placeholder='輸入您的使用者名稱'
						className='w-full py-3 pl-3 mt-1 mb-3 border rounded focus:outline-none dark:text-zinc-800 bg-zinc-200'
					/>
					<lable className='text-zinc-100'>Email</lable>
					<input
						name='email'
						type='email'
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						placeholder='輸入您的 Email 帳號'
						className='w-full py-3 pl-3 mt-1 mb-3 border rounded focus:outline-none dark:text-zinc-800 bg-zinc-200'
					/>
					<PasswordInput
						label='密碼'
						value={user.password}
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						placeholder='輸入密碼'
					/>
					<PasswordInput
						label='確認密碼'
						value={user.confirmPassword}
						onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
						placeholder='請重複輸入密碼'
					/>
					<SubmitButton text={'註冊'} />
				</form>
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
