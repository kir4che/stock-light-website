import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
	const router = useRouter()

	useEffect(() => {
		checkAuthentication()
	}, [])

	const checkAuthentication = async () => {
		const session = await getSession()
		if (!session) router.push('/') // 未登錄時，導回首頁。
	}

	return (
		<div className='py-4 sm:py-12'>
			<h2 className='mb-20 text-center'>會員管理</h2>
			<div className='mx-auto bg-white border shadow-xl border-zinc-50 w-96'>
				<AccountCircleIcon sx={{ fontSize: 120, color: '#4FBAFF' }} className='w-full mx-auto -mt-10' />
				<h3 className='mt-2 text-center'>使用者</h3>
				<div className='h-24'></div>
				<hr className='mt-8' />
				<div className='flex text-center'>
					<button className='w-1/3 p-3 hover:bg-zinc-50'>會員自選股 </button>
					<div className='w-0 border border-zinc-200'></div>
					<button className='w-1/3 p-3 hover:bg-zinc-50'>查詢點燈紀錄 </button>
					<div className='w-0 border border-zinc-200'></div>
					<button className='w-1/3 p-3 hover:bg-zinc-50'>修改密碼</button>
				</div>
			</div>
		</div>
	)
}
