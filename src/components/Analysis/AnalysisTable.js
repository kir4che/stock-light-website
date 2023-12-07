import { useEffect, useState } from 'react'

export default function AnalysisTable() {
	const [sentimentData, setSentimentData] = useState([])

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

	const Sentiment_icon = (sentiment) => {
		if (sentiment === '正面') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
					alt='external-sunny-weather-justicon-flat-justicon'
				/>
			)
		} else if (sentiment === '中性') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
					alt='external-cloudy-weather-kmg-design-flat-kmg-design-1'
				/>
			)
		} else if (sentiment === '負面') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
					alt='external-rainy-weather-justicon-flat-justicon-1'
				/>
			)
		}
	}

	useEffect(() => {
		fetchSentimentData()
	}, [])

	return (
		<div>
			<div className='flex justify-between'>
				<section className='flex flex-col'>
					<h4 className='flex items-center text-2xl'>情緒分析結果</h4>
					<div>
						{sentimentData.map((item) => (
							<div key={item.title}>
								<p>{item.score}</p>
								{Sentiment_icon(item.sentiment)}
								<p className='font-bold'>{item.title}</p>
								<p>{item.description}</p>
							</div>
						))}
						<div className='flex items-center gap-3'>
							<img
								width='48'
								height='48'
								src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
								alt='external-sunny-weather-justicon-flat-justicon'
							/>
							<span className='text-base font-bold'>正面</span>
							<img
								width='48'
								height='48'
								src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
								alt='external-cloudy-weather-kmg-design-flat-kmg-design-1'
							/>
							<span className='text-base font-bold'>中性</span>
							<img
								width='48'
								height='48'
								src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
								alt='external-rainy-weather-justicon-flat-justicon-1'
							/>
							<span className='text-base font-bold'>負面</span>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
