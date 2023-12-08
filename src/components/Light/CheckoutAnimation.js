import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { getCurrentDate } from '@/utils/getCurrentDate'

export default function CheckoutAnimation({ industry }) {
	const router = useRouter()

	const [isCoinVisible, setIsCoinVisible] = useState(true)
	const [success, setSuccess] = useState(false)

	const handleAnimationEnd = () => {
		setIsCoinVisible(false)

		setTimeout(() => {
			setSuccess(true)
		}, 3000)
	}

	useEffect(() => {
		const uuid = uuidv4()
		setTimeout(() => {
			router.push(`/light/resultDashboard?industry=${industry}&id=${uuid}&date=${getCurrentDate()}`)
		}, 6000)
	}, [success])

	return success ? (
		<div className='glowing-circle-container'>
			<div className='glowing-circle' />
		</div>
	) : (
		<div className='donation-animation place-content-center' onAnimationEnd={handleAnimationEnd}>
			<h2 className='mb-16 text-white'>香油錢已成功投遞！</h2>
			{isCoinVisible && (
				<Image src='/assets/money_coin_blank_500_new.png' width={80} height={80} className='coin' alt='coin' />
			)}
			<Image src='/assets/saisenbako2.png' width={200} height={200} className='box' alt='box' />
		</div>
	)
}
