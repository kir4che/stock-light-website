import { useRef, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'

export default function ChatBot() {
	const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello world!' }])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	return (
		<StarryBackground className='h-screen pt-12 mx-auto lg:px-0'>
			<div className='flex flex-col justify-between flex-1 h-full'>
				{/* 詢問輸入框 */}
				<div className='p-4 bg-white border-t-2 border-zinc-200'>
					<div className='relative flex'>
						<input
							type='text'
							placeholder='詢問任何問題...'
							autoComplete='off'
							autoFocus={true}
							onKeyDown={(event) => event.key === 'Enter' && updateChat(inputRef.current.value)}
							className='w-full py-2 pl-5 pr-16 border-2 rounded-full bg-zinc-100 border-zinc-200 text-zinc-600 placeholder-zinc-600 text-md focus:outline-none focus:placeholder-zinc-400 focus:border-sky-500'
							ref={inputRef}
						/>
						<div className='absolute inset-y-0 items-center hidden right-2 sm:flex'>
							<button
								type='button'
								className='inline-flex w-8 h-8 transition duration-200 ease-in-out rounded-full bg-secondary_blue/80 hover:bg-sky-500'
								onClick={() => updateChat(inputRef.current)}
							/>
						</div>
					</div>
				</div>
			</div>
		</StarryBackground>
	)
}
