import Image from 'next/image'

import { cardList } from '@/data/cardList'
import { useEffect } from 'react'

export default function PrayerCard() {
	const randomId = Math.floor(Math.random() * cardList.length);
	const setselectedCard = cardList[randomId];

	

	useEffect(() => {
		//...
	}, [])

	return (
		<>
			<Image src={setselectedCard.img_url} width={680} height={360} alt={setselectedCard.id} key={setselectedCard.id} />

			{/* {
				cardList.map((card) => (
					<Image src={card.img_url} width={680} height={360} alt={card.id} key={card.id} />
				))} */}
		</>
	)
}
