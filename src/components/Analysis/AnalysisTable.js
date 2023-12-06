import { useState, useEffect } from 'react'


export default function AnalysisTable() {
    const [sentimentData, setSentimentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchSentimentData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.DB_URL}/api/stock/sentiment_analysis/${stockId}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();

            if (data.success) {
                setSentimentData(data.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        fetchSentimentData();
    }, []);

    const Sentiment_icon = (sentiment) => {
        if (sentiment === '正面') {
            return <img width="50" height="50" src="https://img.icons8.com/ios/50/happy--v1.png" alt="happy--v1" />;
        } else if (sentiment === '中性') {
            return <img width="50" height="50" src="https://img.icons8.com/ios/50/neutral-emoticon--v1.png" alt="neutral-emoticon--v1" />;
        } else if (sentiment === '負面') {
            return <img width="50" height="50" src="https://img.icons8.com/ios/50/crying--v1.png" alt="crying--v1" />;
        }
    };

    return (
        <div>
            <span className='px-2 text-xl bg-primary_yellow border-2 rounded-lg dark:bg-zinc-800'>
                台積電 2330
            </span>
            <div className='flex justify-between'>
                <div className='flex flex-row gap-5'>
                    <button className='mt-5  bg-white rounded-t mb:border-none lg:rounded h-20 lg:h-full xl:w-36 dark:bg-zinc-900/80 border-solid border-2 border-white-500'>
                        <span className='text-sm  xs:text-base text-center dark:bg-zinc-800'>成交量</span>
                    </button>
                    <button className='mt-5  bg-white rounded-t mb:border-none lg:rounded h-20 lg:h-full xl:w-36 dark:bg-zinc-900/80 border-solid border-2 border-white-500'>
                        <span className='text-sm  xs:text-base text-center dark:bg-zinc-800'>本益比</span>
                    </button>
                    <button className='mt-5  bg-white rounded-t mb:border-none lg:rounded h-20 lg:h-full xl:w-36 dark:bg-zinc-900/80 border-solid border-2 border-white-500'>
                        <span className='text-sm  xs:text-base text-center dark:bg-zinc-800'>本淨比</span>
                    </button>
                </div>
                <div className='flex flex-col'>
                    <h4 className='flex items-center text-2xl'>情緒分析結果</h4>
                    <div>
                        {(
                            sentimentData.map((item) => (
                                <div key={item.title}>
                                    <p>{item.score}</p>{Sentiment_icon(item.sentiment)}
                                    <p className='font-bold'>{item.title}</p> 
                                    <p>{item.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}