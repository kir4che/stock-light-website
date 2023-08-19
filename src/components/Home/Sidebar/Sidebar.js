import ArticleIcon from '@mui/icons-material/Article'
import CampaignIcon from '@mui/icons-material/Campaign'
import InfoIcon from '@mui/icons-material/Info'

export default function HomeSidebar() {
	return (
		<div className='hidden w-64 space-y-12 md:block'>
			<div>
				<div className='flex items-center pb-2.5 mb-4 space-x-1.5 border-b-[3px] border-b-primary_yellow dark:p-1.5 dark:bg-primary_yellow dark:text-zinc-900 dark:border-none'>
					<ArticleIcon />
					<h5 className='font-medium'>理財新聞</h5>
				</div>
				<ul className='space-y-2 text-sm'>
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E5%9C%8B%E6%B3%B0%E9%87%91%E5%8F%B2%E4%B8%8A%E6%9C%80%E5%A4%A7%E8%A6%8F%E6%A8%A1%E7%8F%BE%E5%A2%9E-525-%E5%84%84%E5%85%83-%E5%85%A8%E6%95%B8%E5%8B%9F%E9%9B%86%E5%88%B0%E4%BD%8D-105740254.html'
						>
							國泰金史上最大規模現增525億元 全數募集到位
						</a>
					</li>
					<hr />
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E6%98%8E%E5%B9%B4%E5%85%A8%E7%90%83%E5%8D%8A%E5%B0%8E%E9%AB%94%E7%87%9F%E6%94%B6%E6%81%90%E8%A1%B0%E9%80%803-6-%E8%B7%8C%E7%A0%B46000%E5%84%84%E7%BE%8E%E5%85%83-110055651.html'
						>
							明年全球半導體營收恐衰退3.6% 跌破6000億美元
						</a>
					</li>
					<hr />
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E5%9C%8B%E9%9A%9B%E5%BB%A2%E9%8B%BC%E7%AF%89%E5%BA%95%E5%8F%8D%E5%BD%88-%E8%B1%90%E8%88%88%E9%8B%BC%E7%AD%8B%E7%9B%A4%E5%83%B9%E6%BC%B2-101904810.html'
						>
							國際廢鋼築底反彈 豐興鋼筋盤價漲
						</a>
					</li>
				</ul>
			</div>
			<div>
				<div className='flex items-center pb-2.5 mb-4 space-x-1.5 border-b-[3px] border-b-primary_yellow dark:p-1.5 dark:bg-primary_yellow dark:text-zinc-900 dark:border-none'>
					<CampaignIcon />
					<h5 className='font-medium'>股市公告</h5>
				</div>
				<ul className='space-y-2 text-sm'>
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E5%8F%B0%E6%B3%A5%E4%BB%A3%E5%AD%90%E5%85%AC%E5%8F%B8%E5%8F%B0%E6%B3%A5%E4%B8%AD%E6%BD%A4-%E5%AE%89%E9%A0%86-%E7%92%B0%E4%BF%9D%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%90%91%E9%97%9C%E4%BF%82%E4%BA%BA%E5%8F%96%E5%BE%97%E4%BD%BF%E7%94%A8%E6%AC%8A%E8%B3%87%E7%94%A2-060725210.html'
						>
							台泥代子公司台泥中潤(安順)環保科技有限公司向關係人取得使用權資產
						</a>
					</li>
					<hr />
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E7%AB%9F%E5%A4%A9%E7%94%B3%E8%AB%8B%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%99%BC%E6%98%8E%E5%B0%88%E5%88%A9-%E5%B1%80%E9%83%A8%E9%BA%BB%E9%86%89%E5%8A%91-%E9%BB%8F%E5%9C%9F%E8%A4%87%E5%90%88%E7%B5%84%E5%90%88%E7%89%A9-%E7%8D%B2%E5%87%86-060719134.html'
						>
							竟天申請中華民國發明專利「局部麻醉劑-黏土複合組合物」獲准
						</a>
					</li>
					<hr />
					<li>
						<a
							target='_blank'
							href='https://tw.stock.yahoo.com/news/%E5%85%AC%E5%91%8A-%E5%BB%BA%E9%8C%A9%E5%8F%8A%E9%87%8D%E8%A6%81%E5%AD%90%E5%85%AC%E5%8F%B810%E6%9C%88%E4%BB%BD%E8%B2%A0%E5%82%B5%E6%AF%94%E7%8E%87-%E6%B5%81%E5%8B%95%E6%AF%94%E7%8E%87%E5%8F%8A%E9%80%9F%E5%8B%95%E6%AF%94%E7%8E%87%E8%B3%87%E8%A8%8A-055144251.html'
						>
							建錩及重要子公司10月份負債比率、流動比率及速動比率資訊
						</a>
					</li>
				</ul>
			</div>
			<div>
				<div className='flex items-center pb-2.5 mb-4 space-x-1.5 border-b-[3px] border-b-primary_yellow dark:p-1.5 dark:bg-primary_yellow dark:text-zinc-900 dark:border-none'>
					<InfoIcon />
					<h5 className='font-medium'>版本資訊</h5>
				</div>
				<ul className='space-y-2 text-sm'>
					<li>v0.2 版本上線</li>
				</ul>
			</div>
		</div>
	)
}
