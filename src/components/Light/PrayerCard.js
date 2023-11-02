import Image from 'next/image'
import { useRouter } from 'next/router'

import { cardList } from '@/data/cardList'

export default function PrayerCard() {
	const router = useRouter()
	const { category } = router.query

	const today = new Date()
	const data_options = { month: 'long', day: 'numeric', year: 'numeric' }
	const formattedDate = today.toLocaleDateString('zh-TW', data_options)

	// const Card_list = {

	// }

	// const [selectedCard, setselectedCard] = useState(null);
	// const chooseRandomCard = () => {
	//     const randomIndex = Math.floor(Math.random() * Card_list.length);
	//     const randomCard_No = Card_list[randomIndex];
	//     setselectedCard(randomCard_No);
	// };

	return (
		<div className='w-[680px] h-[360px] px-6 py-10 mb-4 text-center bg-white shadow-md rounded-3xl'>
			<div className='flex flex-col align-middle md:gap-4 md:flex-row'>
				{cardList.map((item) => (
					<div className='flex flex-row'>
						<div className='w-80 shrink-60 shadow-yellow-500/50 car_animated'>
							{item.image.map((imgSrc) => (
								<Image src={imgSrc} width={640} height={320} alt='' />
							))}
						</div>
						<div className='text-black'>
							<span className='font-medium'>{formattedDate}</span>
							<div className='block mb-6 text-lg font-bold text-black '>{category}類股</div>
							{/* 之後由 GPT 生成 */}
							<div className='mb-3 ml-4 leading-7'>{item.desc}</div>
						</div>
					</div>
				))}
			</div>
			<div className='praise_card_pagination'></div>
		</div>
	)
}
