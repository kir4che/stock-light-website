import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'

export default function Feedback() {
	const [email, setEmail] = useState('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')

	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		if (email && subject && message) setOpen(true)
	}

	const handleClose = () => {
		setEmail('')
		setSubject('')
		setMessage('')
		setOpen(false)
	}

	return (
		<section>
			<div className='max-w-screen-sm px-8 py-20 mx-auto lg:px-0'>
				<h2 className='mb-5 font-bold tracking-tight text-center'>意見回饋</h2>
				<p className='mb-8 text-xl font-light text-center opacity-60'>如果你有任何建議或問題，歡迎寄信給我們！</p>
				<form action='#' className='space-y-8'>
					<div>
						<label for='email' className='block mb-2 text-sm font-medium'>
							電子郵件
						</label>
						<input
							id='email'
							value={email}
							type='email'
							className='shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 '
							required
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</div>
					<div>
						<label for='subject' className='block mb-2 text-sm font-medium'>
							標題
						</label>
						<input
							id='subject'
							value={subject}
							type='text'
							className='block w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm bg-gray-50 focus:ring-primary-500 focus:border-primary-500'
							required
							onChange={(e) => {
								setSubject(e.target.value)
							}}
						/>
					</div>
					<div className='sm:col-span-2'>
						<label for='message' className='block mb-2 text-sm font-medium'>
							內容
						</label>
						<textarea
							id='message'
							value={message}
							rows='6'
							className='block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500'
							required
							onChange={(e) => {
								setMessage(e.target.value)
							}}
						></textarea>
					</div>
					<button
						type='submit'
						className='flex px-20 py-2 mx-auto font-medium text-center transition border-2 rounded-full tracking-wides text-secondary_blue border-secondary_blue hover:bg-secondary_blue hover:text-white'
						onClick={handleClickOpen}
					>
						送出
					</button>
				</form>
			</div>
			<Dialog open={open} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>{'送出成功'}</DialogTitle>
				<img className='w-32 mx-auto' src='../images/mail-submit-success.png' alt='success' />
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>您的回饋已送出，我們會盡快回覆您！</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						沒問題
					</Button>
				</DialogActions>
			</Dialog>
		</section>
	)
}
