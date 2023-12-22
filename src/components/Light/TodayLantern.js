import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Image from 'next/image'

import SubmitBtn from '@/components/ui/SubmitBtn'
import stock100 from '@/data/stock100.json'

export default function TodayLantern({ industry, resultStock, open, handleDialog }) {
	return (
		<Dialog open={open} maxWidth='md' fullWidth>
			<DialogTitle className='pt-5 pb-8 space-x-2 text-2xl text-center dark:text-white flex-center dark:bg-zinc-900'>
				<span>本日光明燈</span>
				<span className='px-2 text-base bg-white border-2 rounded-full border-secondary_blue text-secondary_blue dark:bg-zinc-800'>
					{industry}
				</span>
			</DialogTitle>
			<DialogContent className='flex-col text-center flex-center-between dark:text-zinc-100 dark:bg-zinc-900'>
				<div className='grid grid-cols-2 gap-6 mb-10 sm:flex sm:gap-8 '>
					{resultStock &&
						resultStock.map((stock, index) => (
							<div className='space-y-2' key={index}>
								<Image src='/assets/light/lantern.png' width={120} height={120} alt='lantern' />
								<h4 className='font-semibold tracking-widest dark:text-white'>
									{stock100.find((stock100) => stock100.stock_id === stock)?.name}
								</h4>
							</div>
						))}
				</div>
				<SubmitBtn text='查看分析結果' handleSubmit={handleDialog} style='py-2.5' />
			</DialogContent>
		</Dialog>
	)
}
