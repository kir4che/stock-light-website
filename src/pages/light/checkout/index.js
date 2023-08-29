import { Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'
import SuccessDialog from '../../../components/SuccessDialog/SuccessDialog'

export default function Checkout() {
	const router = useRouter()

	const [cardNumber, setCardNumber] = useState('')
	const [nameOnCard, setNameOnCard] = useState('')
	const [selectedExpMonth, setSelectedExpMonth] = useState(1)
	const [selectedExpYear, setSelectedExpYear] = useState(2024)
	const [cvv, setCvv] = useState('')

	const [success, setSuccess] = useState(false)

	const handleCardNumberChange = (e) => setCardNumber(e.target.value)
	const handleNameChange = (e) => setNameOnCard(e.target.value)

	const handleSubmit = () => {
		if (cardNumber && nameOnCard && selectedExpMonth && selectedExpYear) setSuccess(true)
		setTimeout(() => {
			handleClose()
		}, 5000)
	}

	const handleClose = () => {
		setSuccess(false)
		router.push('/light/result')
	}

	return (
		<>
			{success ? (
				<SuccessDialog title={'付款完成'} content={'將跳至點燈結果！'} handleClose={handleClose} />
			) : (
				<StarryBackground className='pb-20 pt-14'>
					<div className='max-w-xl px-12 py-8 mx-auto bg-white sm:rounded-xl'>
						<button
							type='button'
							onClick={() => router.push('/light')}
							className='absolute text-gray-700 rounded-full top-4 right-4'
						>
							<svg
								className='w-6 h-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
						<h3 className='mb-8 font-bold text-center'>線上付款</h3>
						<h5 className='mb-2'>付款方式</h5>
						<RadioGroup className='mb-2' row>
							<FormControlLabel value='credit_card' control={<Radio />} label='信用卡' />
							<Image
								width={120}
								height={40}
								src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'
								alt='visa-mastercard'
							/>
						</RadioGroup>
						{/* 信用卡實際顯示 */}
						<div className='mx-auto my-10 text-white transition-transform transform shadow-xl w-96 rounded-2xl hover:scale-110'>
							<Image
								width={400}
								height={400}
								src='https://i.imgur.com/kGkSg1v.png'
								alt='card'
								className='relative h-56 rounded-2xl'
							/>
							<Image
								width={48}
								height={48}
								src='https://i.imgur.com/eReh766.png'
								alt='card-chip'
								className='absolute top-8 left-8'
							/>
							<div className='absolute w-full px-8 top-[5.5rem]'>
								<p className='pb-1 text-sm font-light'>卡號</p>
								<p className='font-medium tracking-widest'>
									{cardNumber.replace(/(.{4})/g, '$1 ') || '＊＊＊＊ ＊＊＊＊ ＊＊＊＊ ＊＊＊＊'}
								</p>
								<div className='flex justify-between pt-5 pr-6 text-xs'>
									<div>
										<p className='pb-1 font-light'>持卡人</p>
										<p className='font-medium tracking-widest'>{nameOnCard || '＊＊＊'}</p>
									</div>
									<div>
										<p className='pb-1 font-light'>有效期限</p>
										<p className='font-medium tracking-widest'>{`${selectedExpMonth
											.toString()
											.padStart(2, '0')}／${selectedExpYear.toString().substr(-2)}`}</p>
									</div>
								</div>
							</div>
						</div>
						<FormControl className='mb-16 space-y-6' fullWidth>
							<TextField
								id='cardNumber'
								value={cardNumber}
								onChange={handleCardNumberChange}
								label='信用卡卡號'
								inputProps={{ maxLength: 16 }}
								fullWidth
								required
							/>
							<div className='flex items-center space-x-4'>
								<Select
									id='expMonth'
									size='small'
									value={selectedExpMonth}
									onChange={(e) => setSelectedExpMonth(e.target.value)}
									label='expMonth'
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
									value={selectedExpYear}
									onChange={(e) => setSelectedExpYear(e.target.value)}
									label='有效年份'
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
									value={cvv}
									onChange={(e) => setCvv(e.target.value)}
									label='末３碼'
									inputProps={{ maxLength: 3 }}
									fullWidth
									required
								/>
							</div>
							<TextField
								id='nameOnCard'
								value={nameOnCard}
								onChange={handleNameChange}
								label='持卡人姓名'
								fullWidth
								required
							/>
						</FormControl>
						<Button
							fullWidth
							size='large'
							className='text-white bg-secondary_blue hover:bg-sky-500'
							onClick={handleSubmit}
						>
							付款
						</Button>
					</div>
				</StarryBackground>
			)}
		</>
	)
}
