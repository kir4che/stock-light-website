import SendIcon from '@mui/icons-material/Send'
import { Button, FormControl, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog'
import './style.css'

export default function Feedback() {
	const router = useRouter()

	const emailRef = useRef('')
	const titleRef = useRef('')
	const contentRef = useRef('')

	const [success, setSuccess] = useState(false)

	const handleSubmit = () => {
		if (email && title && content) setSuccess(true)
		setTimeout(() => handleClose(), 5000)
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
					<FormControl
						fullWidth={true}
						className='flex max-w-xl p-10 mx-auto space-y-8 text-sm bg-white border shadow-xl dark:bg-zinc-900/50 sm:rounded-xl'
					>
						<TextField id='email' inputRef={emailRef} label='電子郵件' fullWidth required />
						<TextField id='title' inputRef={titleRef} label='標題' fullWidth required />
						<TextField id='content' inputRef={contentRef} label='內容' multiline minRows={10} fullWidth required />
						<Button
							fullWidth
							size='large'
							className='text-zinc-100 bg-secondary_blue hover:bg-sky-500'
							endIcon={<SendIcon />}
							onClick={handleSubmit}
						>
							送出
						</Button>
					</FormControl>
				</>
			)}
		</StarryBackground>
	)
}
