import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CloseIcon from '@mui/icons-material/Close'
import { Button, ButtonGroup, FormControl, MenuItem, Select, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import StarryBackground from '@/components/common/StarryBackground'
import { Lantern } from '@/components/ui/Lantern'
import { getCurrentDate } from '@/utils/getCurrentDate'

// 🚩尚未串接金流
export default function Checkout() {
	const router = useRouter()
	const { category } = router.query

	const paymentBtn = (index, imageSrc) => (
		<Button
			key={index}
			onClick={() => handleButtonActive(index)}
			className={`px-3 py-2 border-[1.5px] rounded-md ${
				activeButtonIndex === index
					? 'opacity-1 border-secondary_blue bg-sky-50'
					: 'opacity-60 bg-white border-zinc-200'
			} hover:opacity-100`}
		>
			<Image width={125} height={40} src={imageSrc} alt={`button-${index}`} />
		</Button>
	)

	const [activeButtonIndex, setActiveButtonIndex] = useState(1)

	const handleButtonActive = (index) => setActiveButtonIndex(index)

	const [formData, setFormData] = useState({
		cardNumber: '',
		nameOnCard: '',
		expMonth: 1,
		expYear: 2024,
		cvv: '',
		success: false,
	})

	const [expMonth, setExpMonth] = useState(1) // Separate state for expMonth
	const [expYear, setExpYear] = useState(2024) // Separate state for expYear

	const handleInputChange = (e) => {
		const { id, value } = e.target

		if (id === 'cardNumber' || id === 'cvv') {
			const numericValue = value.replace(/\D/g, '')
			setFormData({ ...formData, [id]: numericValue })
		} else if (id === 'nameOnCard') {
			const nonNumericValue = value.replace(/[0-9]/g, '')
			setFormData({ ...formData, [id]: nonNumericValue })
		} else {
			setFormData({ ...formData, [id]: value })
		}
	}

	const handleExpMonthChange = (e) => {
		const value = e.target.value
		setExpMonth(value)
		setFormData({ ...formData, expMonth: value })
	}

	const handleExpYearChange = (e) => {
		const value = e.target.value
		setExpYear(value)
		setFormData({ ...formData, expYear: value })
	}

	const [success, setSuccess] = useState(false)

	const handleSubmit = () => {
		if (cardNumber && nameOnCard && expMonth && expYear) {
			setSuccess(true)
			setTimeout(() => {
				const token = uuidv4()
				router.push(`/light/result/${token}?category=${category}&date=${getCurrentDate('-')}`)
			}, 3000)
		}
	}

	return (
		<StarryBackground className={'min-h-screen md:min-h-full md:h-screen py-8 md:py-0 md:grid md:place-content-center'}>
			{success ? (
				<div className='glowing-circle-container'>
					<div className='glowing-circle'></div>
				</div>
			) : (
				<div className='relative flex-col-reverse md:flex-row max-w-5xl gap-[5vw] px-[4vw] py-10 mx-auto bg-white flex md:justify-between dark:bg-zinc-800 sm:rounded-xl'>
					<CloseIcon
						className='absolute cursor-pointer top-4 right-4 opacity-80 hover:opacity-60'
						onClick={() => router.push('/light')}
					/>
					<h3 className='absolute mb-4 top-4'>線上付款</h3>
					{/* 支付區塊 */}
					<div className='flex flex-col justify-between w-full md:mt-6 md:max-w-md'>
						<h5 className='mb-2'>付款方式</h5>
						<ButtonGroup className='space-x-5'>
							{paymentBtn(1, 'https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png')}
							{paymentBtn(
								2,
								'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png'
							)}
						</ButtonGroup>
						<FormControl className='mt-6 mb-8 space-y-5' fullWidth>
							<TextField
								id='cardNumber'
								value={formData.cardNumber}
								onChange={handleInputChange}
								placeholder='信用卡卡號'
								inputProps={{ maxLength: 16 }}
								className='rounded dark:bg-zinc-100'
								fullWidth
								required
							/>
							<div className='flex items-center space-x-4'>
								<Select
									id='expMonth'
									size='small'
									value={expMonth}
									onChange={handleExpMonthChange}
									className='rounded dark:bg-zinc-100'
								>
									<MenuItem value={1}>01</MenuItem>
									<MenuItem value={2}>02</MenuItem>
									<MenuItem value={3}>03</MenuItem>
									<MenuItem value={4}>04</MenuItem>
									<MenuItem value={5}>05</MenuItem>
									<MenuItem value={6}>06</MenuItem>
									<MenuItem value={7}>07</MenuItem>
									<MenuItem value={8}>08</MenuItem>
									<MenuItem value={9}>09</MenuItem>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={11}>11</MenuItem>
									<MenuItem value={12}>12</MenuItem>
								</Select>
								<Select
									id='expYear'
									size='small'
									value={expYear}
									onChange={handleExpYearChange}
									className='rounded dark:bg-zinc-100'
								>
									<MenuItem value={2024}>2024</MenuItem>
									<MenuItem value={2025}>2025</MenuItem>
									<MenuItem value={2026}>2026</MenuItem>
									<MenuItem value={2027}>2027</MenuItem>
									<MenuItem value={2028}>2028</MenuItem>
									<MenuItem value={2029}>2029</MenuItem>
									<MenuItem value={2030}>2030</MenuItem>
								</Select>
								<TextField
									id='cvv'
									size='small'
									value={formData.cvv}
									onChange={handleInputChange}
									placeholder='末３碼'
									inputProps={{ maxLength: 3 }}
									className='rounded dark:bg-zinc-100'
									fullWidth
									required
								/>
							</div>
							<TextField
								id='nameOnCard'
								value={formData.nameOnCard}
								onChange={handleInputChange}
								placeholder='持卡人姓名'
								className='rounded dark:bg-zinc-100'
								fullWidth
								required
							/>
						</FormControl>
						<hr />
						<div className='py-3 tracking-widest flex-center-between'>
							<p>
								光明燈香油錢（<span className='font-bold'>{category}</span>股）
							</p>
							<p className='font-bold'>NT$100</p>
						</div>
						<hr />
						<Button
							fullWidth
							size='large'
							className='mt-8 text-zinc-100 bg-secondary_blue hover:bg-sky-500'
							onClick={handleSubmit}
						>
							付款
						</Button>
					</div>
					{/* 光明燈介紹區塊 */}
					<div className='w-full relative mt-6 md:mt-0 md:w-[52vw] dark:text-zinc-800 flex justify-between flex-col p-6 bg-amber-50 rounded-2xl'>
						<div className='mb-8'>
							<p className='text-sm font-light tracking-wider'>您將要支付</p>
							<h2 className='mt-3 mb-10 text-4xl font-medium tracking-wider'>NT$100</h2>
							<p className='mb-4 text-sm font-light tracking-wider'>您可以得到...</p>
							<ul className='space-y-4'>
								<li>
									<p className='flex gap-x-2'>
										<CheckCircleRoundedIcon className='mt-0.5 text-stock_green' />
										<span className='font-medium tracking-wide'>該產業別的五盞光明燈</span>
									</p>
									<p className='px-1 text-sm font-light leading-6 tracking-wide opacity-60'>
										每盞燈代表一支有潛力的產業股票，我們通過歷史分析挑選這些具有希望、潛力的股票，並祈求上天保佑投資者未來獲得更好的回報。{' '}
									</p>
								</li>
								<li>
									<p className='flex mb-2 gap-x-2'>
										<CheckCircleRoundedIcon className='mt-0.5 text-stock_green' />
										<span className='font-medium tracking-wide'>精美的祈福小卡</span>
									</p>
									<p className='px-1 text-sm font-light leading-6 tracking-wide opacity-60'>
										小卡帶有正面的祝福語句，鼓勵投資者堅定信心，相信自己的選擇，並期待未來的回報。
									</p>
								</li>
							</ul>
						</div>
						<p className='px-4 py-3 text-xs leading-5 dark:text-zinc-100 bg-primary_yellow/80 dark:bg-zinc-900/80 rounded-xl'>
							點燈結果為本團隊透過歷史股市資料庫所分析出來，一切僅提供祈福的作用。
						</p>
						<Lantern position={'z-0 right-0 md:-right-8 lg:-right-4 rotate-6 scale-50'} />
					</div>
				</div>
			)}
		</StarryBackground>
	)
}
