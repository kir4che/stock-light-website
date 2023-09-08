import CloseIcon from '@mui/icons-material/Close'
import { Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'
import SuccessDialog from '../../../components/SuccessDialog/SuccessDialog'
import { INDUSTRY_CATEGORIES } from '../../../constants'
import { getCurrentDate } from '../../../utils/getCurrentDate'
import { getServerAuthSession } from '../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	const categoryParam = decodeURIComponent(currentURL.split('category=')[1])

	if (INDUSTRY_CATEGORIES.includes(categoryParam)) return { props: { user: session.user, currentURL } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

// 🚩尚未串接金流
export default function Checkout({ user }) {
	const router = useRouter()
	const { category } = router.query

	const [cardNumber, setCardNumber] = useState('')
	const [nameOnCard, setNameOnCard] = useState('')
	const [expMonth, setExpMonth] = useState(1)
	const [expYear, setExpYear] = useState(2024)
	const [cvv, setCvv] = useState('')

	const [success, setSuccess] = useState(false)

	// 定義一個只允許 number 的 regex
	const numberRegex = /^[0-9]*$/

	const handleCardNumberChange = (e) => {
		const inputValue = e.target.value
		if (numberRegex.test(inputValue)) setCardNumber(inputValue)
	}

	const handleNameChange = (e) => setNameOnCard(e.target.value)

	const handleCVVChange = (e) => {
		const inputValue = e.target.value
		if (numberRegex.test(inputValue)) setCvv(inputValue)
	}

	const handleSubmit = () => {
		if (cardNumber && nameOnCard && expMonth && expYear) setSuccess(true)
		setTimeout(() => {
			const token = uuidv4()
			router.push(`/light/result/${token}?category=${category}&date=${getCurrentDate('-')}`)
		}, 3000)
	}

	return (
		<>
			{success ? (
				<SuccessDialog title={'付款完成'} content={'將自動跳轉至點燈結果！'} />
			) : (
				<StarryBackground className={'pb-20 pt-14'}>
					<div className='relative max-w-xl px-12 pt-8 pb-12 mx-auto bg-white dark:bg-zinc-800 sm:rounded-xl'>
						<CloseIcon
							className='absolute cursor-pointer top-4 right-4 opacity-80 hover:opacity-60'
							onClick={() => router.push('/light')}
						/>
						<h3 className='mb-8 font-bold text-center'>線上付款</h3>
						<h5 className='mb-2'>付款方式</h5>
						<RadioGroup defaultValue='credit_card' className='mb-2' row>
							<FormControlLabel label='信用卡' value='credit_card' control={<Radio />} />
							<Image
								width={150}
								height={40}
								src='https://www.freepnglogos.com/uploads/visa-and-mastercard-logo-26.png'
								alt='visa-mastercard'
							/>
						</RadioGroup>
						{/* 信用卡實際顯示 */}
						<div className='mx-auto my-10 transition-transform transform shadow-xl text-zinc-100 w-96 rounded-2xl hover:scale-110'>
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
										<p className='font-medium tracking-widest'>{`${expMonth.toString().padStart(2, '0')}／${expYear
											.toString()
											.substr(-2)}`}</p>
									</div>
								</div>
							</div>
						</div>
						<FormControl className='mb-10 space-y-6' fullWidth>
							<TextField
								id='cardNumber'
								value={cardNumber}
								onChange={handleCardNumberChange}
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
									onChange={(e) => setExpMonth(e.target.value)}
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
									onChange={(e) => setExpYear(e.target.value)}
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
									value={cvv}
									onChange={handleCVVChange}
									placeholder='末３碼'
									inputProps={{ maxLength: 3 }}
									className='rounded dark:bg-zinc-100'
									fullWidth
									required
								/>
							</div>
							<TextField
								id='nameOnCard'
								value={nameOnCard}
								onChange={handleNameChange}
								placeholder='持卡人姓名'
								className='rounded dark:bg-zinc-100'
								fullWidth
								required
							/>
						</FormControl>
						<hr />
						<div className='my-3 text-sm leading-6 opacity-80'>
							<p className='mb-2'>會員資料</p>
							<p className='opacity-60'>會員名稱：{user.name}</p>
							<p className='opacity-60'>Email：{user.email}</p>
						</div>
						<hr />
						<div className='flex items-center justify-between mt-5 mb-16 tracking-widest'>
							<p>
								光明燈香油錢（<span className='font-bold'>{category}</span>股）
							</p>
							<p className='font-bold'>NT$100</p>
						</div>
						<Button
							fullWidth
							size='large'
							className='text-zinc-100 bg-secondary_blue hover:bg-sky-500'
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
