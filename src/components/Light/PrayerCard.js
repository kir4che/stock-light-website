import Image from 'next/image'

import { cardList } from '@/data/cardList'
import { useEffect } from 'react'

export default function PrayerCard() {

	// const randomId = Math.floor(Math.random() * cardList.length);
	// const setselectedCard = randomId;

	useEffect(() => {
		//...
	}, [])

	return (
		<>
			{
				cardList.map((card) => (
					<Image src={card.img_url} width={680} height={360} alt={card.id} key={card.id} />
				))}
		</>
	)
}
