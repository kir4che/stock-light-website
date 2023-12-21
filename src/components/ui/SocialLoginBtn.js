import { Tooltip } from '@mui/material'
import { signIn } from 'next-auth/react'

export default function SocialLoginBtn() {
	const handleLogin = async (provider) => {
		try {
			await signIn(provider, { redirect: false })
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	return (
		<div>
			<div className='w-full gap-2 text-sm flex-center text-zinc-300 dark:text-zinc-400'>
				<div className='w-full h-px bg-zinc-300 dark:bg-zinc-400/50' />
				或
				<div className='w-full h-px bg-zinc-300 dark:bg-zinc-400/50' />
			</div>
			<div className='grid grid-cols-2 gap-4 mt-4 mb-8'>
				{['google', 'facebook'].map((provider) => (
					<Tooltip
						title='誠心建議註冊本網站帳號，以便體驗更多功能！'
						placement='top-start'
						componentsProps={{
							tooltip: {
								sx: {
									color: '#40B4FF',
									backgroundColor: '#fff',
									border: '1px solid #40B4FF',
									borderRadius: '8px',
									fontSize: '0.8rem',
									margin: '0 0 0 7rem',
									lineHeight: '1.25rem',
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
						<button
							className='w-full px-8 py-2 text-sm font-medium rounded-md bg-zinc-100 flex-center'
							onClick={() => handleLogin(provider)}
							key={provider}
						>
							<img
								className={provider === 'google' ? 'w-6 h-6' : 'w-8 h-8'}
								src={`https://img.icons8.com/color/72/${provider === 'google' ? 'google-logo' : 'facebook-new'}.png`}
								alt={provider}
							/>
						</button>
					</Tooltip>
				))}
			</div>
		</div>
	)
}
