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
		if (status === 'unauthenticated') router.push('/login')
	}, [session])

	return (
		<StarryBackground className={'grid place-content-center'}>
			{session && (
				<div className='text-zinc-100 w-96 bg-white/20 backdrop-blur-xl dark:bg-zinc-900/50 rounded-xl'>
					<AccountCircleIcon sx={{ fontSize: 120 }} className='w-full mx-auto mt-5 rounded-xl' />
					<p className='font-medium tracking-wider text-center'>{session.user.name}</p>
					<hr className='mt-20' />
					<div className='flex text-center'>
						<button
							type='button'
							onClick={() => router.push(`/user/${session.user.name}/portfolio`)}
							className='w-1/3 p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60'
						>
							會員自選股
						</button>
						<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
						<button
							type='button'
							onClick={() => router.push(`/user/${session.user.name}/lightHistory`)}
							className='w-1/3 p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60'
						>
							查詢點燈紀錄
						</button>
						<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
						<button
							type='button'
							onClick={() => router.push(`/user/${session.user.name}/changePassword`)}
							className='w-1/3 p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60'
						>
							修改密碼
						</button>
					</div>
					<hr />
					<div className='text-center'>
						<button
							type='button'
							onClick={() => router.push(`/user/${session.user.name}/cardHistory`)}
							className='w-full p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60'
						>
							我的卡片
						</button>
					</div>
				</div>
			)}
		</StarryBackground>
	)
}
