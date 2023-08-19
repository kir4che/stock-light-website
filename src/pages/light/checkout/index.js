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
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { useState } from 'react'

export default function Checkout() {
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => setOpen(true)

	const [value, setValue] = useState('credit_card')

	const handleChange = (e) => setValue(e.target.value)

	const [cardNumber, setCardNumber] = useState('')
	const [nameOnCard, setNameOnCard] = useState('')
	const [expMonth, setExpMonth] = useState('')
	const [expYear, setExpYear] = useState('')

	const handleCardNumberChange = (e) => setCardNumber(e.target.value)

	const handleNameChange = (e) => setNameOnCard(e.target.value)

	const handleExpMonthChange = (e) => setExpMonth(e.target.value)

	const handleExpYearChange = (e) => setExpYear(e.target.value)

	return (
		<div id='stars-background-container'>
			<Container component='main' maxWidth='sm' sx={{ mt: 12, mb: 16 }}>
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
						<div className='flex items-center justify-between'>
							<FormControlLabel value='credit_card' control={<Radio />} label='信用卡' />
							<Image
								width={120}
								height={40}
								src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'
								alt='visa-mastercard'
							/>
						</div>
					</RadioGroup>
					<div className='mx-auto my-6 text-white transition-transform transform shadow-xl w-96 rounded-2xl hover:scale-110'>
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
					<Button type='submit' fullWidth={true} onClick={handleClickOpen}>
						完成付款
					</Button>
				</Paper>
			</Container>
			<SuccessDialog open={open} />
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}

function SuccessDialog(props) {
	const router = useRouter()

	const { open } = props

	return (
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
					className='w-24 h-24 p-2 mx-auto text-green-500 bg-green-100 rounded-full'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'></path>
				</svg>
				<DialogContentText id='alert-dialog-description'>
					<span className='text-lg font-bold tracking-wider text-zinc-800'>付款完成</span>
				</DialogContentText>
			</DialogContent>
			<DialogActions className='mx-auto'>
				<Button onClick={() => router.push('/light/result')} autoFocus>
					查看祈福結果
				</Button>
			</DialogActions>
		</Dialog>
	)
}
