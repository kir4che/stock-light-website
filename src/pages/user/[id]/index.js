import Image from 'next/image'
import { useRouter } from 'next/router'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'
import { getServerAuthSession } from '../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	return { props: { user: session.user } }
}

export default function User({ user }) {
	const router = useRouter()
	const { id } = router.query

	return (
		<StarryBackground className={'grid h-screen place-content-center'}>
			<div className='bg-white w-96 dark:bg-zinc-900/50 rounded-xl'>
				<Image
					src={user.image}
					width={120}
					height={120}
					alt='user-avater'
					className='mx-auto mb-3 -mt-12 rounded-full'
				/>
				<h3 className='text-center'>{user.name}</h3>
				<div className='h-24'></div>
				<hr className='mt-8 dark:border-zinc-500' />
				<div className='flex text-center'>
					{/* 以下功能後續可考慮是否實作 */}
					<button className='w-1/3 p-3 rounded-b-xl hover:bg-zinc-50 hover:dark:bg-zinc-900/60'>會員自選股</button>
					<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
					<button className='w-1/3 p-3 rounded-b-xl hover:bg-zinc-50 hover:dark:bg-zinc-900/60'>查詢點燈紀錄</button>
					<div className='w-0 border dark:border-zinc-500 border-zinc-200' />
					<button className='w-1/3 p-3 rounded-b-xl hover:bg-zinc-50 hover:dark:bg-zinc-900/60'>修改密碼</button>
				</div>
			</div>
		</StarryBackground>
	)
}
