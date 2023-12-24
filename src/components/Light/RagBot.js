'use client'

import ragData from '@/data/ragData.json'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CloseIcon from '@mui/icons-material/Close'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import OpenAI from 'openai'
import { useRef, useState } from 'react'

export default function RagBot({ stockId, stockName }) {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY_RAG,
		dangerouslyAllowBrowser: true,
	})

	const [value, setValue] = useState(false) // 不使用，僅為了讓 Tabs 重新 render
	const [isOpen, setIsOpen] = useState(false)
	const [chatHistory, setChatHistory] = useState([
		{
			role: 'assitant',
			content: '您好！我是您的專屬股神，請問有什麼可以幫助您的嗎？',
		},
	])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const handleSendRequest = async (content) => {
		inputRef.current.value = ''
		inputRef.current.focus()

		content = stockName + ' ' + stockId + '：' + content
		setChatHistory((prevHistory) => [
			...prevHistory,
			{
				role: 'user',
				content: content,
			},
		])

		try {
			setIsBotTyping(true)
			// 3034 Demo用
			if (stockId === 3034) {
				await new Promise((resolve) => {
					setTimeout(() => {
						setChatHistory((prevHistory) => [
							...prevHistory,
							{
								role: 'assitant',
								content: novatekRagData[content]
									? novatekRagData[content].replace(/\n/g, '<br/>')
									: '抱歉，目前無該股資料，無法回答您的問題！',
							},
						])
						resolve()
					}, 12000)
				})
			} else {
				const emptyThread = await openai.beta.threads.create()
				const threadId = emptyThread.id

				// 傳送訊息給 OpenAI
				await openai.beta.threads.messages.create(threadId, {
					role: 'user',
					content: content,
				})

				// 取得助理
				const run = await openai.beta.threads.runs.create(threadId, {
					assistant_id: process.env.OPENAI_ASSISTANT_ID,
				})

				// 創建 response
				let response = await openai.beta.threads.runs.retrieve(threadId, run.id)

				while (response.status === 'in_progress' || response.status === 'queued') {
					// console.log('waiting...')
					await new Promise((resolve) => setTimeout(resolve, 5000))
					response = await openai.beta.threads.runs.retrieve(threadId, run.id)
				}

				const messageList = await openai.beta.threads.messages.list(threadId)
				const lastMessage = messageList.data
					.filter((message) => message.run_id === run.id && message.role === 'assistant')
					.pop()

				const lastMessageContent = lastMessage.content[0]['text'].value
					.replace(/(?:\d+†source|\d+†來源|\【.*?\】)/g, '')
					.replace(/\n/g, '<br/>')

				if (lastMessage) {
					setChatHistory((prevHistory) => [
						...prevHistory,
						{
							role: 'assitant',
							content: lastMessageContent,
						},
					])
				}
			}
		} catch (error) {
			console.error('Error: ', error)
		} finally {
			setIsBotTyping(false)
		}
	}

	return (
		<>
			<div
				className={`fixed overflow-y-auto bg-primary_yellow rounded-lg border dark:border-zinc-600 shadow bottom-20 465:bottom-4 right-4 465:right-20 w-11/12 465:w-100 transition-opacity duration-300 ease-in ${
					isOpen ? 'opacity-100' : 'opacity-0'
				}`}
			>
				{/* 對話框 */}
				<div className='p-4 overflow-y-auto h-60 xs:h-80'>
					{chatHistory.map((message, index) => (
						<div className='inline-block w-full'>
							<div
								className={`p-3 w-fit mb-1 space-y-2 bg-white rounded-lg shadow-md dark:bg-zinc-800 ${
									message.role === 'assitant' ? 'float-left' : 'float-right'
								}`}
								key={index}
							>
								{message.role === 'assitant' && (
									<>
										<p className='space-x-2 text-xs'>
											<span className='font-medium'>諮詢股神</span>
											<span className='px-2 py-0.5 border-secondary_blue text-secondary_blue bg-white dark:bg-zinc-800 border-[1.25px] rounded-full'>
												ChatGPT
											</span>
										</p>
										<div className='flex items-center justify-start gap-2'>
											<p
												dangerouslySetInnerHTML={{ __html: message.content }}
												className='text-sm leading-6 text-zinc-800 dark:text-white'
											/>
										</div>
									</>
								)}
								{message.role === 'user' && (
									<div className='flex justify-end gap-2'>
										<p className='text-sm leading-6 text-zinc-800 dark:text-white'>{message.content}</p>
										<AccountCircleIcon className='text-3xl dark:text-amber-200 text-amber-400' />
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
					value={value}
					sx={{
						'& .MuiTabs-flexContainer': {
							gap: '0.875rem',
						},
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
							className='hover:bg-white/60'
							onClick={() => handleSendRequest(rag.content)}
							disabled={isBotTyping}
							key={index}
						/>
					))}
				</Tabs>
				{/* 詢問輸入框 */}
				<div className='px-2 py-3 bg-white border-t-2 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
					<div className='relative flex'>
						<input
							type='text'
							placeholder='詢問任何問題...'
							autoComplete='off'
							autoFocus={true}
							className='w-full py-2 pl-5 border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-amber-200 dark:focus:border-amber-200'
							ref={inputRef}
						/>
						<div className='absolute inset-y-0 flex items-center right-3'>
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
				{isOpen ? <CloseIcon className='text-white' /> : <QuestionAnswerIcon className='text-white' />}
			</button>
		</>
	)
}

// Demo用
const novatekRagData = {
	'聯詠 3034：請基於附加的財務說明會文本，總結公司最近一季的營收和利潤表現，並指出主要的收入來源和成本因素。':
		'在最近一季度，聯詠科技的營收表現如下：\n\n 營收為1099.6億元，較去年同期下降18.77%。\n 毛利為159.4億元，較去年同期下降24.41%。\n 營業費用為182.1億元，較去年同期下降7.17%。\n 營業收入為327.3億元，較去年同期下降31.49%。\n 淨收入為279.7億元，較去年同期下降28.04%。\n 每股收益（EPS）為45.96元，較上一年度的63.87元下降了17.91元。\n 主要收入來源為：\n\n 小型和中型驅動器（SMDDIC），占總銷售額的39%。\n 所有長驅動器IC（SOC），占總銷售額的35%。\n 大型驅動IC（LDDIC），占總銷售額的26%。\n 綜上所述，聯詠科技在最近一季度面臨銷售和利潤下降的挑戰，主要收入來源為不同尺寸的驅動IC，其中小型和中型驅動器的銷售最為顯著。',
	'聯詠 3034：整理為 JSON 格式':
		' {\n "營收": {\n "金額": "1099.6億元",\n "變動百分比": "-18.77%"\n },\n "毛利": {\n "金額": "159.4億元",\n "變動百分比": "-24.41%"\n },\n "營業費用": {\n "金額": "182.1億元",\n "變動百分比": "-7.17%"\n },\n "營業收入": {\n "金額": "327.3億元",\n "變動百分比": "-31.49%"\n },\n "淨收入": {\n "金額": "279.7億元",\n "變動百分比": "-28.04%"\n },\n "每股收益": {\n "當前EPS": "45.96元",\n "年度變動": "-17.91元",\n "前一年度EPS": "63.87元"\n },\n "收入來源": {\n "SMDDIC": {\n "描述": "小型和中型驅動器",\n "銷售佔比": "39%"\n },\n "SOC": {\n "描述": "所有長驅動器IC",\n "銷售佔比": "35%"\n },\n "LDDIC": {\n "描述": "大型驅動IC",\n "銷售佔比": "26%"\n }\n }\n }',
}
