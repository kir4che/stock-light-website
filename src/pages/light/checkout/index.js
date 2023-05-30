import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Checkout() {
	const router = useRouter()

	const [value, setValue] = useState('credit_card')
	const [open, setOpen] = useState(false)

	const handleChange = (event) => {
		setValue(event.target.value)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const [cardNumber, setCardNumber] = useState('')
	const [nameOnCard, setNameOnCard] = useState('')
	const [expMonth, setExpMonth] = useState('')
	const [expYear, setExpYear] = useState('')

	const handleCardNumberChange = (event) => {
		setCardNumber(event.target.value)
	}

	const handleNameChange = (event) => {
		setNameOnCard(event.target.value)
	}

	const handleExpMonthChange = (event) => {
		setExpMonth(event.target.value)
	}

	const handleExpYearChange = (event) => {
		setExpYear(event.target.value)
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
						value={value}
						onChange={handleChange}
					>
						{/* <div className='flex items-center justify-between'>
							<FormControlLabel value='paypal' control={<Radio />} label='Paypal' />
							<img
								className='w-20'
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png'
								alt='paypal'
							/>
						</div> */}
						<div className='flex items-center justify-between'>
							<FormControlLabel value='credit_card' control={<Radio />} label='Credit Card' />
							<img
								className='w-28'
								src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'
								alt='visa_mastercard'
							/>
						</div>
					</RadioGroup>
					<div className='h-56 mx-auto my-6 text-white transition-transform transform shadow-xl rounded-2xl w-96 hover:scale-110'>
						<img
							className='relative object-cover w-full h-full rounded-2xl'
							src='https://i.imgur.com/kGkSg1v.png'
							alt='credit-card-bg'
						/>
						<img className='absolute w-12 top-8 left-8' src='https://i.imgur.com/eReh766.png' alt='card-chip' />
						<div className='absolute w-full px-8 top-[5.5rem]'>
							<p className='pb-1 text-sm font-light'>卡號</p>
							<p className='font-medium tracking-widest'>
								{cardNumber == '' ? '＊＊＊＊ ＊＊＊＊ ＊＊＊＊ ＊＊＊＊' : cardNumber.replace(/(.{4})/g, '$1 ')}
							</p>
							<div className='flex justify-between pt-5 pr-6 text-xs'>
								<div>
									<p className='pb-1 font-light'>持卡人</p>
									<p className='font-medium tracking-widest'>{nameOnCard == '' ? '＊＊＊' : nameOnCard}</p>
								</div>
								<div>
									<p className='pb-1 font-light'>有效期限</p>
									<p className='font-medium tracking-widest'>
										{expMonth == '' && expYear == '' ? '＊＊／＊＊' : `${expMonth}／${expYear}`}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='mb-10 space-y-4'>
						<TextField
							id='cardNumber'
							label='信用卡卡號'
							fullWidth
							autoComplete='cc-number'
							variant='standard'
							value={cardNumber}
							inputProps={{ maxLength: 16 }}
							onChange={handleCardNumberChange}
							required
						/>
						<div className='flex items-center space-x-4'>
							<FormControl sx={{ mt: 2, minWidth: 120 }} size='small'>
								<InputLabel>有效月份</InputLabel>
								<Select id='expMonth' value={expMonth} label='有效月份' onChange={handleExpMonthChange} required>
									<MenuItem value='01'>1</MenuItem>
									<MenuItem value='02'>2</MenuItem>
									<MenuItem value='03'>3</MenuItem>
									<MenuItem value='04'>4</MenuItem>
									<MenuItem value='05'>5</MenuItem>
									<MenuItem value='06'>6</MenuItem>
									<MenuItem value='07'>7</MenuItem>
									<MenuItem value='08'>8</MenuItem>
									<MenuItem value='09'>9</MenuItem>
									<MenuItem value='10'>10</MenuItem>
									<MenuItem value='11'>11</MenuItem>
									<MenuItem value='12'>12</MenuItem>
								</Select>
							</FormControl>
							<FormControl sx={{ mt: 2, minWidth: 120 }} size='small'>
								<InputLabel>有效年份</InputLabel>
								<Select id='expYear' value={expYear} label='有效年份' onChange={handleExpYearChange} required>
									<MenuItem value='23'>23</MenuItem>
									<MenuItem value='24'>24</MenuItem>
									<MenuItem value='25'>25</MenuItem>
									<MenuItem value='26'>26</MenuItem>
									<MenuItem value='27'>27</MenuItem>
									<MenuItem value='28'>28</MenuItem>
									<MenuItem value='29'>29</MenuItem>
									<MenuItem value='30'>30</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id='cvv'
								label='末３碼 CVV'
								fullWidth
								autoComplete='cc-csc'
								variant='standard'
								inputProps={{ maxLength: 3 }}
								required
							/>
						</div>
						<TextField
							id='nameOnCard'
							label='持卡人姓名'
							fullWidth
							autoComplete='cc-name'
							variant='standard'
							value={nameOnCard}
							onChange={handleNameChange}
							required
						/>
					</div>
					<h5 className='mb-2'>付款項目</h5>
					<div className='flex items-center justify-between mb-14'>
						<p>香油錢</p>
						<p className='font-bold'>NT＄100 TWD</p>
					</div>
					<Button type='submit' variant='contained' fullWidth={true} onClick={handleClickOpen}>
						完成付款
					</Button>
				</Paper>
			</Container>
			<Dialog
				open={open}
				fullWidth={true}
				maxWidth='xs'
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogContent className='space-y-4 text-center'>
					<svg
						aria-hidden='true'
						class='w-24 h-24 text-green-500 rounded-full bg-green-100 p-2 mx-auto'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
							clip-rule='evenodd'
						></path>
					</svg>
					<DialogContentText id='alert-dialog-description'>
						<span className='text-lg font-bold tracking-wider text-text_black'>付款完成</span>
					</DialogContentText>
				</DialogContent>
				<DialogActions className='mx-auto'>
					<Button onClick={() => router.push('/light/result')} autoFocus>
						查看祈福結果
					</Button>
				</DialogActions>
			</Dialog>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}

function CreditCard() {}
