import emailjs from '@emailjs/browser'
import { Button, Input, InputLabel } from '@mui/material'
import { useRef, useState } from 'react'
import { SendFill } from 'react-bootstrap-icons'
import InputField from '../../components/InputField/InputField'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog'
import '../../styles/Feedback.css'

export default function Feedback() {
	const form = useRef()

	const [formData, setFormData] = useState({ email: '', title: '', content: '' })
	const [success, setSuccess] = useState(false)

	const handleSendEmail = (e) => {
		e.preventDefault()

		emailjs
			.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_API_KEY, {
				email: formData.email,
				title: formData.title,
				content: formData.content,
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

	return (
		<StarryBackground className={'pt-12 pb-20 mx-auto lg:px-0'}>
			{success ? (
				<SuccessDialog
					title={'成功送出'}
					content={'您的回饋已送出，我們會盡快回覆您！'}
					handleClose={() => setSuccess(false)}
				/>
			) : (
				<>
					<h2 className='mb-5 text-center text-zinc-100'>意見回饋</h2>
					<p className='mb-6 text-xl font-light text-center text-zinc-100 opacity-60'>
						如果您有任何建議或問題，歡迎寄信給我們！
					</p>
					<form
						ref={form}
						className='w-full px-10 py-10 mx-auto bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-12 lg:px-16 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2'
					>
						<InputField
							label='電子郵件'
							name='email'
							type='email'
							placeholder='輸入您的 Email 帳號'
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						/>
						<InputField
							label='標題'
							name='title'
							type='text'
							placeholder='輸入您的標題'
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						/>
						<InputLabel className='mt-4 text-sm text-zinc-100 '>內容</InputLabel>
						<Input
							type='text'
							name='content'
							multiline
							minRows={8}
							fullWidth
							onChange={(e) => setFormData({ ...formData, content: e.target.value })}
							className='p-2.5 mt-2 rounded bg-zinc-100'
							required
						/>
						<Button
							type='submit'
							size='large'
							fullWidth
							endIcon={<SendFill size={16} />}
							onClick={handleSendEmail}
							className='mt-12 text-zinc-100 bg-secondary_blue hover:bg-sky-500'
						>
							送出
						</Button>
					</form>
				</>
			)}
		</StarryBackground>
	)
}
