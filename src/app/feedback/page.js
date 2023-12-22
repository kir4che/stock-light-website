'use client'

import emailjs from '@emailjs/browser'
import { Dialog, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import SubmitBtn from '@/components/ui/SubmitBtn'

export default function Feedback() {
	const form = useRef()
	const [formData, setFormData] = useState({ email: '', title: '', content: '' })
	const { email, title, content } = formData
	const [isSucceed, setIsSucceed] = useState(false)

	const updateFormData = (key, value) => {
		setFormData({ ...formData, [key]: value })
	}

	const handleSend = (e) => {
		e.preventDefault()

		if (!email || !title || !content) {
			alert('請填寫完整資料再送出！')
			return
		}

		if (!email.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)) {
			alert('請輸入正確的 Email 格式！')
			return
		}

		emailjs
			.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, process.env.EMAIL_API_KEY, {
				email,
				title,
				content,
			})
			.then(setIsSucceed(true), (error) => console.log('FAILED...', error))
	}

	return (
		<StarryBackground className='flex-col flex-center'>
			<h2 className='mb-4 text-center text-zinc-100'>意見回饋</h2>
			<p className='mb-6 text-lg font-light text-center text-zinc-100 opacity-70'>
				如果您有任何建議或問題，歡迎寄信給我們！
			</p>
			<form
				ref={form}
				className='w-full px-10 pt-8 pb-10 mx-auto bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-12 lg:px-16 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2'
			>
				<InputField
					label='電子郵件'
					name='email'
					type='email'
					placeholder='輸入您的 Email 帳號'
					onChange={(e) => updateFormData('email', e.target.value)}
				/>
				<InputField
					label='標題'
					name='title'
					type='text'
					placeholder='輸入您的標題'
					onChange={(e) => updateFormData('title', e.target.value)}
				/>
				<InputLabel className='mb-2 text-sm text-zinc-100'>內容</InputLabel>
				<TextField
					type='text'
					name='content'
					onChange={(e) => updateFormData('content', e.target.value)}
					size='small'
					multiline
					rows={8}
					fullWidth
					className='rounded bg-zinc-100'
					inputProps={{ maxLength: 200 }}
				/>
				<p className='mt-1.5 text-xs dark:text-zinc-300'>最多 200 字</p>
				<SubmitBtn text='送出' handleSubmit={handleSend} style='mt-9' />
			</form>
			<Dialog open={isSucceed} align='center' onClose={() => setIsSucceed(false)}>
				<DialogTitle className='dark:text-zinc-100 dark:bg-zinc-800'>成功送出</DialogTitle>
				<DialogContent className='dark:text-zinc-100 dark:bg-zinc-800'>
					<Image src='/assets/success-symbol.svg' width={96} height={96} alt='success' className='block mx-auto mb-5' />
					<p>您的回饋已送出，我們會盡快回覆您！</p>
				</DialogContent>
			</Dialog>
		</StarryBackground>
	)
}
