'use client'

import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import DropMenu from '@/components/Light/DropMenu'
import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function Light() {
	const { status } = useSession()
	const router = useRouter()
	const uuid = uuidv4()

	const [selectedIndustry, setSelectedIndustry] = useState('')
	const [factorOpen, setFactorOpen] = useState(false) // 選股視窗開關
	const [selectedFactor, setSelectedFactor] = useState('') // 選股條件
	const [sponsorOpen, setSponsorOpen] = useState(false) // 贊助香油錢視窗開關
	const [selectedAmount, setSelectedAmount] = useState(null) // 選擇的香油錢金額
	const [amount, setAmount] = useState(0) // 自訂香油錢金額
	const [lightSucceed, setLightSucceed] = useState(false)

	// Step 1: 選擇產業別
	const handleSelectIndustry = (industry) => {
		setSelectedIndustry(industry)
		setFactorOpen(true)
	}

	// Step 2: 選擇選股條件
	const handleFactorSelect = (factor) => {
		setSelectedFactor(factor)
		setFactorOpen(false)
		setSponsorOpen(true)
	}

	// Step 3-1: 贊助香油錢
	const handleSponsor = () => {
		if (selectedAmount === null && amount === 0) return alert('請選擇或輸入香油錢金額！')
		else if (selectedAmount === null && isNaN(Number(amount))) return alert('香油錢金額請輸入數字！')
		else if (selectedAmount !== null && amount === 0) setAmount(selectedAmount)

		setSponsorOpen(false)
		router.push(`/light/checkout?industry=${selectedIndustry}&factor=${selectedFactor}`)
	}

	// Step 3-2: 不贊助香油錢
	const handleLightUp = () => {
		setSponsorOpen(false)
		setLightSucceed(true)
	}

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login')
	}, [])

	useEffect(() => {
		setSelectedAmount(null)
		setAmount(0)
	}, [sponsorOpen])

	useEffect(() => {
		lightSucceed &&
			setTimeout(() => {
				router.push(
					`/light/resultDashboard?industry=${selectedIndustry}&factor=${selectedFactor}&id=${uuid}&date=${getCurrentDate()}`
				)
			}, 3000)
	}, [lightSucceed])

	return (
		<StarryBackground className='min-h-screen pt-16'>
			{lightSucceed ? (
				<div className='glowing-circle-container'>
					<div className='glowing-circle' />
				</div>
			) : (
				<>
					<DropMenu handleSelect={handleSelectIndustry} />
					<LanternLayout>
						<button type='button' onClick={() => handleSelectIndustry('光電業')}>
							<Lantern
								position='-top-2 -left-16'
								label='光電股'
								hovered={selectedIndustry === '光電業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('其他')}>
							<Lantern
								position='top-20 left-16 scale-[.65]'
								label='其他'
								hovered={selectedIndustry === '其他' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('其他電子業')}>
							<Lantern
								position='top-48 -left-8'
								label='其他電子股'
								hovered={selectedIndustry === '其他電子業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('化學工業')}>
							<Lantern
								position='top-96 -left-20'
								label='化學工業股'
								hovered={selectedIndustry === '化學工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('塑膠工業')}>
							<Lantern
								position='top-80 left-28'
								label='塑膠股'
								hovered={selectedIndustry === '塑膠工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('半導體業')}>
							<Lantern
								position='top-[540px] left-0 scale-[.85]'
								label='半導體股'
								hovered={selectedIndustry === '半導體業' ? true : false}
							/>
						</button>
						{/* --------- */}
						<button type='button' onClick={() => handleSelectIndustry('居家生活')}>
							<Lantern
								position='top-4 left-52'
								label='居家生活股'
								hovered={selectedIndustry === '居家生活' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('建材營造')}>
							<Lantern
								position='top-44 left-64'
								label='建材營造股'
								hovered={selectedIndustry === '建材營造' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('數位雲端')}>
							<Lantern
								position='top-[420px] left-60 scale-[.6]'
								label='數位雲端股'
								hovered={selectedIndustry === '數位雲端' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('食品工業')}>
							<Lantern
								position='top-[560px] left-48'
								label='食品股'
								hovered={selectedIndustry === '食品工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('橡膠工業')}>
							<Lantern
								position='-top-6 left-96'
								label='橡膠股'
								hovered={selectedIndustry === '橡膠工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('電腦及週邊設備業')}>
							<Lantern
								position='top-32 left-[420px]'
								label='電腦及週邊設備股'
								hovered={selectedIndustry === '電腦及週邊設備業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('水泥工業')}>
							<Lantern
								position='top-80 left-[400px]'
								label='水泥股'
								hovered={selectedIndustry === '水泥工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('汽車工業')}>
							<Lantern
								position='top-[525px] left-[360px]'
								label='汽車股'
								hovered={selectedIndustry === '汽車工業' ? true : false}
							/>
						</button>
						{/* --------------- */}
						<button type='button' onClick={() => handleSelectIndustry('油電燃氣業')}>
							<Lantern
								position='-right-10 -top-2'
								label='油電燃氣股'
								hovered={selectedIndustry === '油電燃氣業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('玻璃陶瓷')}>
							<Lantern
								position='-right-20 top-36'
								label='玻璃陶瓷股'
								hovered={selectedIndustry === '玻璃陶瓷' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('生技醫療業')}>
							<Lantern
								position='-right-8 top-80'
								label='生技醫療股'
								hovered={selectedIndustry === '生技醫療業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('紡織纖維')}>
							<Lantern
								position='right-0 top-[560px]'
								label='紡織纖維股'
								hovered={selectedIndustry === '紡織纖維' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('航運業')}>
							<Lantern
								position='right-24 top-56'
								label='航運股'
								hovered={selectedIndustry === '航運業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('觀光餐旅')}>
							<Lantern
								position='right-40 top-96'
								label='觀光餐旅股'
								hovered={selectedIndustry === '觀光餐旅' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('貿易百貨')}>
							<Lantern
								position='right-52 top-[540px]'
								label='貿易百貨股'
								hovered={selectedIndustry === '貿易百貨' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('通信網路業')}>
							<Lantern
								position='right-60 top-52 scale-[.65]'
								label='通信網路股'
								hovered={selectedIndustry === '通信網路業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('運動休閒')}>
							<Lantern
								position='right-[370px] top-36 scale-[.75]'
								label='運動休閒股'
								hovered={selectedIndustry === '運動休閒' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('金融保險業')}>
							<Lantern
								position='right-[420px] top-80'
								label='金融保險股'
								hovered={selectedIndustry === '金融保險業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('鋼鐵工業')}>
							<Lantern
								position='right-[385px] top-[480px]'
								label='鋼鐵股'
								hovered={selectedIndustry === '鋼鐵工業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('電器電纜')}>
							<Lantern
								position='right-[525px] top-20 scale-[.65]'
								label='電器電纜股'
								hovered={selectedIndustry === '電器電纜' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('電子通路業')}>
							<Lantern
								position='right-[560px] top-60 scale-[.7]'
								label='電子通路股'
								hovered={selectedIndustry === '電子通路業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('電子零組件業')}>
							<Lantern
								position='right-[540px] top-[420px]'
								label='電子零組件股'
								hovered={selectedIndustry === '電子零組件業' ? true : false}
							/>
						</button>
						<button type='button' onClick={() => handleSelectIndustry('電機機械')}>
							<Lantern
								position='right-[580px] top-[580px] scale-[.7]'
								label='電機機械股'
								hovered={selectedIndustry === '電機機械' ? true : false}
							/>
						</button>
					</LanternLayout>
					{/* 選股 */}
					<Dialog open={factorOpen} maxWidth='xs' align='center' onClose={() => setFactorOpen(false)} fullWidth>
						<CloseIcon
							className='absolute cursor-pointer top-3 right-3 dark:text-zinc-100 opacity-80 hover:opacity-60'
							onClick={() => setFactorOpen(false)}
						/>
						<DialogTitle className='text-2xl border-b-[1px] dark:bg-zinc-800 dark:text-zinc-100 border-zinc-400/50'>
							選股條件
						</DialogTitle>
						<DialogContent className='pt-4 dark:bg-zinc-800 dark:text-zinc-100'>
							<ul className='flex flex-col px-4 divide-y divide-zinc-400/80'>
								{['負債比率 < 30%', 'ROE > 15%', '自由現金流 > 0', '流動比率 > 2', 'EPS > 0'].map((factor) => (
									<li className='flex-row py-4 flex-center-between'>
										<p className='font-medium dark:text-white'>{factor}</p>
										<p className='text-xs text-gray-600 dark:text-gray-200'></p>
										<button
											type='submit'
											className='px-3 py-1 text-sm text-right rounded-full text-zinc-800 bg-primary_yellow hover:bg-amber-300'
											onClick={() =>
												handleFactorSelect(() => {
													switch (factor) {
														case '負債比率 < 30%':
															return 'debtRatio'
														case 'ROE > 15%':
															return 'Roe'
														case '自由現金流 > 0':
															return 'freeCashFlow'
														case '流動比率 > 2':
															return 'currentRatio'
														case 'EPS > 0':
															return 'Eps'
													}
												})
											}
										>
											選擇此條件
										</button>
									</li>
								))}
							</ul>
						</DialogContent>
					</Dialog>
					{/* 贊助 */}
					<Dialog
						open={sponsorOpen}
						maxWidth='sm'
						align='center'
						PaperProps={{
							sx: {
								maxHeight: 520,
							},
						}}
						onClose={handleLightUp}
						fullWidth
					>
						<CloseIcon
							className='absolute cursor-pointer top-3 right-3 dark:text-zinc-100 opacity-80 hover:opacity-60'
							onClick={() => setSponsorOpen(false)}
						/>
						<DialogTitle className='text-2xl py-4 border-b-[1px] dark:bg-zinc-800 dark:text-zinc-100 border-zinc-400/50'>
							香油錢
						</DialogTitle>
						<DialogContent className='flex-col pt-4 flex-center-between dark:bg-zinc-800 dark:text-zinc-100'>
							<ul className='gap-6 flex-center'>
								{[30, 50, 100].map((amount) => (
									<li className='flex-row py-4 flex-center-between'>
										<button
											type='button'
											className={`px-7 py-9 font-medium border shadow rounded-md text-zinc-800 ${
												selectedAmount === amount
													? 'bg-primary_yellow border-primary_yellow hover:bg-amber-300'
													: 'bg-white hover:bg-zinc-50'
											}`}
											onClick={() => {
												if (selectedAmount === amount) setSelectedAmount(null)
												else setSelectedAmount(amount)
											}}
										>
											NT$ {amount}
										</button>
									</li>
								))}
							</ul>
							<div className='w-3/4 mb-10 text-left'>
								<div className='w-full gap-2 my-4 text-sm flex-center text-zinc-300 dark:text-zinc-400'>
									<div className='w-full h-px bg-zinc-300 dark:bg-zinc-400/50' />
									或
									<div className='w-full h-px bg-zinc-300 dark:bg-zinc-400/50' />
								</div>
								<p className='text-sm'>自訂香油錢金額</p>
								<InputField
									label=''
									type='amount'
									placeholder='NT$ 輸入金額'
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<SubmitBtn text='投點香油錢' handleSubmit={handleSponsor} style='w-80 rounded-full' />
							<button
								type='button'
								className='my-4 text-xs underline opacity-80 hover:opacity-100'
								onClick={handleLightUp}
							>
								先不用，下次一定！
							</button>
						</DialogContent>
					</Dialog>
				</>
			)}
		</StarryBackground>
	)
}
