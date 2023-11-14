import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { getCurrentDate } from '@/utils/getCurrentDate'

export default function CheckoutAnimation() {
	const router = useRouter()
	const { category } = router.query

	const [isCoinVisible, setIsCoinVisible] = useState(true)

	const handleAnimationEnd = () => {
		setIsCoinVisible(false)
		setTimeout(() => {
			const token = uuidv4()
			router.push(`/light/result/${token}?category=${category}&date=${getCurrentDate()}`)
		}, 3000)
	}

	return (
		<div className='donation-animation place-content-center' onAnimationEnd={handleAnimationEnd}>
			<h2 className='mb-16'>香油錢已成功投遞！</h2>
			{isCoinVisible && (
				<Image src='/assets/money_coin_blank_500_new.png' width={80} height={80} className='coin' alt='coin' />
			)}
			<Image src='/assets/saisenbako2.png' width={200} height={200} className='box' alt='box' />
		</div>
	)
}
