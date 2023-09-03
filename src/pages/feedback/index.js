import emailjs from '@emailjs/browser'
import { TextField } from '@mui/material'
import router from 'next/router'
import { useRef, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import SubmitButton from '../../components/Buttons/SubmitButton/SubmitButton'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog'
import './style.css'

export default function Feedback() {
	const form = useRef()

	const [success, setSuccess] = useState(false)

	const handleSendEmail = (e) => {
		e.preventDefault()

		const title = e.target.title.value
		const email = e.target.email.value
		// 🚩email 無法傳入
		const content = `${e.target.content.value}\n\n來自 ${email}`

		emailjs
			.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_API_KEY, {
				title: title,
				content: content,
			})
			.then(
				(response) => {
					console.log('SUCCESS!', response.status, response.text)
					setSuccess(true)
				},
				(error) => {
					console.log('FAILED...', error)
				}
			)
	}

	const handleClose = () => {
		setSuccess(false)
		router.push('/')
	}

	return (
		<StarryBackground className={'pt-12 pb-20 mx-auto lg:px-0'}>
			{success ? (
				<SuccessDialog title={'成功送出'} content={'您的回饋已送出，我們會盡快回覆您！'} handleClose={handleClose} />
			) : (
				<>
					<h2 className='mb-5 text-center text-zinc-100'>意見回饋</h2>
					<p className='mb-6 text-xl font-light text-center text-zinc-100 opacity-60'>
						如果您有任何建議或問題，歡迎寄信給我們！
					</p>
					<form
						ref={form}
						className='max-w-xl p-10 mx-auto space-y-8 bg-white border shadow-xl dark:bg-zinc-900/50 sm:rounded-xl'
						onSubmit={handleSendEmail}
					>
						<TextField type='email' name='email' label='電子郵件' fullWidth required />
						<TextField type='text' name='title' label='標題' fullWidth required />
						<TextField type='text' name='content' label='內容' multiline minRows={10} fullWidth required />
						<SubmitButton text={'送出'} icon={<SendFill />} />
					</form>
				</>
			)}
		</StarryBackground>
	)
}
