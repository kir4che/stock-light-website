'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function CardHistory() {
	const { data: session } = useSession()
	const token = session?.token

	const [cards, setCards] = useState([])

	const fetchCards = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/all/cards`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			})

			const data = await response.json()
			console.log(data)
			if (data.success) setCards(data.data)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchCards()
	}, [])

	return (
		<StarryBackground className='w-full px-4 pt-6 lg:pt-12 md:px-8 text-zinc-100'>
			<Breadcrumbs prevPage='會員管理' curPage='我的小卡' />
			<section className='flex flex-row items-start min-h-full mt-6'>
				{cards.length > 0 ? (
					cards.map((card) => (
						<div className='gap-10 card-grid'>
							<Link href={card.image_link} className='relative list-none card' key={card.card_id}>
								<div className='card__background'>
									<Image src={card.image_link} width={640} height={320} alt='card' />
								</div>
								<div className='absolute top-0 left-0 p-2'>
									<p className='text-sm uppercase'>{card.create_date}</p>
									<h3 className='card__category'>{card.type}</h3>
								</div>
							</Link>
						</div>
					))
				) : (
					<p>暫無小卡，快到點燈系統保存一張吧！</p>
				)}
			</section>
		</StarryBackground>
	)
}
