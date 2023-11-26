import Image from 'next/image'

import { useEffect, useState } from 'react'

export default function PrayerCard() {
	const cardList = [
		{
			id: 1,
			img_url: 'https://imgur.com/h4ICpmE.png',
		},
		{
			id: 2,
			img_url: 'https://i.imgur.com/bZOT3Sq.png',
		},
		{
			id: 3,
			img_url: 'https://i.imgur.com/odLPGpp.png',
		},
	]

	const [selectedCard, setSelectedCard] = useState(null)

	useEffect(() => {
		const randomId = Math.floor(Math.random() * cardList.length)
		const random_card = cardList[randomId]
		setSelectedCard(random_card)
	}, [])

	return (
		<>
			{selectedCard && (
				<Image src={selectedCard.img_url} width={680} height={360} alt={selectedCard.id} key={selectedCard.id} />
			)}
		</>
	)
}
