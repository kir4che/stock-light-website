import { getProviders, getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { Facebook, Google, Line } from 'react-bootstrap-icons'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import StarryBackground from '../../components/StarryBackground/StarryBackground'

export default function Login({ providers }) {
	return (
		<StarryBackground className={'flex flex-col items-center justify-center py-6 sm:py-12'}>
			<div className='w-full px-5 pt-8 pb-5 bg-white dark:bg-zinc-900/50 sm:px-10 sm:border dark:border-none sm:rounded-xl sm:shadow-lg sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='font-extrabold'>登入股市光明燈</h3>
				<p className='mt-4 text-sm text-zinc-600 dark:text-zinc-300'>
					還沒有帳號嗎？{' '}
					<Link href={'/signup'} className='underline opacity-80'>
						註冊新帳號
					</Link>
				</p>
				<div className='space-y-3'>
					<div className='mt-6 space-y-1'>
						<lable className='text-sm'>Email</lable>
						<input
							placeholder='輸入您的 Email 帳號'
							type='email'
							className='w-full py-3 pl-3 text-xs border rounded bg-zinc-200'
						/>
					</div>
					<PasswordInput label='密碼' placeholder='輸入密碼' />
				</div>
				<button className='w-full py-3 mt-8 rounded-md text-zinc-100 bg-secondary_blue hover:bg-secondary_blue/90'>
					登入
				</button>
				<div className='flex items-center w-full mt-8 mb-5 text-sm'>
					<hr className='w-full' />
					<p className='px-4 opacity-40 whitespace-nowrap'>OR</p>
					<hr className='w-full' />
				</div>
				<div className='flex items-center space-x-2'>
					{Object.values(providers).map((provider) => (
						<button
							className={`w-1/3 py-2 rounded-full flex justify-center ${
								provider.id === 'google'
									? 'bg-red-500 hover:bg-red-600'
									: provider.id === 'facebook'
									? 'bg-blue-500 hover:bg-blue-600'
									: provider.id === 'line'
									? 'bg-green-500 hover:bg-green-600'
									: ''
							}`}
							onClick={() => signIn(provider.id)}
							key={provider.name}
						>
							<div className='text-xl text-zinc-100'>
								{provider.id === 'facebook' ? <Facebook /> : provider.id === 'google' ? <Google /> : <Line />}
							</div>
						</button>
					))}
				</div>
				<p className='mt-16 text-xs'>
					By proceeding, you agree to our{' '}
					<a href='#' className='underline'>
						Terms of Use
					</a>{' '}
					and confirm you have read our{' '}
					<a href='#' className='underline'>
						Privacy and Cookie Statement
					</a>
					.
				</p>
			</div>
		</StarryBackground>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	// 登入後自動跳轉到首頁
	if (session) return { redirect: { destination: '/', permanent: false } }

	const providers = await getProviders()
	return { props: { providers: providers ?? [] } }
}
