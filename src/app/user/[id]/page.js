'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import StarryBackground from '@/components/common/StarryBackground'

export default function User() {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		console.log('session', session)
		if (status === 'unauthenticated' && session) router.push('/login')
	}, [status, session])

	const renderBtn = (label, path) => (
		<button
			onClick={() => router.push(`/user/${session.user.id}/${path}`)}
			className='w-1/3 p-3 focus:outline-none text-zinc-100 hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60'
		>
			{label}
		</button>
	)

	return (
		<StarryBackground className={'grid place-content-center'}>
			{session && (
				<div className='text-zinc-100 w-96 bg-white/20 backdrop-blur-xl dark:bg-zinc-900/50 rounded-xl'>
					<AccountCircleIcon sx={{ fontSize: 120 }} className='w-full mx-auto mt-5 rounded-xl' />
					<p className='pb-8 font-medium tracking-wider text-center'>{session.user.name}</p>
					{session.provider !== 'facebook' && session.provider !== 'google' && (
						<>
							<hr className='mt-10' />
							<div className='flex text-center'>
								{renderBtn('會員自選股', 'portfolio')}
								<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
								{renderBtn('我的卡片', 'cardHistory')}
								<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
								{renderBtn('修改密碼', 'changePassword')}
							</div>
						</>
					)}
				</div>
			)}
		</StarryBackground>
	)
}
