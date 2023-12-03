import Image from 'next/image'

import { useEffect, useState } from 'react'

export default function PrayerCard() {
	// 目前有 10 張祈福小卡
	const cardList = [
		'https://imgur.com/mWzw1OE.png',
		'https://imgur.com/j8QsmaI.png',
		'https://imgur.com/TU4CF9P.png',
		'https://imgur.com/s3RZXMo.png',
		'https://imgur.com/6Ddx5du.png',
		'https://imgur.com/vLxoJjU.png',
		'https://imgur.com/PO8YSRV.png',
		'https://imgur.com/Yrvic6s.png',
		'https://imgur.com/Hl6fskm.png',
		'https://imgur.com/qieOxKe.png',
	]

	const getRandomCard = () => {
		const randomIndex = Math.floor(Math.random() * cardList.length)
		return cardList[randomIndex]
	}

	const [selectedCard, setSelectedCard] = useState(getRandomCard())

	useEffect(() => {
		setSelectedCard(getRandomCard())
	}, [])

	return selectedCard && <Image src={selectedCard} width={680} height={360} alt='pray-card' />
}
