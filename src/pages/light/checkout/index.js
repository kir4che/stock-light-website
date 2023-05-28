import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Checkout() {
	const router = useRouter()

	const [cardNumber, setCardNumber] = useState('')
	const [nameOnCard, setNameOnCard] = useState('')
	const [expDate, setExpDate] = useState('')

	const handleCardNumberChange = (event) => {
		setCardNumber(event.target.value)
	}

	const handleNameChange = (event) => {
		setNameOnCard(event.target.value)
	}

	const handleExpDateChange = (event) => {
		setExpDate(event.target.value)
	}

	return (
		<div id='stars-background-container'>
			<Container component='main' maxWidth='sm' sx={{ mt: 14, mb: 24 }}>
				<Paper className='relative' variant='outlined' sx={{ px: 5, pt: 4, pb: 8 }}>
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
					<RadioGroup
						className='mb-2'
						aria-labelledby='demo-controlled-radio-buttons-group'
						name='controlled-radio-buttons-group'
					>
						<div className='flex items-center justify-between'>
							<FormControlLabel value='paypal' control={<Radio />} label='Paypal' />
							<img
								className='w-20'
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png'
								alt='paypal'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<FormControlLabel value='credit_card' control={<Radio />} label='Credit Card' />
							<img
								className='w-28'
								src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'
								alt='visa_mastercard'
							/>
						</div>
					</RadioGroup>
					<div className='h-56 mx-auto my-4 text-white transition-transform transform shadow-xl rounded-2xl w-96 hover:scale-110'>
						<img
							className='relative object-cover w-full h-full rounded-2xl'
							src='https://i.imgur.com/kGkSg1v.png'
							alt='credit-card-bg'
						/>
						<img className='absolute w-12 top-8 left-8' src='https://i.imgur.com/eReh766.png' alt='card-chip' />
						<div className='absolute w-full px-8 top-[5.5rem]'>
							<p className='pb-1 text-sm font-light'>卡號</p>
							<p className='font-medium tracking-more-wider'>
								{cardNumber == '' ? '＊＊＊＊ ＊＊＊＊ ＊＊＊＊ ＊＊＊＊' : cardNumber}
							</p>
							<div className='flex justify-between pt-5 pr-6 text-xs tracking-wider'>
								<div>
									<p className='pb-1 font-light'>持卡人</p>
									<p className='font-medium'>{nameOnCard == '' ? '＊＊＊' : nameOnCard}</p>
								</div>
								<div>
									<p className='pb-1 font-light'>有效期限</p>
									<p className='font-medium '>{expDate == '' ? '＊＊／＊＊' : expDate}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='mb-10 space-y-4'>
						<TextField
							required
							id='cardNumber'
							label='信用卡卡號'
							fullWidth
							autoComplete='cc-number'
							variant='standard'
							value={cardNumber}
							onChange={handleCardNumberChange}
						/>
						<div className='flex items-center space-x-10'>
							<TextField
								required
								id='expDate'
								label='有效期限'
								fullWidth
								autoComplete='cc-exp'
								variant='standard'
								value={expDate}
								onChange={handleExpDateChange}
							/>
							<TextField required id='cvv' label='末３碼 CVV' fullWidth autoComplete='cc-csc' variant='standard' />
						</div>
						<TextField
							required
							id='nameOnCard'
							label='持卡人姓名'
							fullWidth
							autoComplete='cc-name'
							variant='standard'
							value={nameOnCard}
							onChange={handleNameChange}
						/>
					</div>
					<h5 className='mb-2'>付款項目</h5>
					<div className='flex items-center justify-between mb-14'>
						<p>香油錢</p>
						<p className='font-bold'>NT＄100 TWD</p>
					</div>
					<Button variant='contained' fullWidth={true} onClick={() => router.push('/light/result')}>
						完成付款
					</Button>
				</Paper>
			</Container>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
