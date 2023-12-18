'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function CardHistory() {
	const [cards, setCards] = useState([])

	const fetchCards = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/all/cards`, {
				method: 'GET',
			})

			const data = await response.json()
			if (data.success) setCards(data.data)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchCards()
	}, [])

	return (
		<StarryBackground className='pt-12 text-zinc-100'>
			<Breadcrumbs prevPage='會員管理' curPage='我的小卡' />
			<section className='flex flex-row items-start justify-center min-h-full mt-6'>
				<div className='gap-10 card-grid'>
					{cards.map((card) => (
						<Link href={card.image_link} className='relative list-none card' key={card.card_id}>
							<div className='card__background'>
								<Image src={card.image_link} width={640} height={320} alt='card' />
							</div>
							<div className='absolute top-0 left-0 p-2'>
								<p className='text-sm uppercase'>{card.create_date}</p>
								<h3 className='card__category'>{card.type}</h3>
							</div>
						</Link>
					))}
				</div>
			</section>
		</StarryBackground>
	)
}
