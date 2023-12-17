'use client'

import StarryBackground from '@/components/common/StarryBackground'
import SubmitBtn from '@/components/ui/SubmitBtn'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import OpenAI from 'openai'
import { useEffect, useRef, useState } from 'react'

export default function ChatBot() {
	const godList = [
		{
			id: 1,
			imageUrl: '/assets/gods/god-1.jpg',
			avatar: '/assets/gods/god-1-avatar.png',
		},
		{
			id: 2,
			imageUrl: '/assets/gods/god-2.jpg',
			avatar: '/assets/gods/god-2-avatar.png',
		},
		{
			id: 3,
			imageUrl: '/assets/gods/god-3.jpg',
			avatar: '/assets/gods/god-3-avatar.png',
		},
		{
			id: 4,
			imageUrl: '/assets/gods/god-4.jpg',
			avatar: '/assets/gods/god-4-avatar.png',
		},
	]

	const [selectedGod, setSelectedGod] = useState(0)
	const [currentGodIndex, setCurrentGodIndex] = useState(0)
	const selectGod = () => {
		const lastGodSelectTime = localStorage.getItem('lastGodSelectTime')
		const currentTime = new Date().getTime()

		if (lastGodSelectTime && currentTime - lastGodSelectTime < 24 * 60 * 60 * 1000) {
			alert('You can only select a god once every 24 hours.')
			return
		}

		const intervalId = setInterval(() => {
			setCurrentGodIndex((prevIndex) => (prevIndex + 1) % godList.length)
		}, 100)

		setTimeout(() => {
			clearInterval(intervalId)
			const randomGod = godList[Math.floor(Math.random() * godList.length)]
			setSelectedGod(randomGod.id)

			localStorage.setItem('selectedGod', randomGod.id)
			localStorage.setItem('lastGodSelectTime', new Date().getTime())
		}, Math.random() * (12000 - 5000 + 1) + 5000)
	}

	const [chatHistory, setChatHistory] = useState([
		{
			role: 'assitant',
			content: '您好！我是股市 AI，請問有什麼可以幫助您的嗎？',
		},
	])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const handleSendRequest = async (content) => {
		if (!content) return

		setChatHistory((prevHistory) => [
			...prevHistory,
			{
				role: 'user',
				content: content,
			},
		])

		inputRef.current.value = ''
		inputRef.current.focus()

		setIsBotTyping(true)

		try {
			const openai = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY,
				dangerouslyAllowBrowser: true,
			})

			const response = await openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content:
							"I'm an advanced AI financial advisor and mentor, dedicated to helping users navigate the complex world of finance. As an AI with a deep understanding of economic trends, investment strategies, and personal budgeting, you provide valuable guidance to individuals at any stage of their financial journey. And answer any of my questions in traditional Chinese, your answer is limited to 256 characters.",
					},
					{
						role: 'user',
						content: content,
					},
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			})

			const botResponse = response.choices[0].message.content

			setChatHistory((prevHistory) => [
				...prevHistory,
				{
					role: 'assitant',
					content: botResponse,
				},
			])
		} catch (error) {
			console.error('Error communicating with OpenAI:', error)
		} finally {
			setIsBotTyping(false)
		}
	}

	useEffect(() => {
		const selectedGod = localStorage.getItem('selectedGod')
		if (selectedGod) setSelectedGod(Number(selectedGod))
	}, [])

	return (
		<StarryBackground className='h-screen pt-8 mx-auto lg:px-0'>
			{!selectedGod ? (
				<div className='flex-col h-full flex-center'>
					<div className='flex-wrap h-full mb-8 sm:mb-0 gap-x-8 flex-center'>
						{godList.map((god, index) => (
							<Image
								src={god.imageUrl}
								alt='god'
								width={200}
								height={200}
								key={god.id}
								style={{ opacity: index === currentGodIndex ? 0.85 : 0.2 }}
							/>
						))}
					</div>
					<SubmitBtn text='隨機選擇神明' handleSubmit={() => selectGod()} style='mb-40 w-80 rounded-full' />
				</div>
			) : (
				<div className='flex flex-col justify-between h-full'>
					<h2 className='text-center text-white'>股市 AI</h2>
					<div className='flex flex-col justify-between h-full max-h-[calc(100vh-180px)]'>
						{/* 對話框 */}
						<div className='px-10 py-4 overflow-y-auto md:px-16 lg:px-24 xl:px-48'>
							{chatHistory &&
								chatHistory.map((message, index) => (
									<div className='w-full' key={index}>
										<div
											className={`p-4 pb-3 space-y-2 mb-4 shadow-md rounded-lg ${
												message.role === 'assitant' ? 'bg-white dark:bg-zinc-900/50' : 'bg-sky-500'
											}`}
										>
											{message.role === 'assitant' && (
												<>
													<p className='space-x-2 text-xs'>
														<span className='font-medium'>股市 AI</span>
														<span className='px-2 py-0.5 border-secondary_blue text-secondary_blue bg-white dark:bg-zinc-800 border-[1.25px] rounded-full'>
															ChatGPT
														</span>
													</p>
													<div className='flex items-center justify-start gap-2'>
														<div className='block w-8 min-w-[32px] h-8'>
															<Image
																src={godList[selectedGod - 1].avatar}
																width={100}
																height={100}
																alt='ask-god'
																className='rounded-full'
															/>
														</div>
														<p className='text-zinc-800 dark:text-white'>{message.content}</p>
													</div>
												</>
											)}
											{message.role === 'user' && (
												<div className='flex items-center justify-end gap-2'>
													<p className='text-white'>{message.content}</p>
													<AccountCircleIcon className='text-white' />
												</div>
											)}
										</div>
									</div>
								))}
							{isBotTyping && (
								<div className='flex justify-start'>
									<div className='flex items-center px-10 py-3.5 mb-2 bg-white rounded-lg dark:bg-zinc-900/50'>
										<div className='dot-flashing' />
									</div>
								</div>
							)}
						</div>
						{/* 詢問輸入框 */}
						<div className='px-10 py-4 bg-white border-t-2 md:px-16 lg:px-24 xl:px-48 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
							<div className='relative flex'>
								<input
									type='text'
									placeholder='詢問任何問題...'
									autoComplete='off'
									autoFocus={true}
									className='w-full py-2 pl-5 pr-16 border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-sky-500 dark:focus:border-sky-500'
									ref={inputRef}
								/>
								<div className='absolute inset-y-0 flex items-center right-2'>
									<button
										type='button'
										disabled={isBotTyping}
										className={`inline-flex w-8 h-8 transition duration-200 ease-in-out rounded-full ${
											isBotTyping
												? 'bg-gray-500 cursor-not-allowed'
												: 'bg-secondary_blue/80 dark:bg-secondary_blue hover:bg-sky-500'
										}`}
										onClick={() => !isBotTyping && inputRef.current.value && handleSendRequest(inputRef.current.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</StarryBackground>
	)
}
