import { Alert, Button } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { cardList } from '@/data/cardList'

export default function PrayerCard() {
	const router = useRouter()
	const { category } = router.query

	const today = new Date()
	const data_options = { month: 'long', day: 'numeric', year: 'numeric' }
	const formattedDate = today.toLocaleDateString('zh-TW', data_options)

	const SaveBtn = () => {
		const [open, setOpen] = useState(false)

		const handleSave = () => {
			setOpen(true)
			// 🚩 後端：需要把卡片存給使用者
		}
		const handleClose = () => setOpen(false)

		return (
			<Stack>
				<Button
					type='text'
					size='large'
					onClick={() => {
						handleSave()
					}}
					className='mx-52 px-8 py-2.5 font-bold tracking-widest rounded-full decoration-auto bg-gradient-to-r text-zinc-800 bg-amber-400'
				>
					儲存小卡
				</Button>
				<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
					<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
						已保存！
					</Alert>
				</Snackbar>
			</Stack>
		)
	}

	// const Card_list = {

	// }

	// const [selectedCard, setselectedCard] = useState(null);
	// const chooseRandomCard = () => {
	//     const randomIndex = Math.floor(Math.random() * Card_list.length);
	//     const randomCard_No = Card_list[randomIndex];
	//     setselectedCard(randomCard_No);
	// };

	return (
		<div className='px-6 py-10 mb-4 bg-white shadow-md rounded-3xl'>
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
							<SaveBtn />
						</div>
					</div>
				))}
			</div>
			<div className='praise_card_pagination'></div>
		</div>
	)
}
