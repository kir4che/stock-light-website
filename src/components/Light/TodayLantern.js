import { Dialog, DialogContent, DialogTitle } from '@mui/material'

import SubmitBtn from '@/components/ui/SubmitBtn'

export default function TodayLantern({ industry, open, handleDialog }) {
	return (
		<Dialog open={open} maxWidth='sm' fullWidth>
			<DialogTitle className='mt-4 mb-8 space-x-2 text-2xl text-center flex-center'>
				<span>本日光明燈</span>
				<span className='px-2 text-base bg-white border-2 rounded-full border-secondary_blue text-secondary_blue dark:bg-zinc-800'>
					{industry}
				</span>
			</DialogTitle>
			<DialogContent className='flex-col overflow-x-scroll text-center flex-center-between h-80 dark:text-zinc-100'>
				<div className='text-black flex-center'>
					{['台積電'].map((stock, index) => (
						<div>
							<div className='mb-5 lantern lanterntag_container animate-none' key={index}>
								<div className='laternlight' />
								<div className='rounded-t-lg left rounded-b-md' />
								<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }} />
								<div className='lantern-flame' />
								<div className='absolute inset-x-0 top-10 right-6' />
							</div>
							<h3 className='font-semibold tracking-widest'>{stock}</h3>
						</div>
					))}
				</div>
				<SubmitBtn text='查看分析結果' handleSubmit={handleDialog} style='py-2.5 mb-2' />
			</DialogContent>
		</Dialog>
	)
}
