// @ts-nocheck
import { useState } from 'react'
import SuccessDialog from '../../components/Feedback/SuccessDialog/SuccessDialog'

export default function Feedback() {
	const [feedbackData, setFeedbackData] = useState({
		email: '',
		subject: '',
		message: '',
	})

	const [success, setSuccess] = useState(false)

	const handleSend = () => {
		const { email, subject, message } = feedbackData
		if (email && subject && message) setSuccess(true)
	}

	const handleClose = () => {
		setFeedbackData({ email: '', subject: '', message: '' })
		setSuccess(false)
	}

	const handleInputChange = (field, value) => setFeedbackData((prevData) => ({ ...prevData, [field]: value }))

	return (
		<section>
			{success ? (
				<SuccessDialog handleClose={handleClose} content={'您的回饋已送出，我們會盡快回覆您！'} />
			) : (
				<div className='max-w-screen-sm px-8 py-16 mx-auto lg:px-0'>
					<h2 className='mb-5 text-center'>意見回饋</h2>
					<p className='mb-8 text-xl font-light text-center opacity-60'>如果您有任何建議或問題，歡迎寄信給我們！</p>
					<form action='#' className='space-y-8 text-sm'>
						<div>
							<label className='block mb-2'>電子郵件</label>
							<input
								value={feedbackData.email}
								type='email'
								className='block w-full p-3 border rounded-lg shadow-sm outline-none bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-500'
								required
								onChange={(e) => handleInputChange('email', e.target.value)}
							/>
						</div>
						<div>
							<label className='block mb-2'>標題</label>
							<input
								value={feedbackData.subject}
								type='text'
								className='block w-full p-3 border rounded-lg shadow-sm outline-none border-zinc-300 dark:border-zinc-500 bg-zinc-50 dark:bg-zinc-800'
								required
								onChange={(e) => handleInputChange('subject', e.target.value)}
							/>
						</div>
						<div className='sm:col-span-2'>
							<label className='block mb-2'>內容</label>
							<textarea
								value={feedbackData.message}
								cols={30}
								rows={8}
								className='block w-full p-3 border rounded-lg shadow-sm outline-none bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-500'
								required
								onChange={(e) => handleInputChange('message', e.target.value)}
							/>
						</div>
						<button
							type='button'
							className='flex px-20 py-2 mx-auto font-medium text-center text-white transition border-2 rounded-full border-secondary_blue tracking-wides bg-secondary_blue hover:bg-white hover:border-secondary_blue hover:text-secondary_blue'
							onClick={handleSend}
						>
							送出
						</button>
					</form>
				</div>
			)}
		</section>
	)
}
