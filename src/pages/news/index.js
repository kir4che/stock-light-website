export default function News() {
	const news = [
		{
			title: 'AI狂熱驚似「20多年前大災難」！他預言下場：恐付慘痛代價',
			content:
				'美國半導體大廠輝達（Nvidia）近日股價飆漲，帶動人工智慧（AI）相關題材同步大漲，但頂尖經濟學家警告，此次市場對AI的狂熱，與2000年左右的網路泡沫極為相似，投資人盲目搶進AI概念股，可能會付出慘痛的代價。',
			link: 'https://tw.stock.yahoo.com/news/ai%E7%8B%82%E7%86%B1%E9%A9%9A%E4%BC%BC-20%E5%A4%9A%E5%B9%B4%E5%89%8D%E5%A4%A7%E7%81%BD%E9%9B%A3-%E4%BB%96%E9%A0%90%E8%A8%80%E4%B8%8B%E5%A0%B4-%E6%81%90%E4%BB%98%E6%85%98%E7%97%9B%E4%BB%A3%E5%83%B9-101402007.html',
			date: '2023/05/29',
			source: 'yahoo！股市',
		},
		{
			title: '一度賠500萬！「哲哲老師」郭哲榮出清0050 倒賺千萬元嘆：強者的孤獨',
			content:
				'有「最狂分析師」之稱的摩爾證券投顧公司投資長郭哲榮，去年（2022年）以6000萬元買進元大台灣50 ETF（0050），期間帳面一度虧損500萬元，不過他始終未認賠賣出，直到今天他出清持股倒賺約1151萬元，投資報酬率近20％。',
			link: 'https://tw.stock.yahoo.com/news/%E5%BA%A6%E8%B3%A0500%E8%90%AC-%E5%93%B2%E5%93%B2%E8%80%81%E5%B8%AB-%E9%83%AD%E5%93%B2%E6%A6%AE%E5%87%BA%E6%B8%850050-%E5%80%92%E8%B3%BA%E5%8D%83%E8%90%AC%E5%85%83%E5%98%86-%E5%BC%B7%E8%80%85%E7%9A%84%E5%AD%A4%E7%8D%A8-081826752.html',
			date: '2023/05/29',
			source: 'yahoo！股市',
		},
		{
			title: 'AI概念股續旺 指數收漲131點站上16600點',
			content:
				'台股今天AI概念股持續表現，在電子股領軍，傳產、金融跟進下，指數跳空上漲後維持高檔震盪格局，站上16600點、再創波段新高，終場上漲131.25點，成交值已經連續3個交易日衝破新台幣3000億元。',
			link: 'https://tw.stock.yahoo.com/news/%E5%8F%B0%E8%82%A1%E7%9B%A4%E5%BE%8C-ai%E6%A6%82%E5%BF%B5%E8%82%A1%E7%BA%8C%E6%97%BA-%E6%8C%87%E6%95%B8%E6%94%B6%E6%BC%B2131%E9%BB%9E%E7%AB%99%E4%B8%8A16600%E9%BB%9E-061732366.html',
			date: '2023/05/29',
			source: '中央社',
		},
		{
			title: '全台蝸居加劇…買房面積 十年來縮水11坪',
			content:
				'房價居高不下，小宅化趨勢下，「蝸居」現象愈來愈嚴重。根據不動產資訊平台統計，今年第一季每戶住宅買賣移轉平均面積為31.7坪，十年來減少11.5坪，縮水面積相當於一間套房，尤其過去低房價的中南部近十年縮水情形更加嚴重，高雄減少20坪、台中減少近15坪。',
			link: 'https://tw.stock.yahoo.com/news/%E5%85%A8%E5%8F%B0%E8%9D%B8%E5%B1%85%E5%8A%A0%E5%8A%87-%E8%B2%B7%E6%88%BF%E9%9D%A2%E7%A9%8D-%E5%8D%81%E5%B9%B4%E4%BE%86%E7%B8%AE%E6%B0%B411%E5%9D%AA-201000617.html',
			date: '2023/05/29',
			source: '工商時報',
		},
		{
			title: 'AI黃袍加身就是狂 台股續創波段高',
			content:
				'AI當道，台股收盤指數創近一年新高！上週Nvidia挾遠優於市場預期財測股價狂飆，示範AI黃袍加身有多狂，在Nvidia領軍美國費城半導體指數及Nasdaq指數狂飆下，台灣的公司也拚命想沾上邊吃香喝辣，雖然台積電(2330)股價經過連日飆漲今天暫歇，資金持續點火股王信驊(5274)、股后大立光(3008)、世芯-KY(3661)、譜瑞-KY(4966)及創意(3443)等千金股，世芯-KY及譜瑞以漲停作收，創意也站上1500元關卡，智邦(2345)、眾達-KY(4977)、華星光(4979)等光通訊股也跟著AI題材起舞漲停。',
			link: 'https://tw.stock.yahoo.com/news/%E7%9B%A4%E5%BE%8C%E8%A7%A3%E6%9E%90-ai%E9%BB%83%E8%A2%8D%E5%8A%A0%E8%BA%AB%E5%B0%B1%E6%98%AF%E7%8B%82-%E5%8F%B0%E8%82%A1%E7%BA%8C%E5%89%B5%E6%B3%A2%E6%AE%B5%E9%AB%98-071049980.html',
			date: '2023/05/29',
			source: '時報資訊',
		},
		{
			title: '債限解套在望、AI題材狂燒 美股四大指數齊飆',
			content:
				'美國債限協商達成協議在望，加上AI題材持續狂燒帶動，26日美股四大指數齊飆。道瓊指數終止連五黑，那斯達克指數與標普指數均創去年8月來收盤新高，那指更繳出周線連五紅的表現。',
			link: 'https://tw.stock.yahoo.com/news/%E5%90%84%E5%A0%B1%E8%A6%81%E8%81%9E-%E5%82%B5%E9%99%90%E8%A7%A3%E5%A5%97%E5%9C%A8%E6%9C%9B-ai%E9%A1%8C%E6%9D%90%E7%8B%82%E7%87%92-%E7%BE%8E%E8%82%A1%E5%9B%9B%E5%A4%A7%E6%8C%87%E6%95%B8%E9%BD%8A%E9%A3%86-011948512.html',
			date: '2023/05/28',
			source: '時報資訊',
		},
		{
			title: '16檔強中強 法人連買',
			content:
				'人工智能（AI）超乎預期的發展，燃起下半年景氣回溫的信心，搭配法人買盤全力搶進，近九個交易日累計買超2,239.26億元，助攻台股登上波段高點，市場專家表示，投資人可聚焦仁寶、晶技等16檔個股，兼具三大法人連續買超、股價站回所有均線之上，產業前景看好的強勢股，有望扮演台股衝高的先鋒部隊。',
			link: 'https://tw.stock.yahoo.com/news/%E5%90%84%E5%A0%B1%E8%A6%81%E8%81%9E-16%E6%AA%94%E5%BC%B7%E4%B8%AD%E5%BC%B7-%E6%B3%95%E4%BA%BA%E9%80%A3%E8%B2%B7-011948272.html',
			date: '2023/05/28',
			source: '時報資訊',
		},
		{
			title: '外資狂買432億 史上第七大 台股飛越16,500點',
			content:
				'輝達（Nvidia）與台積電大漲外溢效應，台股展開本益比（PE）調升行情，外資26日大舉買超432.6億元，為史上第七大買超水準，加上電子股滿血復活，成交值比重衝上72％創16個半月新高，以及權王台積電衝破三重頂反壓，聯袂推升指數大漲飛越16,500點。',
			link: 'https://tw.stock.yahoo.com/news/%E5%90%84%E5%A0%B1%E8%A6%81%E8%81%9E-%E5%A4%96%E8%B3%87%E7%8B%82%E8%B2%B7432%E5%84%84-%E5%8F%B2%E4%B8%8A%E7%AC%AC%E4%B8%83%E5%A4%A7-%E5%8F%B0%E8%82%A1%E9%A3%9B%E8%B6%8A16-500%E9%BB%9E-011057186.html',
			date: '2023/05/27',
			source: '時報資訊',
		},
		{
			title: '15檔輝達概念股 外資掃貨',
			content:
				'Nvidia（輝達）財報、展望皆大幅優於市場預期，加上執行長黃仁勳在COMPUTEX展期間來台演講，投資專家看好AI題材熱度不斷，篩選台積電、台達電、日月光投控等15檔輝達概念股，26日續獲外資加碼，且股價站穩短、中、長期均線之上，有望扮演盤面領漲指標。',
			link: 'https://tw.stock.yahoo.com/news/%E5%90%84%E5%A0%B1%E8%A6%81%E8%81%9E-15%E6%AA%94%E8%BC%9D%E9%81%94%E6%A6%82%E5%BF%B5%E8%82%A1-%E5%A4%96%E8%B3%87%E6%8E%83%E8%B2%A8-011055575.html',
			date: '2023/05/27',
			source: '時報資訊',
		},
		{
			title: '日盛投信：基本面逐步好轉中 有利台股表現',
			content:
				'日盛投信26日表示，美GPU大廠財報優於預期，科技股氣勢如虹，台股同步受到激勵，帶動相關供應鏈，指數出現向上突破走勢，且配合量能同步增溫，短多展現明顯攻高氣勢，後續等待美國債限協商結果，短線持續觀察外資期現貨籌碼動向。',
			link: 'https://tw.stock.yahoo.com/news/%E5%8F%B0%E5%8C%97%E8%82%A1%E5%B8%82-%E6%97%A5%E7%9B%9B%E6%8A%95%E4%BF%A1-%E5%9F%BA%E6%9C%AC%E9%9D%A2%E9%80%90%E6%AD%A5%E5%A5%BD%E8%BD%89%E4%B8%AD-%E6%9C%89%E5%88%A9%E5%8F%B0%E8%82%A1%E8%A1%A8%E7%8F%BE-085143547.html',
			date: '2023/05/26',
			source: '時報資訊',
		},
	]

	const popularTags = [
		'AI',
		'聯發科',
		'永誠投顧',
		'利率',
		'外資',
		'ETF',
		'金管會',
		'伺服器',
		'營收',
		'CPI',
		'黃金',
		'台積電',
		'美債',
		'萬寶投顧',
		'央行',
		'升息',
		'財報',
		'聯準會',
	]

	return (
		<div className='container w-full mx-auto mt-12 mb-20'>
			<div className='flex md:space-x-14 xl:space-x-24'>
				<article className='w-full'>
					<h3 className='mb-6 font-light'>{new Date().getFullYear()} 年 5 月份</h3>
					{news.map((el) => {
						return (
							<div className='mb-8' key={el.title}>
								<a target='_blank' href={el.link}>
									<h4 className='mb-2 font-bold hover:text-secondary_blue'>{el.title}</h4>
								</a>
								<p className='news-content'>{el.content}</p>
								<p className='mt-6'>
									{el.date}｜{el.source}
								</p>
							</div>
						)
					})}
				</article>
				<div className='hidden space-y-8 w-96 md:block'>
					<div className='relative rounded-full shadow'>
						<input
							type='search'
							name='serch'
							placeholder='Search'
							className='h-10 px-4 pr-10 text-sm rounded-full focus:outline-none'
						/>
						<button type='submit' className='absolute top-0 right-0 mt-3 mr-4'>
							<svg
								className='w-4 h-4 fill-current'
								xmlns='http://www.w3.org/2000/svg'
								version='1.1'
								id='Capa_1'
								x='0px'
								y='0px'
								viewBox='0 0 56.966 56.966'
								width='512px'
								height='512px'
							>
								<path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
							</svg>
						</button>
					</div>
					<div>
						<div className='flex items-center pb-2.5 mb-4 space-x-2 border-b-[3px] border-b-primary_yellow'>
							<img src='https://img.icons8.com/pastel-glyph/32/null/megaphone.png' alt='megaphone' />
							<h5 className='font-medium'>熱門新聞</h5>
						</div>
						<ul className='space-y-3'>
							<li>
								<a target='_blank' href='https://news.cnyes.com/news/id/4875807?exp=a'>
									盤勢下跌後 電動車概念股仍有保障
								</a>
							</li>
							<hr />
							<li>
								<a target='_blank' href='https://news.cnyes.com/news/id/4875756?exp=a'>
									台灣高鐵攜手工研院完成全台首座BRT 本土化發展超標
								</a>
							</li>
							<hr />
							<li>
								<a target='_blank' href='https://news.cnyes.com/news/id/4876028?exp=a'>
									本土確診累計突破百萬 保險局估防疫險理賠高峰時點還沒到
								</a>
							</li>
							<hr />
							<li>
								<a target='_blank' href='https://news.cnyes.com/news/id/4876057?exp=a'>
									樂天電信年底推FWA服務 將涵蓋6 GHz、毫米波頻譜
								</a>
							</li>
							<hr />
							<li>
								<a target='_blank' href='https://news.cnyes.com/news/id/4875712?exp=a'>
									半導體在地化風潮帶動 上品今年營運可望上攻
								</a>
							</li>
						</ul>
					</div>
					<div>
						<div className='flex items-center pb-2.5 mb-4 space-x-2 border-b-[3px] border-b-primary_yellow'>
							<img src='https://img.icons8.com/ios/30/cloud--v1.png' alt='info' />
							<h5 className='font-medium'>人氣話題</h5>
						</div>
						{popularTags.map((tag) => {
							return (
								<p className='inline-block mb-2 mr-1' key={tag}>
									<span className='px-2.5 py-1.5 text-white rounded-full bg-secondary_blue text-sm'>＃{tag}</span>
								</p>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
