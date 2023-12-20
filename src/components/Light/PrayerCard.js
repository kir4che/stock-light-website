import { getCurrentDate } from '@/utils/getCurrentDate'
import { Dialog, DialogContent } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Slide from '@mui/material/Slide'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { forwardRef, useEffect, useState } from 'react'

import SubmitBtn from '@/components/ui/SubmitBtn'

export default function PrayerCard({ industry, handleNextDialog }) {
	const { data: session } = useSession()
	const token = session?.token

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

	const [selectedCardLink, setSelectedCardLink] = useState('')

	const [envelopeOpen, setEnvelopeOpen] = useState(true)
	const [cardOpen, setCardOpen] = useState(false)
	const [savedAlertOpen, setSavedAlertOpen] = useState(false)

	const handleEnvelopeDialog = () => setEnvelopeOpen(!envelopeOpen)
	const handleCardDialog = () => setCardOpen(!cardOpen)

	const getRandomCard = () => {
		const currentDate = new Date().toLocaleDateString()
		let lastAccessDate = localStorage.getItem('lastAccessDate') || ''

		const randomIndex =
			lastAccessDate !== currentDate
				? (localStorage.setItem('lastAccessDate', currentDate), Math.floor(Math.random() * cardList.length))
				: localStorage.getItem('lastRandomIndex') || 0

		localStorage.setItem('lastRandomIndex', randomIndex)
		return cardList[randomIndex]
	}

	const handleCardSave = async () => {
		const currentDate = new Date().toLocaleDateString()
		const lastSaveDate = localStorage.getItem('lastSaveCardDate')

		if (lastSaveDate !== currentDate) {
			const response = await fetch(`${process.env.DB_URL}/api/user/insert/card`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
					image_link: selectedCardLink,
					type: industry,
				}),
			})

			const data = await response.json()
			if (data.success) {
				setSavedAlertOpen(true)
				localStorage.setItem('lastSaveCardDate', currentDate)
			}

			setTimeout(() => {
				setSavedAlertOpen(false)
			}, 1000)
		} else alert('每 24 小時才能保存一次小卡喔！')
	}

	useEffect(() => {
		setSelectedCardLink(getRandomCard())
	}, [])

	return (
		<>
			{/* 信封 */}
			<Dialog
				open={envelopeOpen}
				TransitionComponent={Transition}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<DialogContent className='w-screen md:w-[600px] h-96 sm:h-[450px] md:h-[500px]'>
					<div className='absolute w-full h-full overflow-y-hidden flex-center -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>
						<div className='absolute hidden w-full h-full sm:block right-2 sm:right-0 top-6 sm:top-2 md:top-8 -z-10'>
							<div className='border-b-[120px] sm:border-b-[180px] border-b-white border-x-[280px] sm:border-x-[300px] border-x-transparent' />
						</div>
						<div
							className='absolute text-center cursor-pointer flex p-5 flex-col w-[540px] h-24 xs:h-40 sm:h-64 md:h-72 rounded bg-primary_yellow duration-500 ease-out z-10 top-24 xs:top-16 sm:top-24 sm:bottom-20 hover:bottom-32'
							onClick={() => {
								handleEnvelopeDialog()
								handleCardDialog()
							}}
						>
							<h2>打開小卡...</h2>
						</div>
						<div className='absolute w-full h-full overflow-hidden'>
							<div className='absolute flex flex-col justify-between text-zinc-600 px-3 pb-2 w-full md:w-[600px] md:h-72 bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.5)] z-20 bottom-0'>
								<h2 className='py-16 text-center xs:text-4xl xs:py-20 sm:py-22 md:pt-24 sm:text-5xl'>
									{industry}祈福小卡
								</h2>
								{session && (
									<div className='flex items-end justify-between text-xs md:text-sm text-zinc-400'>
										<p>
											<span>{session.user.name}</span>
											<br />
											<span>{session.user.email}</span>
										</p>
										<p>{getCurrentDate()}</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			{/* 祈福小卡 */}
			<Dialog open={cardOpen} maxWidth='md' align='center'>
				<DialogContent className='dark:bg-zinc-900'>
					{selectedCardLink && <Image src={selectedCardLink} width={680} height={360} alt='pray-card' />}
					{session?.provider !== 'facebook' && session?.provider !== 'google' && (
						<Button
							size='large'
							onClick={handleCardSave}
							className='mt-4 mb-2 px-10 py-2.5 font-bold tracking-wider rounded-full text-zinc-800 bg-primary_yellow'
						>
							保存您的祈福小卡
						</Button>
					)}
					<SubmitBtn
						text='查看本日光明燈'
						handleSubmit={() => {
							handleCardDialog()
							handleNextDialog()
						}}
						style='mt-3 py-2.5'
					/>
				</DialogContent>
				<Collapse in={savedAlertOpen} className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 '>
					<Alert>保存成功！</Alert>
				</Collapse>
			</Dialog>
		</>
	)
}

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})
