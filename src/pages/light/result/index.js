import { useRouter } from 'next/router'
import { X as Close } from 'react-bootstrap-icons'
import Chart from '../../../components/Chart/Chart'
import { multiLineOption } from '../../../components/Chart/options/multiLineOption'
import ResultTable from '../../../components/Light/ResultTable'
import SaveButton from '../../../components/Light/SaveButton'
import StarryBackground from '../../../components/StarryBackground/StarryBackground'
import { INDUSTRY_CATEGORIES } from '../../../constants'
import { getServerAuthSession } from '../../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	const currentURL = ctx.req.url
	const categoryParam = decodeURIComponent(currentURL.split('category=')[1]).split('&date=')[0]

	if (INDUSTRY_CATEGORIES.includes(categoryParam) && currentURL.includes(session.user.id))
		return { props: { user: session.user, currentURL } }
	else
		return {
			redirect: {
				destination: '/error',
			},
		}
}

export default function Result() {
	const router = useRouter()
	const { category, id, date } = router.query

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-14 md:pb-20'}>
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
