import { useRouter } from 'next/router'
import { PersonCircle } from 'react-bootstrap-icons'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'

export default function Dashboard() {
	const router = useRouter()
	const { userId } = router.query

	return (
		<StarryBackground className={'grid h-screen place-content-center'}>
			<div className='w-96 dark:bg-zinc-900/50 rounded-xl'>
				<PersonCircle size={120} className='mx-auto mb-3 -mt-12' />
				<h3 className='text-center'>使用者名稱</h3>
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
