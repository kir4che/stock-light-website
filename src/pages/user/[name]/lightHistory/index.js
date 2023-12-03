'use client'

import { Button } from '@mui/material'
import { useSession } from 'next-auth/react'
import router from 'next/router'
import { useEffect, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'

const fakeData = [
	{
		create_date: '2023-09-01',
		stockArray: ['台積電', '兆豐金'],
	},
	{
		create_date: '2023-08-30',
		stockArray: ['聯電'],
	},
]

export default function LightHistory() {
	const { data: session } = useSession()
	const [lightHistory, setLightHistory] = useState([])

	const fetchLightHistory = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/lightup/history/${session.user.id}`)
			const data = await response.json()
			setLightHistory(data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (!session) router.push('/login')
	}, [session])

	useEffect(() => {
		fetchLightHistory()
		setLightHistory(fakeData) // 假資料抓取
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
								{item.stockArray.map((stock, index, array) => (
									<p key={index}>
										<span className='px-2.5 py-1 text-sm rounded-full tracking-wide border-secondary_blue border-2 bg-white text-zinc-800'>
											{stock}
										</span>
										{index < array.length - 1 && <span>、</span>}
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
