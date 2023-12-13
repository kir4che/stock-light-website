import CloseIcon from '@mui/icons-material/Close'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import Loading from '@/components/common/Loading'
import fetchEReport from '@/utils/fetchEReport'
import {
	fetchAssetStatement,
	fetchCashFlowStatement,
	fetchIncomeStatement,
	fetchLiabilitiesEquity,
} from '@/utils/fetchStockFS'
import fetchStockNews from '@/utils/fetchStockNews'

export default function AnalysisTable({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [sentimentOpen, setSentimentOpen] = useState(false)
	const [selectedChart, setSelectedChart] = useState(0)
	const [selectedRatio, setSelectedRatio] = useState(0)

	const [fsData, setFsData] = useState({
		assetStatement: [],
		liabilityEquityStatement: [],
		incomeStatement: [],
		cashFlowStatement: [],
		eReport: [],
	})
	const { assetStatement, liabilityEquityStatement, cashFlowStatement, incomeStatement, eReport } = fsData

	const [sentimentData, setSentimentData] = useState([])
	const [newsData, setNewsData] = useState([])

	const fetchSentimentData = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/sentiment_analysis/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			if (data.success) {
				setSentimentData(data.data)
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	const sentimentIcon = (sentiment) => {
		if (sentiment === '正面') {
			return (
				<Image
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
					alt='sunny-weather'
				/>
			)
		} else if (sentiment === '中性') {
			return (
				<Image
					src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
					alt='cloudy-weather'
				/>
			)
		} else if (sentiment === '負面') {
			return (
				<Image
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
					alt='rainy-weather'
				/>
			)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			setFsData({
				assetStatement: await fetchAssetStatement({ stockId, setIsLoading }),
				liabilityEquityStatement: await fetchLiabilitiesEquity({ stockId, setIsLoading }),
				incomeStatement: await fetchIncomeStatement({ stockId, setIsLoading }),
				cashFlowStatement: await fetchCashFlowStatement({ stockId, setIsLoading }),
				eReport: await fetchEReport({ stockId, setIsLoading }),
			})
			setNewsData(await fetchStockNews({ stockId, setIsLoading }))
		}
		fetchData()
		fetchSentimentData()
	}, [stockId])

	return (
		<div className='flex flex-col gap-4'>
			{/* 財報比率 */}
			{assetStatement[assetStatement.length - 1] &&
				liabilityEquityStatement[liabilityEquityStatement.length - 1] &&
				incomeStatement[incomeStatement.length - 1] &&
				cashFlowStatement[cashFlowStatement.length - 1] && (
					<section className='flex flex-col space-y-2'>
						<div className='space-y-2 sm:space-y-0 sm:gap-4 sm:flex'>
							<h4>
								{assetStatement[assetStatement.length - 1].year} Q{assetStatement[assetStatement.length - 1].quarter}{' '}
								財務比率
							</h4>
							<section className='mb-2 space-x-1 text-sm'>
								{['財務結構', '償債能力', '經營能力', '獲利能力'].map((item, index) => (
									<button
										className={`px-4 py-1 dark:border-zinc-500 border rounded-full ${
											selectedRatio === index
												? 'bg-amber-200 dark:bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-300/80'
												: 'hover:bg-zinc-100/50 bg-white dark:bg-zinc-800 dark:hover:bg-zinc-900/60'
										}`}
										onClick={() => setSelectedRatio(index)}
										key={index}
									>
										{item}
									</button>
								))}
							</section>
						</div>
						<div className='flex justify-start w-full gap-6 px-4 py-3 overflow-x-auto bg-white rounded-lg shadow dark:bg-zinc-900/60'>
							{selectedRatio === 0 ? (
								<>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>負債比率</span>
										<span className='text-2xl text-secondary_blue'>
											{liabilityEquityStatement[liabilityEquityStatement.length - 1].debtRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>長期資金佔固定資產比率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].longTermLiabilitiesRatio} %
										</span>
									</p>
								</>
							) : selectedRatio === 1 ? (
								<>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>流動比率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].currentRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>速動比率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].quickRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>現金對流動負債比率</span>
										<span className='text-2xl text-secondary_blue'>
											{cashFlowStatement[cashFlowStatement.length - 1].operatingCashFlowToCurrentLiabilitiesRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>現金對負債比率</span>
										<span className='text-2xl text-secondary_blue'>
											{cashFlowStatement[cashFlowStatement.length - 1].operatingCashFlowToLiabilitiesRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>利息保障倍數</span>
										<span className='text-2xl text-secondary_blue'>
											{cashFlowStatement[cashFlowStatement.length - 1].interestCoverageRatio} 倍
										</span>
									</p>
								</>
							) : selectedRatio === 2 ? (
								<>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>應收帳款週轉率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].accountsAndNotesReceivableTurnoverRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>平均收現天數</span>
										<span className='text-2xl text-secondary_blue'>
											{Math.round(
												365 /
													parseFloat(assetStatement[assetStatement.length - 1].accountsAndNotesReceivableTurnoverRatio)
											)}{' '}
											天
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>存貨週轉率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].inventoryTurnoverRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>平均銷貨天數</span>
										<span className='text-2xl text-secondary_blue'>
											{Math.round(365 / parseFloat(assetStatement[assetStatement.length - 1].inventoryTurnoverRatio))}{' '}
											天
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>固定資產週轉率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].fixedAssetsTurnoverRatio} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>總資產週轉率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].assetsTurnoverRatio} %
										</span>
									</p>
								</>
							) : selectedRatio === 3 ? (
								<>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>資產報酬率</span>
										<span className='text-2xl text-secondary_blue'>
											{assetStatement[assetStatement.length - 1].roa} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>股東權益報酬率</span>
										<span className='text-2xl text-secondary_blue'>
											{liabilityEquityStatement[liabilityEquityStatement.length - 1].roe} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>財務槓桿指數</span>
										<span className='text-2xl text-secondary_blue'>
											{(
												Math.round(
													assetStatement[assetStatement.length - 1].assetsTurnoverRatio *
														assetStatement[assetStatement.length - 1].roa *
														100
												) / 100
											).toFixed(2)}
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>淨利率</span>
										<span className='text-2xl text-secondary_blue'>
											{incomeStatement[incomeStatement.length - 1].netIncomeMargin} %
										</span>
									</p>
									<p className='flex flex-col text-center whitespace-nowrap'>
										<span className='font-light opacity-80'>每股盈餘</span>
										<span className='text-2xl text-secondary_blue'>
											{incomeStatement[incomeStatement.length - 1].eps}
										</span>
									</p>
								</>
							) : null}
						</div>
					</section>
				)}
			<div className='flex flex-col items-start justify-between gap-6 sm:flex-row sm:h-80'>
				{sentimentData.length !== 0 ? (
					<section className='flex-col h-full gap-2.5 sm:w-3/4 flex-center-between'>
						<div className='h-full p-4 overflow-y-scroll bg-white rounded-lg shadow dark:bg-zinc-900/60'>
							<h4 className='mb-2'>情緒分析</h4>
							{sentimentData.slice(0, 3).map((item, index) => (
								<div className='flex items-center space-y-4 gap-x-2' key={index}>
									{sentimentIcon(item.sentiment)}
									<div>
										<p className='mb-1.5 space-x-2 font-medium leading-6'>
											<span>{item.title}</span>
											<button className='w-10 text-sm rounded outline-none dark:text-zinc-800 bg-primary_yellow'>
												{item.score}
											</button>
										</p>
										<p className='text-sm font-light line-clamp-1 text-zinc-500 dark:text-zinc-400'>
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
						<button
							className='self-end px-4 text-white rounded-full hover:bg-sky-500 bg-secondary_blue'
							onClick={() => {
								setSentimentOpen(true)
							}}
						>
							查看更多
						</button>
						<Dialog open={sentimentOpen} maxWidth='md' fullWidth onClose={() => setSentimentOpen(false)}>
							<CloseIcon
								className='absolute cursor-pointer top-3 right-3 dark:text-zinc-100 opacity-80 hover:opacity-60'
								onClick={() => setSentimentOpen(false)}
							/>
							<DialogTitle className='text-2xl dark:bg-zinc-800 dark:text-zinc-100'>情緒分析</DialogTitle>
							<DialogContent className='dark:bg-zinc-800 dark:text-zinc-100'>
								<Chart
									option={{
										radar: {
											center: ['50%', '50%'],
											indicator: sentimentData.map((item) => ({
												name: item.title.length > 10 ? item.title.substring(0, 20) + '...' : item.title,
												max: 1,
												min: -1,
											})),
											axisName: {
												color: '#A0A0A0',
											},
											axisLabel: {
												show: true,
												showMaxLabel: true,
												showMinLabel: true,
												fontSize: 10,
												color: '#F4F3F4',
											},
											splitArea: {
												areaStyle: {
													color: ['#8CCCFF', '#A0D078', '#FFCB62', '#FF8C5E', '#EB5554'],
												},
											},
											splitLine: {
												lineStyle: {
													color: '#fff',
												},
											},
										},
										series: [
											{
												name: '情感分析',
												type: 'radar',
												data: [
													{
														value: sentimentData.map((item) => item.score),
														name: '情感分數',
													},
												],
												areaStyle: {
													opacity: 0.5,
												},
											},
										],
										tooltip: {
											trigger: 'item',
										},
									}}
									customHeight='h-72 md:h-88 lg:h-96'
								/>
								<div className='flex justify-end gap-4 mt-2 -mb-4'>
									{['正面', '中性', '負面'].map((sentiment, index) => (
										<div
											className='space-x-1 text-xs font-medium text-zinc-600 dark:text-zinc-300 flex-center'
											key={index}
										>
											<div className='w-6'>{sentimentIcon(sentiment)}</div>
											<span>{sentiment}</span>
										</div>
									))}
								</div>
								{sentimentData.map((item, index) => (
									<div className='flex items-center space-y-5 gap-x-3' key={index}>
										{sentimentIcon(item.sentiment)}
										<div>
											<p className='mb-1.5 space-x-2 font-medium leading-6'>
												<span>{item.title}</span>
												<button className='w-10 text-sm rounded dark:text-zinc-800 bg-primary_yellow'>
													{item.score}
												</button>
											</p>
											<p className='text-sm font-light leading-7 text-zinc-500 dark:text-zinc-400'>
												{item.description}
											</p>
										</div>
									</div>
								))}
							</DialogContent>
						</Dialog>
					</section>
				) : (
					<Loading />
				)}
				{/* 相關新聞 */}
				{newsData && (
					<section className='p-4 space-y-2 overflow-y-auto bg-white rounded-lg shadow sm:w-1/3 sm:h-full h-80 dark:bg-zinc-900/60'>
						<h4 className='flex items-center'>相關新聞</h4>
						<ul className='flex flex-col pl-4 leading-4 list-disc gap-y-1'>
							{newsData.map((news, index) => (
								<li key={index}>
									<Link
										href={news.link}
										target='_blank'
										rel='noopener noreferrer'
										className='text-sm text-blue-500 hover:font-medium hover:underline'
									>
										{news.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
			{/* 損益表 */}
			{incomeStatement && (
				<>
					<h4 className='flex items-center mb-2 font-medium sm:-mt-6'>損益表</h4>
					{/* 營收、毛利... */}
					<section className='mb-4 space-y-4 sm:space-y-0 sm:gap-4 lg:gap-6 sm:flex'>
						<Chart
							option={{
								legend: {
									data: ['營業收入', '營業成本', '毛利率'],
									top: '2%',
								},
								xAxis: [
									{
										type: 'category',
										data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
										axisLabel: {
											interval: 3,
										},
									},
								],
								yAxis: [
									{
										type: 'value',
										name: '千元',
										alignTicks: true,
										axisLabel: {
											formatter: function (value) {
												return (value / 1000).toLocaleString()
											},
										},
									},
									{
										type: 'value',
										name: '%',
										axisLabel: {
											interval: 2,
										},
									},
								],
								series: [
									{
										name: '營業收入',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: incomeStatement.map((item) => parseInt(item.revenue)),
									},
									{
										name: '營業成本',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: incomeStatement.map((item) => parseInt(item.revenue) - parseInt(item.grossProfit)),
									},
									{
										name: '毛利率',
										type: 'line',
										yAxisIndex: 1,
										tooltip: {
											valueFormatter: function (value) {
												return value + '%'
											},
										},
										data: incomeStatement.map((item) => item.grossMargin),
									},
								],
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999',
										},
									},
								},
								grid: {
									top: '16%',
									left: '12%',
									right: '8%',
									height: '70%',
								},
								toolbox: {
									feature: {
										saveAsImage: { show: true },
									},
									top: '1.5%',
									right: '0.5%',
								},
							}}
							customHeight='h-64 sm:h-56 bg-white border-none md:h-60 lg:h-80 rounded-lg'
						/>
						<Chart
							option={{
								legend: {
									data: ['毛利', '營業費用', '淨利率'],
									top: '2%',
								},
								xAxis: [
									{
										type: 'category',
										data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
										axisLabel: {
											interval: 3,
										},
									},
								],
								yAxis: [
									{
										type: 'value',
										name: '千元',
										alignTicks: true,
										axisLabel: {
											formatter: function (value) {
												return (value / 1000).toLocaleString()
											},
										},
									},
									{
										type: 'value',
										name: '%',
										axisLabel: {
											interval: 2,
										},
									},
								],
								series: [
									{
										name: '毛利',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: incomeStatement.map((item) => parseInt(item.grossProfit)),
									},
									{
										name: '營業費用',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: incomeStatement.map((item) => parseInt(item.operatingExpenses)),
									},
									{
										name: '淨利率',
										type: 'line',
										yAxisIndex: 1,
										tooltip: {
											valueFormatter: function (value) {
												return value + '%'
											},
										},
										data: incomeStatement.map((item) => item.netIncomeMargin),
									},
								],
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999',
										},
									},
								},
								grid: {
									top: '16%',
									left: '12%',
									right: '8%',
									height: '70%',
								},
								toolbox: {
									feature: {
										saveAsImage: { show: true },
									},
									top: '1.5%',
									right: '0.5%',
								},
							}}
							customHeight='h-64 sm:h-56 bg-white border-none md:h-60 lg:h-80 rounded-lg'
						/>
					</section>
					<div className='flex-col w-full gap-2 xl:gap-0 flex-center-between xl:flex-row'>
						{/* 毛利率、淨利率... */}
						{incomeStatement[incomeStatement.length - 1] && (
							<section className='flex self-start justify-between gap-1.5 w-full overflow-x-auto xl:flex-col'>
								{['毛利率', '營業費用率', '稅前淨利率', '稅後淨利率'].map((margin) => (
									<div
										className='px-4 pb-1 space-y-2 bg-white rounded-lg shadow min-w-[240px] xl:w-[16.4rem] flex-center-between dark:bg-zinc-900/60'
										key={margin}
									>
										<p className='mr-3 font-light opacity-80'>{margin}</p>
										<Chart
											option={{
												series: [
													{
														type: 'gauge',
														center: ['50%', '85%'],
														radius: '150%',
														startAngle: 180,
														endAngle: 0,
														min: 0,
														max: 100,
														itemStyle: {
															color: '#40B4FF',
														},
														pointer: {
															show: false,
														},
														axisLine: {
															lineStyle: {
																width: 20,
															},
														},
														progress: {
															show: true,
															width: 20,
															color: '#FFB800',
														},
														axisLabel: {
															show: false,
														},
														axisTick: {
															show: false,
														},
														splitLine: {
															show: false,
														},
														detail: {
															fontSize: 16,
															fontWeight: 300,
															offsetCenter: [0, '-15%'],
															formatter: function (value) {
																return value + '%'
															},
														},
														data: [
															{
																value:
																	margin === '毛利率'
																		? incomeStatement[incomeStatement.length - 1].grossMargin
																		: margin === '營業費用率'
																		? incomeStatement[incomeStatement.length - 1].operatingExpenseRatio
																		: margin === '稅前淨利率'
																		? incomeStatement[incomeStatement.length - 1].profitBeforeTaxMargin
																		: incomeStatement[incomeStatement.length - 1].netIncomeMargin,
															},
														],
													},
												],
											}}
											customHeight='h-20 w-32 border-none shadow-none'
										/>
									</div>
								))}
							</section>
						)}
						{/* EPS */}
						<section className='w-full p-4 space-y-2 bg-white rounded-lg shadow xl:min-w-[75%] dark:bg-zinc-900/60'>
							<h4 className='flex items-center font-medium'>每股盈餘 (EPS)</h4>
							<Chart
								option={{
									legend: {
										data: ['EPS', 'EPS季增率', 'EPS年增率'],
										bottom: '0',
									},
									xAxis: [
										{
											type: 'category',
											data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
										},
									],
									yAxis: [
										{
											type: 'value',
											name: '元',
											alignTicks: true,
										},
										{
											type: 'value',
											name: '%',
											axisLabel: {
												interval: 2,
											},
										},
									],
									series: [
										{
											name: 'EPS',
											type: 'bar',
											tooltip: {
												valueFormatter: function (value) {
													return value.toLocaleString() + ' 元'
												},
											},
											data: incomeStatement.map((item) => parseFloat(item.eps)),
										},
										{
											name: 'EPS季增率',
											type: 'line',
											yAxisIndex: 1,
											tooltip: {
												valueFormatter: function (value) {
													return value + '%'
												},
											},
											data: incomeStatement.map((item) => item.epsQOQ),
										},
										{
											name: 'EPS年增率',
											type: 'line',
											yAxisIndex: 1,
											tooltip: {
												valueFormatter: function (value) {
													return value + '%'
												},
											},
											data: incomeStatement.map((item) => item.epsYOY),
										},
									],
									tooltip: {
										trigger: 'axis',
										axisPointer: {
											type: 'cross',
											crossStyle: {
												color: '#999',
											},
										},
									},
									grid: {
										top: '10%',
										left: '4%',
										right: '6%',
										height: '70%',
									},
									toolbox: {
										feature: {
											saveAsImage: { show: true },
										},
										top: '1.5%',
										right: '0.5%',
									},
								}}
								customHeight='h-64 sm:h-56 border-none shadow-none md:h-60 lg:h-80'
							/>
						</section>
					</div>
				</>
			)}
			{/* 杜邦分析：ROE、ROA */}
			{incomeStatement && assetStatement && liabilityEquityStatement && (
				<section className='w-full p-4 space-y-2 bg-white rounded-lg shadow dark:bg-zinc-900/60'>
					<div className='flex-center-between'>
						<h4 className='flex items-center font-medium'>
							{selectedChart === 0
								? 'ROA / ROE'
								: selectedChart === 1
								? '杜邦分析'
								: selectedChart === 2
								? '每股淨值'
								: ''}
						</h4>
						<section className='mb-2 space-x-1 text-sm'>
							<button
								className={`px-4 py-1 dark:border-zinc-500 border rounded-full ${
									selectedChart === 0
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(0)}
							>
								ROA / ROE
							</button>
							<button
								className={`px-4 py-1 dark:border-zinc-500 border rounded-full ${
									selectedChart === 1
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(1)}
							>
								杜邦分析
							</button>
							<button
								className={`px-4 py-1 dark:border-zinc-500 border rounded-full ${
									selectedChart === 2
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(2)}
							>
								每股淨值
							</button>
						</section>
					</div>
					{selectedChart === 0 ? (
						<Chart
							option={{
								legend: {
									data: ['總資產', '股東權益', '稅後淨利', 'ROE', 'ROA'],
									bottom: '0',
								},
								xAxis: [
									{
										type: 'category',
										data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
									},
								],
								yAxis: [
									{
										type: 'value',
										name: '千元',
										alignTicks: true,
										axisLabel: {
											formatter: function (value) {
												return (value / 1000).toLocaleString()
											},
										},
									},
									{
										type: 'value',
										name: '%',
										axisLabel: {
											interval: 2,
										},
									},
								],
								series: [
									{
										name: '總資產',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: assetStatement.map((item) => parseInt(item.assets)),
									},
									{
										name: '股東權益',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: liabilityEquityStatement.map((item) => parseInt(item.equity)),
									},
									{
										name: '稅後淨利',
										type: 'bar',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + ' 元'
											},
										},
										data: incomeStatement.map((item) => parseInt(item.netIncome)),
									},
									{
										name: 'ROE',
										type: 'line',
										yAxisIndex: 1,
										tooltip: {
											valueFormatter: function (value) {
												return value + '%'
											},
										},
										data: liabilityEquityStatement.map((item) => parseFloat(item.roe)),
									},
									{
										name: 'ROA',
										type: 'line',
										yAxisIndex: 1,
										tooltip: {
											valueFormatter: function (value) {
												return value + '%'
											},
										},
										data: assetStatement.map((item) => parseFloat(item.roa)),
									},
								],
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999',
										},
									},
								},
								grid: {
									top: '14%',
									left: '8%',
									right: '4%',
									height: '68%',
								},
								toolbox: {
									feature: {
										saveAsImage: { show: true },
									},
									top: '1.5%',
									right: '0.5%',
								},
							}}
							customHeight='h-64 border-none shadow-none md:h-80 lg:h-88'
						/>
					) : selectedChart === 1 ? (
						<Chart
							option={{
								legend: {
									data: ['稅後淨利率', '總資產週轉率', '權益乘數', 'ROE'],
									bottom: '0',
								},
								xAxis: [
									{
										type: 'category',
										data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
									},
								],
								yAxis: [
									{
										type: 'value',
										name: '%',
										axisLabel: {
											interval: 2,
										},
									},
									{
										type: 'value',
									},
								],
								series: [
									{
										name: '稅後淨利率',
										type: 'line',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + '%'
											},
										},
										data: incomeStatement.map((item) => parseFloat(item.netIncomeMargin)),
									},
									{
										name: '總資產週轉率',
										type: 'line',
										tooltip: {
											valueFormatter: function (value) {
												return value.toLocaleString() + '%'
											},
										},
										data: assetStatement.map((item) => parseFloat(item.assetsTurnoverRatio)),
									},
									{
										name: 'ROE',
										type: 'line',
										yAxisIndex: 1,
										tooltip: {
											valueFormatter: function (value) {
												return value + '%'
											},
										},
										data: liabilityEquityStatement.map((item) => parseFloat(item.roe)),
									},
									{
										name: '權益乘數',
										type: 'line',
										yAxisIndex: 1,
										data: assetStatement.map((item, index) =>
											(Math.round((item.assets / liabilityEquityStatement[index].equity) * 100) / 100).toFixed(2)
										),
									},
								],
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999',
										},
									},
								},
								grid: {
									top: '14%',
									left: '5%',
									right: '5%',
									height: '68%',
								},
								toolbox: {
									feature: {
										magicType: { show: true, type: ['line', 'bar'] },
										restore: { show: true },
										saveAsImage: { show: true },
									},
									top: '1.5%',
									right: '0.5%',
								},
							}}
							customHeight='h-64 border-none shadow-none md:h-80 lg:h-88'
						/>
					) : selectedChart === 2 ? (
						<Chart
							option={{
								xAxis: [
									{
										type: 'category',
										data: incomeStatement.map((item) => item.year + ' Q' + item.quarter),
									},
								],
								yAxis: [
									{
										type: 'value',
										name: '元',
									},
								],
								series: {
									name: '每股淨值',
									type: 'line',
									tooltip: {
										valueFormatter: function (value) {
											return value.toLocaleString() + '元'
										},
									},
									data: liabilityEquityStatement.map((item) => parseFloat(item.nav)),
								},
								tooltip: {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',
										crossStyle: {
											color: '#999',
										},
									},
								},
								grid: {
									top: '14%',
									left: '4%',
									right: '3%',
									height: '72%',
								},
								toolbox: {
									feature: {
										magicType: { show: true, type: ['line', 'bar'] },
										restore: { show: true },
										saveAsImage: { show: true },
									},
									top: '1.5%',
									right: '0.5%',
								},
							}}
							customHeight='h-64 border-none shadow-none md:h-80 lg:h-88'
						/>
					) : (
						''
					)}
				</section>
			)}
			{/* 資產負債 */}
			{assetStatement && liabilityEquityStatement && incomeStatement && cashFlowStatement && (
				<div className='space-y-4'>
					{assetStatement[assetStatement.length - 1] && (
						<div className='px-4 py-3 bg-white rounded-lg shadow sm:w-72 dark:bg-zinc-900/60'>
							<h5 className='px-1.5 mb-1 dark:text-zinc-800 py-0.5 flex-center-between bg-amber-200'>
								<span>總資產</span>
								<span className='text-base font-semibold'>
									{parseInt(assetStatement[assetStatement.length - 1].assets).toLocaleString()}
								</span>
							</h5>
							<p className='font-light opacity-80'>流動資產</p>
							<div className='pl-2 border-l-4 flex-center-between border-primary_yellow'>
								<div className='space-y-1'>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(assetStatement[assetStatement.length - 1].cashAndCashEquivalents).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>現金及約當現金</span>
									</p>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(assetStatement[assetStatement.length - 1].shortTermInvestment).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>短期投資</span>
									</p>
								</div>
								<div className='space-y-1'>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(assetStatement[assetStatement.length - 1].accountsAndNotesReceivable).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>應收帳款及票據</span>
									</p>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(assetStatement[assetStatement.length - 1].inventories).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>存貨</span>
									</p>
								</div>
							</div>
						</div>
					)}
					{liabilityEquityStatement[liabilityEquityStatement.length - 1] && (
						<div className='px-4 py-3 bg-white rounded-lg shadow sm:w-72 dark:bg-zinc-900/60'>
							<h5 className='px-1.5 mb-1 dark:text-zinc-800 py-0.5 flex-center-between bg-red-300'>
								<span>總負債</span>
								<span className='text-base font-semibold'>
									{parseInt(liabilityEquityStatement[liabilityEquityStatement.length - 1].liabilities).toLocaleString()}
								</span>
							</h5>
							<p className='font-light opacity-80'>流動負債</p>
							<div className='flex justify-between pl-2 border-l-4 border-red-400'>
								<div className='space-y-1'>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(
												liabilityEquityStatement[liabilityEquityStatement.length - 1].shortTermBorrowings
											).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>短期借款</span>
									</p>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{(
												parseInt(
													liabilityEquityStatement[liabilityEquityStatement.length - 1].accountsAndNotesPayable
												) + parseInt(liabilityEquityStatement[liabilityEquityStatement.length - 1].shortTermBorrowings)
											).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>應付帳款及票據</span>
									</p>
								</div>
								<div className='space-y-1'>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(
												liabilityEquityStatement[liabilityEquityStatement.length - 1].advanceReceipts
											).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>預收款項</span>
									</p>
									<p className='flex flex-col text-sm leading-4'>
										<span className='font-medium'>
											{parseInt(
												liabilityEquityStatement[liabilityEquityStatement.length - 1].longTermLiabilitiesCurrentPortion
											).toLocaleString()}
										</span>
										<span className='text-xs font-light opacity-60'>一年內到期長期負債</span>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
			{/* 歷年財務報表 */}
			{eReport && (
				<section className='p-4 space-y-2 bg-white rounded-lg shadow dark:bg-zinc-900/60'>
					<h5 className='flex items-center font-medium'>歷年財務報表</h5>
					<div className='flex flex-wrap gap-x-4 gap-y-2'>
						{eReport.map((report, index) => (
							<Link
								href={report.link}
								target='_blank'
								rel='noopener noreferrer'
								className='text-sm text-blue-500 hover:font-medium hover:underline'
								key={index}
							>
								{report.year} 年第 {report.season} 季財務報表
							</Link>
						))}
					</div>
				</section>
			)}
			{/* 聊天按鈕（🚩先不要開始製作） */}
			<div className='fixed bottom-4 right-4'>
				<button className='text-white rounded-full shadow-lg bg-amber-300 hover:bg-amber-400 w-14 h-14'>
					<QuestionAnswerIcon />
				</button>
			</div>
		</div>
	)
}
