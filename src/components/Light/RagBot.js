'use client'

import ragData from '@/data/ragData.json'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import OpenAI from 'openai'
import { useEffect, useRef, useState } from 'react'

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

export default function RagBot({ stockId }) {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY_RAG,
		dangerouslyAllowBrowser: true,
	})

	const [isOpen, setIsOpen] = useState(false)
	const [threadId, setThreadId] = useState('')
	const [chatHistory, setChatHistory] = useState([
		{
			role: 'assitant',
			content: '您好！我是股市 AI，請問有什麼可以幫助您的嗎？',
		},
	])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const handleSendRequest = async (content) => {
		setIsBotTyping(true)
		inputRef.current.value = ''
		inputRef.current.focus()

		setChatHistory((prevHistory) => [
			...prevHistory,
			{
				role: 'user',
				content: content,
			},
		])

		// 傳送訊息給 OpenAI
		await openai.beta.threads.messages.create(threadId, {
			role: 'user',
			content: content,
		})

		// 取得助理
		const run = await openai.beta.threads.runs.create(threadId, {
			assistant_id: 'asst_OGuQSf27UksHzjjkEE5tkJCw',
		})

		// 創建 response
		let response = await openai.beta.threads.runs.retrieve(threadId, run.id)

		while (response.status === 'in_progress' || response.status === 'queued') {
			console.log('waiting...')
			await new Promise((resolve) => setTimeout(resolve, 5000))
			response = await openai.beta.threads.runs.retrieve(threadId, run.id)
		}

		const messageList = await openai.beta.threads.messages.list(threadId)

		const lastMessage = messageList.data
			.filter((message) => message.run_id === run.id && message.role === 'assistant')
			.pop()

		if (lastMessage) {
			console.log(lastMessage.content[0]['text'].value)
			setChatHistory((prevHistory) => [
				...prevHistory,
				{
					role: 'assitant',
					content: lastMessage.content[0]['text'].value,
				},
			])
		}

		setIsBotTyping(false)
	}

	useEffect(() => {
		const initializeThread = async () => {
			const emptyThread = await openai.beta.threads.create()
			setThreadId(emptyThread.id)
		}

		initializeThread()
	}, [])

	return (
		<>
			<div
				className={`fixed overflow-y-auto bg-primary_yellow rounded-lg shadow bottom-4 right-20 w-96 transition-opacity duration-300 ease-in ${
					isOpen ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* 對話框 */}
				<div className='min-h-[240px] max-h-[420px] h-full p-4 overflow-y-auto'>
					{chatHistory.map((message, index) => (
						<div key={index} className='inline-block w-full'>
							<div
								className={`p-3 mb-1 space-y-2 bg-white rounded-lg shadow-md dark:bg-zinc-800 ${
									message.role === 'assitant' ? 'float-left' : 'float-right'
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
											<p className='text-sm leading-6 text-zinc-800 dark:text-white'>{message.content}</p>
										</div>
									</>
								)}
								{message.role === 'user' && (
									<div className='flex items-center justify-end gap-2'>
										<p className='text-sm leading-6 text-zinc-800 dark:text-white'>{message.content}</p>
										<AccountCircleIcon className='dark:text-amber-200 text-amber-400' />
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
				{/* 快捷按鈕 */}
				<Tabs
					sx={{
						'& .MuiTabs-indicator': {
							backgroundColor: 'rgba(255, 255, 255, 0)',
						},
						'& .MuiTab-root': {
							color: '#27272a',
							fontWeight: '400',
							fontSize: '0.75rem',
							textAlign: 'left',
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							border: '1px solid #27272a',
							borderRadius: '0.2rem',
							'&.Mui-selected': {
								color: '#27272a',
								backgroundColor: 'rgba(255, 255, 255, 0.6)',
							},
						},
					}}
					className='mb-2'
					variant='scrollable'
					scrollButtons='auto'
				>
					{ragData.map((rag, index) => (
						<Tab
							label={rag.title}
							className='mr-2 hover:bg-white/60'
							onClick={() =>
								// handleSendRequest(
								// 	`目前分析的股票為：${stock100.find((stock) => stock.stock_id === stockId)?.name || ''}，${
								// 		rag.content
								// 	}`
								// )
								handleSendRequest(rag.content)
							}
							key={index}
						/>
					))}
				</Tabs>
				{/* 詢問輸入框 */}
				<div className='p-4 bg-white border-t-2 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
					<div className='relative flex'>
						<input
							type='text'
							placeholder='詢問任何問題...'
							autoComplete='off'
							autoFocus={true}
							className='w-full py-2 pl-5 pr-16 border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-amber-200 dark:focus:border-amber-200'
							ref={inputRef}
						/>
						<div className='absolute inset-y-0 items-center hidden right-2 sm:flex'>
							<button
								type='button'
								disabled={isBotTyping}
								className={`inline-flex w-7 h-7 transition duration-200 ease-in-out rounded-full ${
									isBotTyping ? 'bg-gray-500 cursor-not-allowed' : 'bg-amber-300 hover:bg-amber-400'
								}`}
								onClick={() => !isBotTyping && inputRef.current.value && handleSendRequest(inputRef.current.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* 聊天視窗按鈕 */}
			<button
				className='fixed rounded-full shadow-xl cursor-pointer bg-amber-400 onhover:bg-amber-500 flex-center w-14 h-14 bottom-4 right-4'
				onClick={() => setIsOpen(!isOpen)}
			>
				<QuestionAnswerIcon className='text-white' />
			</button>
		</>
	)
}
