'use client'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Tab, Tabs } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useState } from 'react'

import TabContent from '@/components/Analysis/TabContent'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import stock150 from '@/data/stock150.json'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { convertDateTime } from '@/utils/convertDateTime'
import fetchStockData from '@/utils/fetchStockData'
import fetchStockPePb from '@/utils/fetchStockPePb'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function FundamentalAnalysis() {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedStockId, setSelectedStockId] = useState(1101)
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const [stockPePb, setStockPePb] = useState(null)
	const [stockData, setStockData] = useState({
		date: [],
		price: [],
		closePrice: [],
		highPrice: [],
		lowPrice: [],
		change: [],
		volume: [],
	})

	useEffect(() => {
		const fetchData = async (stockId) => {
			setStockPePb(await fetchStockPePb({ stockId, setIsLoading }))
			setStockData(await fetchStockData({ stockId, setIsLoading }))
		}

		fetchData(selectedStockId)
	}, [selectedStockId])

	return (
		<StarryBackground className='pt-8 pb-12 md:pt-10'>
			<div className='px-4 py-5 bg-white md:px-8 dark:bg-zinc-900/50 md:rounded'>
				<div className='flex flex-col-reverse xs:flex-row xs:justify-between'>
					<div className='flex items-baseline mt-4 mb-2 space-x-4 xs:mt-0'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{stock150.find((stock) => stock.id === selectedStockId)?.name || null}</span>
							<span className='text-xl font-light tracking-widest'>{selectedStockId}</span>
						</h3>
						<p className='text-xs font-medium tracking-wide opacity-70'>
							{stockData ? convertDateTime(stockData.date[stockData.date.length - 1]) : getCurrentDate()} 更新
						</p>
					</div>
					<Autocomplete
						options={stock150.map((stock) => `${stock.id} ${stock.name}`)}
						defaultValue={`${stock150[0].id} ${stock150[0].name}`}
						sx={{ width: 150, bgcolor: 'background.paper', borderRadius: '0.25rem' }}
						size='small'
						renderInput={(params) => <TextField {...params} />}
						onChange={(e, newValue) => setSelectedStockId(parseInt(newValue))}
						disableClearable
						disablePortal
					/>
				</div>
				{stockData ? (
					<section className='flex items-baseline mb-4 space-x-1 tracking-wide'>
						<p
							className={`text-4xl font-bold ${
								stockData.change[stockData.change.length - 1] > 0
									? 'text-stock_red'
									: stockData.change[stockData.change.length - 1] < 0
									? 'text-stock_green'
									: ''
							} `}
						>
							{stockData.closePrice[stockData.closePrice.length - 1]?.toFixed(2)}
						</p>
						<div
							className={`flex items-baseline text-xl font-medium space-x-1 ${
								stockData.change[stockData.change.length - 1] > 0
									? 'text-stock_red'
									: stockData.change[stockData.change.length - 1] < 0
									? 'text-stock_green'
									: ''
							}`}
						>
							<p>
								<span>
									{stockData.change[stockData.change.length - 1] - stockData.change[stockData.change.length - 2] > 0 ? (
										<ArrowDropUpIcon />
									) : stockData.change[stockData.change.length - 1] - stockData.change[stockData.change.length - 2] <
									  0 ? (
										<ArrowDropDownIcon />
									) : (
										''
									)}
								</span>
								<span>{Math.abs(stockData.change[stockData.change.length - 1]).toFixed(2)}</span>
							</p>
							<p>
								(
								{calculatePriceChange(
									stockData.closePrice[stockData.closePrice.length - 2],
									stockData.closePrice[stockData.closePrice.length - 1]
								).toFixed(2)}
								%)
							</p>
						</div>
					</section>
				) : null}
				<Tabs
					variant='scrollable'
					value={selectedTabIndex}
					onChange={useCallback((e, index) => setSelectedTabIndex(index), [])}
					className='mt-4 mb-2 bg-white rounded dark:bg-zinc-900/80'
				>
					{['股價走勢', '技術指標', '財務報表', '基本資料', '新聞'].map((label, index) => (
						<Tab
							label={label}
							className={`${
								selectedTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
							} hover:bg-sky-300/10 `}
							key={index}
						/>
					))}
				</Tabs>
				{!isLoading && stockData ? (
					<TabContent
						stockId={selectedStockId}
						tabIndex={selectedTabIndex}
						stockData={stockData}
						stockPePb={stockPePb}
					/>
				) : (
					<Loading />
				)}
				<p className='mt-8 text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
		</StarryBackground>
	)
}
