import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRef, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'

export default function ChatBot() {
	const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello world!' }])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const updateChat = (input) => {
		if (input.trim() === '') return

		setMessages((prevMessages) => [...prevMessages, { from: 'user', text: input }])
		setIsBotTyping(true)

		inputRef.current.value = ''
		inputRef.current.focus()

		setTimeout(() => {
			setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: 'Hello world!' }])
			setIsBotTyping(false)
		}, 3000)
	}

	return (
		<StarryBackground className='h-screen pt-8 mx-auto lg:px-0'>
			<div className='flex flex-col justify-between h-full'>
				<h2 className='text-center text-white'>股市 AI</h2>
				<div className='flex flex-col justify-between h-full max-h-[calc(100vh-180px)]'>
					{/* 對話框 */}
					<div className='px-48 py-4 overflow-y-auto'>
						{messages.map((message, index) => (
							<div key={index} className='w-full'>
								<div
									className={`p-4 pb-3 space-y-2 mb-4 shadow-md rounded-lg ${
										message.from === 'bot' ? 'bg-white dark:bg-zinc-900/50' : 'bg-sky-500'
									}`}
								>
									{message.from === 'bot' && (
										<>
											<p className='space-x-2 text-xs'>
												<span className='font-medium'>股市 AI</span>
												<span className='px-2 py-0.5 border-secondary_blue text-secondary_blue bg-white dark:bg-zinc-800 border-[1.25px] rounded-full'>
													ChatGPT
												</span>
											</p>
											<p className='text-zinc-800 dark:text-white'>{message.text}</p>
										</>
									)}
									{message.from === 'user' && (
										<div className='flex items-center justify-start gap-2'>
											<AccountCircleIcon className='text-white' />
											<p className='text-white'>{message.text}</p>
										</div>
									)}
								</div>
							</div>
						))}
						{isBotTyping && (
							<div className='flex justify-start'>
								<div className='flex items-center px-4 py-2 mb-2 bg-white rounded-lg dark:bg-zinc-900/50'>
									<p className='text-sm text-zinc-800 dark:text-white'>・・・</p>
								</div>
							</div>
						)}
					</div>
					{/* 詢問輸入框 */}
					<div className='px-48 py-4 bg-white border-t-2 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
						<div className='relative flex'>
							<input
								type='text'
								placeholder='詢問任何問題...'
								autoComplete='off'
								autoFocus={true}
								onKeyDown={(event) => event.key === 'Enter' && !isBotTyping && updateChat(inputRef.current.value)}
								className='w-full py-2 pl-5 pr-16 border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-sky-500 dark:focus:border-sky-500'
								ref={inputRef}
							/>
							<div className='absolute inset-y-0 items-center hidden right-2 sm:flex'>
								<button
									type='button'
									disabled={isBotTyping}
									className={`inline-flex w-8 h-8 transition duration-200 ease-in-out rounded-full ${
										isBotTyping
											? 'bg-gray-500 cursor-not-allowed'
											: 'bg-secondary_blue/80 dark:bg-secondary_blue hover:bg-sky-500'
									}`}
									onClick={() => !isBotTyping && updateChat(inputRef.current.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</StarryBackground>
	)
}
