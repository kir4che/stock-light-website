import { Button, Dialog, DialogContent } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { X as Close } from 'react-bootstrap-icons'
import Chart from '../../../../components/Chart/Chart'
import { multiLineOption } from '../../../../components/Chart/options/multiLineOption'
import ResultTable from '../../../../components/Light/ResultTable'
import SaveButton from '../../../../components/Light/SaveButton'
import StarryBackground from '../../../../components/StarryBackground/StarryBackground'
import { INDUSTRY_CATEGORIES } from '../../../../constants'
import { getServerAuthSession } from '../../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	const categoryParam = decodeURIComponent(currentURL.split('category=')[1]).split('&date=')[0]

	if (INDUSTRY_CATEGORIES.includes(categoryParam)) return { props: { user: session.user, currentURL } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

export default function Result() {
	const router = useRouter()
	const { category, date } = router.query

	const resultStocks = ['聯電', '聯發科', '台積電', '兆豐金', '華南金']

	const [open, setOpen] = useState(true)

	const handleClose = () => setOpen(false)

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-14 md:pb-20'}>
			{/* 先以光明燈呈現預測結果的五檔股票名稱 */}
			<Dialog open={open} maxWidth='md' fullWidth>
				<DialogContent className='flex flex-col items-center justify-between p-6 overflow-x-scroll overflow-y-hidden text-center h-[450px] dark:text-zinc-100 dark:bg-zinc-800'>
					<h3 className='tracking-wider'>本日光明燈（{category}股）</h3>
					<div className='flex items-center justify-center'>
						{resultStocks.map((stock, index) => (
							<div className='lantern lanterntag_container animate-none' key={index}>
								<div className='laternlight'></div>
								<div className='rounded-t-lg left rounded-b-md'></div>
								<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }}>
									<h3 className='pl-8 font-bold tracking-widest text-zinc-100'>{stock}</h3>
								</div>
								<div className='flame'></div>
							</div>
						))}
					</div>
					<Button
						type='submit'
						size='large'
						onClick={handleClose}
						className='px-24 my-4 rounded-full text-zinc-100 bg-secondary_blue hover:bg-sky-500'
					>
						查看詳情
					</Button>
				</DialogContent>
			</Dialog>
			<div className='relative w-full px-4 pt-6 pb-10 bg-white rounded sm:px-8 lg:px-10 dark:bg-zinc-900/50'>
				<div className='flex items-start justify-between'>
					<div className='flex items-end mb-6 space-x-2 tracking-wider'>
						<h3>天氣型態</h3>
						<p className='text-sm opacity-80'>{date}</p>
					</div>
					<Close
						size={30}
						className='absolute cursor-pointer top-3 right-3 opacity-80 hover:opacity-60'
						onClick={() => router.push('/light')}
					/>
				</div>
				<Chart option={multiLineOption()} customHeight={'h-72 sm:h-80 md:h-88 lg:h-96 xl:h-[520px]'} />
				<div className='my-6 space-y-5'>
					<ResultTable />
					<p className='text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</div>
				<SaveButton />
			</div>{' '}
		</StarryBackground>
	)
}
