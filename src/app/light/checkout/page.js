'use client'

import {
	Button,
	ButtonGroup,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function Checkout() {
	const { status } = useSession()
	const router = useRouter()
	const industry = useSearchParams().get('industry')
	const factor = useSearchParams().get('factor')
	const uuid = uuidv4()

	const [activeBtnIndex, setActiveBtnIndex] = useState(1)

	const [checkoutSucceed, setCheckoutSucceed] = useState(false)
	const [lightSucceed, setLightSucceed] = useState(false)

	const [formData, setFormData] = useState({
		cardNumber: '',
		nameOnCard: '',
		expMonth: 1,
		expYear: 2024,
		cvv: '',
		success: false,
	})
	const [expMonth, setExpMonth] = useState(1)
	const [expYear, setExpYear] = useState(2024)

	const paymentBtn = (imageSrc, index) => (
		<Button
			className={`px-3 py-2 border-[1.5px] rounded-md ${
				activeBtnIndex === index ? 'opacity-100 border-secondary_blue bg-sky-50' : 'opacity-60 bg-white border-zinc-200'
			} hover:opacity-100`}
			onClick={() => setActiveBtnIndex(index)}
			key={index}
		>
			<Image width={125} height={40} src={imageSrc} alt={`button-${index}`} />
		</Button>
	)

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

	const handlePay = () => {
		if (formData.cardNumber.length !== 16) {
			alert('請輸入您的信用卡號碼')
			return
		} else if (formData.cvv.length !== 3) {
			alert('請輸入卡片背面末三碼')
			return
		} else if (formData.nameOnCard.length === 0) {
			alert('請輸入持卡人姓名')
			return
		}

		setCheckoutSucceed(true)
		setTimeout(() => {
			setLightSucceed(true)
			setCheckoutSucceed(false)
		}, 5000)
	}

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login')
	}, [])

	useEffect(() => {
		lightSucceed &&
			setTimeout(() => {
				router.push(`/light/resultDashboard?industry=${industry}&factor=${factor}&id=${uuid}&date=${getCurrentDate()}`)
			}, 3000)
	}, [lightSucceed])

	return (
		<StarryBackground className='flex flex-col justify-center w-full h-screen'>
			{lightSucceed ? (
				<div className='glowing-circle-container'>
					<div className='glowing-circle' />
				</div>
			) : (
				<div className='mx-auto'>
					<Breadcrumbs prevPage='我要點燈' prevPageLink='/light' curPage='小額贊助' />
					<div className='max-w-xl gap-[5vw] px-[4vw] py-10 mx-auto bg-white dark:bg-zinc-900/50 sm:rounded-xl'>
						<h3 className='mb-4'>贊助付款</h3>
						<div className='flex flex-col justify-between w-full'>
							<ButtonGroup className='space-x-4'>
								{paymentBtn('https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png', 1)}
								{paymentBtn(
									'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png',
									2
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
							<SubmitBtn text='確認付款' handleSubmit={handlePay} style='rounded-full' />
						</div>
					</div>
				</div>
			)}
			<Dialog open={checkoutSucceed} align='center'>
				<DialogTitle>感謝您的贊助！</DialogTitle>
				<Image src='/assets/success-symbol.svg' width={96} height={96} alt='success' className='block mx-auto' />
				<DialogContent>將在 3 秒後跳轉至點燈結果...</DialogContent>
			</Dialog>
		</StarryBackground>
	)
}
