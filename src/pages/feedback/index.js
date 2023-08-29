import SendIcon from '@mui/icons-material/Send'
import { Button, FormControl, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import SuccessDialog from '../../components/SuccessDialog/SuccessDialog'

export default function Feedback() {
	const emailRef = useRef('')
	const titleRef = useRef('')
	const contentRef = useRef('')

	const [success, setSuccess] = useState(false)

	const handleSubmit = () => {
		const email = emailRef.current.value
		const title = titleRef.current.value
		const content = contentRef.current.value

		if (email && title && content) setSuccess(true)
	}

	const handleClose = () => setSuccess(false)

	return (
		<>
			{success ? (
				<SuccessDialog title={'成功送出'} content={'您的回饋已送出，我們會盡快回覆您！'} handleClose={handleClose} />
			) : (
				<div className='pt-12 pb-20 mx-auto lg:px-0'>
					<h2 className='mb-5 text-center'>意見回饋</h2>
					<p className='mb-6 text-xl font-light text-center opacity-60'>如果您有任何建議或問題，歡迎寄信給我們！</p>
					<FormControl
						fullWidth={true}
						className='flex max-w-xl p-10 mx-auto space-y-8 text-sm bg-white border shadow-xl sm:rounded-xl'
					>
						<TextField id='email' inputRef={emailRef} label='電子郵件' variant='filled' fullWidth required />
						<TextField id='title' inputRef={titleRef} label='標題' variant='filled' fullWidth required />
						<TextField
							id='content'
							inputRef={contentRef}
							label='內容'
							variant='filled'
							multiline
							minRows={10}
							fullWidth
							required
						/>
						<Button
							fullWidth
							size='large'
							className='text-white bg-secondary_blue hover:bg-sky-500'
							endIcon={<SendIcon />}
							onClick={handleSubmit}
						>
							送出
						</Button>
					</FormControl>
				</div>
			)}
		</>
	)
}
