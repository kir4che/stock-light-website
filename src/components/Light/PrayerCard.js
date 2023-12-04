import { getCurrentDate } from '@/utils/getCurrentDate'
import { Dialog, DialogContent } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { forwardRef, useEffect, useState } from 'react'

import SubmitBtn from '@/components/ui/SubmitBtn'

export default function PrayerCard({ industry, handleNextDialog }) {
	const { data: session } = useSession()

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

	const [envelopeDialog, setEnvelopeDialogOpen] = useState(true)
	const [cardDialogOpen, setCardDialogOpen] = useState(false)
	const [cardSavedAlertOpen, setCardSavedAlertOpen] = useState(false)

	const handleEnvelopeDialog = () => setEnvelopeDialogOpen(!envelopeDialog)
	const handleCardDialog = () => setCardDialogOpen(!cardDialogOpen)
	const handleCardSave = () => setCardSavedAlertOpen(true) // 🚩 後端：需要把祈福小卡存給使用者
	const handleSavedAlertClose = () => setCardSavedAlertOpen(false)

	const getRandomCard = () => {
		const randomIndex = Math.floor(Math.random() * cardList.length)
		return cardList[randomIndex]
	}

	const [selectedCard, setSelectedCard] = useState(getRandomCard())

	useEffect(() => {
		setSelectedCard(getRandomCard())
	}, [industry])

	return (
		<>
			{/* 信封 */}
			<Dialog
				open={envelopeDialog}
				TransitionComponent={Transition}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				}}
			>
				<DialogContent className='w-[600px] h-[63vw] md:h-[500px]'>
					<div className='absolute w-full h-full flex-center -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>
						<div className='absolute w-full h-full -z-10'>
							<div className='border-b-[212px] border-b-white border-x-[40vw] md:border-x-[300px] border-x-transparent' />
						</div>
						<div
							className='absolute text-center cursor-pointer flex pt-5 flex-col w-[540px] h-72 rounded bg-primary_yellow duration-500 ease-out z-10 bottom-20 hover:bottom-32'
							onClick={() => {
								handleEnvelopeDialog()
								handleCardDialog()
							}}
						>
							<h2>打開小卡...</h2>
						</div>
						<div className='absolute w-full h-full overflow-hidden'>
							<div className='absolute flex flex-col justify-between pt-28 text-sm text-zinc-600 px-3 pb-2 w-[600px] h-72 bg-white shadow-[0px_0px_7px_0px_rgba(0,0,0,0.5)] z-20 bottom-0'>
								<h3 className='text-5xl text-center'>{industry}祈福小卡</h3>
								{session && (
									<div className='flex items-end justify-between text-zinc-400'>
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
			<Dialog open={cardDialogOpen} maxWidth='md' align='center'>
				<DialogContent>
					{selectedCard && <Image src={selectedCard} width={680} height={360} alt='pray-card' />}
					<Button
						size='large'
						onClick={handleCardSave}
						className='mt-4 mb-2 px-10 py-2.5 font-bold tracking-wider rounded-full text-zinc-800 bg-primary_yellow'
					>
						保存您的祈福小卡
					</Button>
					<Snackbar open={cardSavedAlertOpen} autoHideDuration={3000} onClose={handleSavedAlertClose}>
						<Alert onClose={handleSavedAlertClose} severity='success' sx={{ width: '100%' }}>
							保存成功！
						</Alert>
					</Snackbar>
					<SubmitBtn
						text='查看本日光明燈'
						handleSubmit={() => {
							handleCardDialog()
							handleNextDialog()
						}}
						style='mt-3 py-2.5'
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})
