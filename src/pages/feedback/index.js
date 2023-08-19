import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Image from 'next/image'
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
				<p className='mb-8 text-xl font-light text-center opacity-60'>如果您有任何建議或問題，歡迎寄信給我們！</p>
				<form action='#' className='space-y-8'>
					<div>
						<label className='block mb-2 text-sm font-medium'>電子郵件</label>
						<input
							value={email}
							type='email'
							className='shadow-sm bg-zinc-50 border border-zinc-300 outline-none text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label className='block mb-2 text-sm font-medium'>標題</label>
						<input
							value={subject}
							type='text'
							className='block w-full p-3 text-sm border rounded-lg shadow-sm outline-none border-zinc-300 bg-zinc-50 focus:ring-primary-500 focus:border-primary-500'
							required
							onChange={(e) => setSubject(e.target.value)}
						/>
					</div>
					<div className='sm:col-span-2'>
						<label className='block mb-2 text-sm font-medium'>內容</label>
						<textarea
							value={message}
							cols={30}
							rows={8}
							className='block p-2.5 w-full text-sm bg-zinc-50 rounded-lg shadow-sm border border-zinc-300 outline-none focus:ring-primary-500 focus:border-primary-500'
							required
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
					<button
						type='submit'
						className='flex px-20 py-2 mx-auto font-medium text-center text-white transition border-2 rounded-full border-secondary_blue tracking-wides bg-secondary_blue hover:bg-white hover:border-secondary_blue hover:text-secondary_blue'
						onClick={handleClickOpen}
					>
						送出
					</button>
				</form>
			</div>
			<Dialog
				open={open}
				className='text-center'
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>{'送出成功'}</DialogTitle>
				<Image src={'/images/email-received-icon.svg'} alt='success' className='w-32 mx-auto' />
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
