import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { useRef, useState } from 'react'

export default function RabBot() {
	const [isOpen, setIsOpen] = useState(false)

	const [messages, setMessages] = useState([
		{
			message: '您好！我是股市 AI，請問有什麼可以幫助您的嗎？',
			sentTime: 'just now',
			sender: 'bot',
		},
	])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const handleSendRequest = async (message) => {
		const newMessage = {
			message,
			direction: 'outgoing',
			sender: 'user',
		}

		setMessages((prevMessages) => [...prevMessages, newMessage])
		setIsBotTyping(true)

		inputRef.current.value = ''
		inputRef.current.focus()

		try {
			const response = await processMessageToChatGPT([...messages, newMessage])
			const content = response.choices[0]?.message?.content
			if (content) {
				const chatGPTResponse = {
					message: content,
					sender: 'bot',
				}
				setMessages((prevMessages) => [...prevMessages, chatGPTResponse])
			}
		} catch (error) {
			console.error('Error processing message:', error)
		} finally {
			setIsBotTyping(false)
		}
	}

	async function processMessageToChatGPT(chatMessages) {}

	return (
		<>
			{/* 對話框 */}
			<div
				className={`fixed overflow-y-auto bg-white rounded-lg shadow bottom-4 right-20 w-96 transition-opacity duration-300 ease-in ${
					isOpen ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* 詢問輸入框 */}
				<div className='p-4 bg-white border-t-2 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
					<div className='relative flex'>
						<input
							type='text'
							placeholder='詢問任何問題...'
							autoComplete='off'
							autoFocus={true}
							onKeyDown={(event) => event.key === 'Enter' && !isBotTyping && handleSendRequest(inputRef.current.value)}
							className='w-full py-2.5 pl-4 pr-16 text-sm border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-sky-500 dark:focus:border-sky-500'
							ref={inputRef}
						/>
						<div className='absolute inset-y-0 items-center hidden right-2 sm:flex'>
							<button
								type='button'
								disabled={isBotTyping}
								className={`inline-flex w-7 h-7 transition duration-200 ease-in-out rounded-full ${
									isBotTyping ? 'bg-gray-500 cursor-not-allowed' : 'bg-amber-300 hover:bg-amber-400'
								}`}
								onClick={() => !isBotTyping && handleSendRequest(inputRef.current.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* 聊天按鈕 */}
			<button
				className='fixed rounded-full shadow-xl cursor-pointer bg-amber-400 onhover:bg-amber-500 flex-center w-14 h-14 bottom-4 right-4'
				onClick={() => setIsOpen(!isOpen)}
			>
				<QuestionAnswerIcon className='text-white' />
			</button>
		</>
	)
}
