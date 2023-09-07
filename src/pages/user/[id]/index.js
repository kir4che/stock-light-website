import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import { useRouter } from 'next/router'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'
import { getServerAuthSession } from '../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	if (currentURL.includes(session.user.id)) return { props: { user: session.user } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

export default function User({ user }) {
	const router = useRouter()

	return (
		<StarryBackground className={'grid h-screen place-content-center'}>
			<div className='text-zinc-100 w-96 bg-white/20 backdrop-blur-xl dark:bg-zinc-900/50 rounded-xl'>
				{user.image ? (
					<Image
						src={user.image}
						width={400}
						height={400}
						alt='user-avater'
						className='w-32 mx-auto mb-3 -mt-12 rounded-full'
					/>
				) : (
					<AccountCircleIcon
						sx={{ fontSize: 120 }}
						className='w-full mx-auto bg-white dark:bg-zinc-900/10 rounded-xl'
					/>
				)}
				<h3 className='text-center'>{user.name}</h3>
				<div className='h-24' />
				<hr className='mt-8' />
				<div className='flex text-center'>
					<button
						type='button'
						onClick={() => router.push(`/user/${user.id}/portfolio`)}
						className={`${
							user.image.includes('google') || user.image.includes('facebook') ? 'w-1/2' : 'w-1/3'
						} p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60`}
					>
						會員自選股
					</button>
					<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
					<button
						type='button'
						onClick={() => router.push(`/user/${user.id}/lightHistory`)}
						className={`${
							user.image.includes('google') || user.image.includes('facebook') ? 'w-1/2' : 'w-1/3'
						} p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60`}
					>
						查詢點燈紀錄
					</button>
					<div
						className={`${
							user.image.includes('google') || user.image.includes('facebook')
								? 'hidden'
								: 'w-0 border dark:border-zinc-500 border-zinc-200'
						} `}
					/>
					<button
						type='button'
						onClick={() => router.push(`/user/${user.id}/changePassword`)}
						className={`${
							user.image.includes('google') || user.image.includes('facebook') ? 'hidden' : 'w-1/3'
						} p-3 focus:outline-none hover:bg-zinc-900/10 hover:dark:bg-zinc-900/60`}
					>
						修改密碼
					</button>
				</div>
			</div>
		</StarryBackground>
	)
}
