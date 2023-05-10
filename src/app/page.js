'use client'

import Banner from '@/components/banner'
import Taiex from '@/components/taiex'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<main className='container w-full mx-auto'>
			<Banner />
			<div className='grid grid-flow-col grid-rows-3 mt-12 mb-20 lg:gap-20'>
				<div className='hidden row-span-3 space-y-8 w-72 lg:block'>
					<div>
						<div className='flex items-center pb-1.5 mb-3 space-x-2 border-b-[3px] border-b-primary_yellow'>
							<img src='https://img.icons8.com/small/32/null/news.png' alt='news' />
							<h5 className='font-medium'>理財新聞</h5>
						</div>
						<ul className='space-y-3'>
							<li>國泰金籌資525億元 創金控成立以來最大規模現增案</li>
							<hr />
							<li>明年全球半導體營收恐衰退3.6% 跌破6000億美元</li>
							<hr />
							<li>國際廢鋼築底反彈 豐興鋼筋盤價漲</li>
						</ul>
					</div>
					<div>
						<div className='flex items-center pb-1.5 mb-3 space-x-2 border-b-[3px] border-b-primary_yellow'>
							<img src='https://img.icons8.com/pastel-glyph/32/null/megaphone.png' alt='megaphone' />
							<h5 className='font-medium'>股市公告</h5>
						</div>
						<ul className='space-y-3'>
							<li>台泥代子公司台泥中潤(安順)環保科技有限公司向關係人取得使用權資產</li>
							<hr />
							<li>竟天申請中華民國發明專利「局部麻醉劑-黏土複合組合物」獲准</li>
							<hr />
							<li>建錩及重要子公司10月份負債比率、流動比率及速動比率資訊</li>
						</ul>
					</div>
					<div>
						<div className='flex items-center pb-1.5 mb-3 space-x-2 border-b-[3px] border-b-primary_yellow'>
							<img src='https://img.icons8.com/pulsar-line/30/null/info.png' alt='info' />
							<h5 className='font-medium'>改版資訊</h5>
						</div>
						<ul>
							<li>v0.1 版本上線</li>
						</ul>
					</div>
				</div>
				<div className='col-span-12'>
					<div className='mb-8'>
						<h3 className='mb-2 font-medium'>台灣大盤指數</h3>
						<Taiex />
					</div>
					<div className='flex items-center w-full'>
						<img className='w-12' src='../images/good-quality-64.png' alt='recommend' />
						<h4 className='pl-1 pr-6 font-bold'>本日預測股票</h4>
						<button
							className='light-btn font-medium cursor-pointer px-12 py-1.5 bg-primary_yellow'
							type='button'
							onClick={() => router.push('/light')}
						>
							我要點燈！
						</button>
					</div>
				</div>
				<div className='col-span-12 row-span-2'>
					<h3 className='mb-2 font-medium'>本日最佳趨勢</h3>
				</div>
			</div>
		</main>
	)
}
