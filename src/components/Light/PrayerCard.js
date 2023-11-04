import Image from 'next/image'

import { cardList } from '@/data/cardList'
import { useEffect } from 'react'

export default function PrayerCard() {
	// const Card_list = {

	// }

	// const [selectedCard, setselectedCard] = useState(null);
	// const chooseRandomCard = () => {
	//     const randomIndex = Math.floor(Math.random() * Card_list.length);
	//     const randomCard_No = Card_list[randomIndex];
	//     setselectedCard(randomCard_No);
	// };

	useEffect(() => {
		//...
	}, [])

	return (
		<>
			{cardList.map((card) => (
				<Image src={card.img_url} width={680} height={360} alt={card.id} key={card.id} />
			))}
		</>
	)
}
