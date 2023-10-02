import StarryBackground from '@/components/common/StarryBackground'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'
import { Button } from '@mui/material'
import router from 'next/router'
import { useEffect, useState } from 'react'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url

	if (currentURL.includes(session.user.user_id)) return { props: { user: session.user } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

export default function LightHistory() {
	const [lightHistory, setLightHistory] = useState([])

	// useEffect(() => {
	//   fetch(`${process.env.DB_URL}/api/user/lightup/history`)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	//       console.log('點燈紀錄: ', data)
	// 			setGroupData(data)
	// 		})
	// 		.catch((error) => {
	//       console.error('error', error)
	// 		})
	// }, [])

	const fakeData = [
		{
			create_date: '2023-09-01',
			data: [{ stock_name: '台積電' }, { stock_name: '兆豐金' }],
		},
		{
			create_date: '2023-08-30',
			data: [{ stock_name: '聯電' }],
		},
	]

	// 假資料抓取
	useEffect(() => {
		setLightHistory(fakeData)
	}, [])

	return (
		<StarryBackground className={'w-full flex-col flex-center text-zinc-100'}>
			<h3 className='mb-10 text-center'>查詢點燈紀錄</h3>
			<ul className='mb-16 space-y-8'>
				{lightHistory.length !== 0 ? (
					lightHistory.map((item, index) => (
						<div className='flex justify-start max-w-sm mx-auto border-b-zinc-400' key={index}>
							<p>
								<span className='font-light'>{item.create_date}</span> 點燈紀錄：
							</p>
							<div className='flex'>
								{item.data.map((stock, stockIndex, array) => (
									<p key={stockIndex}>
										<span className='px-2.5 py-1 text-sm rounded-full tracking-wide border-secondary_blue border-2 bg-white text-zinc-800'>
											{stock.stock_name}
										</span>
										{stockIndex < array.length - 1 && <span>、</span>}
									</p>
								))}
							</div>
						</div>
					))
				) : (
					<p className='text-center'>目前沒有點燈紀錄！</p>
				)}
			</ul>
			<div className='flex-center'>
				<Button
					variant='contained'
					onClick={() => router.back()}
					className='px-20 rounded-full text-zinc-800 bg-primary_yellow hover:bg-amber-300'
				>
					返回上一頁
				</Button>
			</div>
		</StarryBackground>
	)
}
