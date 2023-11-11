import Image from 'next/image'

import { cardList } from '@/data/cardList'
import { useEffect, useState } from 'react'

export default function PrayerCard() {
	const [selectedCard, setSelectedCard] = useState(null);
  
	useEffect(() => {
	  const randomId = Math.floor(Math.random() * cardList.length);
	  const random_card = cardList[randomId];
	  setSelectedCard(random_card);
	}, []);
  
	return (
	  <>
		{selectedCard && (
		  <Image
			src={selectedCard.img_url}
			width={680}
			height={360}
			alt={selectedCard.id}
			key={selectedCard.id}
		  />
		)}
	  </>
	)
  }