import { getProviders, getSession, signIn } from 'next-auth/react'
import Image from 'next/image'

export default function SignIn({ providers }) {
	return (
		<div className='max-w-lg py-4 mx-auto text-center sm:py-10'>
			<div className='mx-auto'>
				<div className='p-6 shadow-xl sm:px-20 sm:py-16 sm:rounded-xl'>
					<h2 className='mb-10 font-bold'>會員登入／註冊</h2>
					<div className='space-y-4'>
						{Object.values(providers).map((provider) => (
							<button
								className='flex items-center justify-center w-full py-2.5 space-x-2 border rounded-lg border-slate-200 hover:shadow'
								onClick={() => signIn(provider.id)}
								key={provider.name}
							>
								<Image
									src={`https://img.icons8.com/color/48/${
										provider.id === 'facebook' ? 'facebook-new' : provider.id === 'google' ? 'google-logo' : 'line-me'
									}.png`}
									width={provider.id === 'google' ? 30 : 38} // 谷歌图标宽度较小
									height={provider.id === 'google' ? 30 : 38} // 谷歌图标高度较小
									alt={`${provider.name}-logo`}
								/>
								<p>使用 {provider.name} 登入</p>
							</button>
						))}
					</div>
					<div className='mt-20 sm:-mb-8'>
						<p className='text-xs'>
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
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)
	if (session) return { redirect: { destination: '/dashboard', permanent: false } }

	const providers = await getProviders()
	return {
		props: { providers: providers ?? [] },
	}
}
