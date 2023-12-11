import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import Image from 'next/image'
import Link from 'next/link'

import pageList from '@/data/pageList.json'

export default function Footer() {
	const contactInfo = [
		{
			icon: <PlaceIcon />,
			text: '106台北市大安區忠孝東路三段1號',
			link: 'https://goo.gl/maps/Un5dRkG2Gi2TDgeV7',
		},
		{
			icon: <EmailIcon />,
			text: 'xxx@gmail.com',
		},
		{
			icon: <PhoneIcon />,
			text: '0912-345-678',
		},
	]

	return (
		<footer className='mt-10 bg-white border-t dark:bg-zinc-800 dark:border-zinc-600'>
			<div className='grid grid-cols-1 pt-4 lg:grid-cols-2'>
				<div className='max-w-sm mx-auto lg:mx-0 lg:max-w-none'>
					<h4 className='flex-center sm:justify-start mb-2 sm:mb-4 space-x-1.5'>
						<Image src='/assets/logo.png' width={32} height={32} alt='temple' />
						<span>股市光明燈</span>
					</h4>
					<p className='text-sm font-light text-center sm:mb-20 sm:text-left'>帶給所有投資人新的希望</p>
				</div>
				<div className='text-center lg:gap-8 lg:flex lg:text-left'>
					<div className='-mt-2 scale-50 md:-mt-10 lg:mt-0 candle_wrapper'>
						<div className='candle_spark' />
						<div className='candle_sparkling' />
						<div className='candle' />
						<div className='candle_wax' />
						<div className='candle_wax-bot' />
					</div>
					<div className='lg:ml-8 lg:w-96'>
						<p className='hidden font-medium lg:block'>頁尾導航</p>
						<ul className='space-x-4 lg:space-x-0 lg:mt-4 lg:grid lg:grid-cols-2 lg:gap-y-4'>
							{pageList.map((link, index) => (
								<Link className='text-sm font-thin hover:underline' href={link.url} key={index}>
									{link.name}
								</Link>
							))}
						</ul>
					</div>
					<div className='w-full'>
						<p className='hidden font-medium lg:block'>聯絡方式</p>
						<ul className='flex-wrap gap-4 mt-4 lg:gap-0 lg:space-y-3 flex-center lg:block'>
							{contactInfo.map((info, index) => (
								<div className='flex items-center font-thin space-x-1.5 text-sm' key={index}>
									{info.icon}
									{info.link ? (
										<Link target='_blank' href={info.link}>
											{info.text}
										</Link>
									) : (
										<p>{info.text}</p>
									)}
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
			{/* 版權聲明 */}
			<div className='py-3 mt-8 border-t border-gray-100 dark:border-zinc-600'>
				<p className='text-center text-gray-500 dark:text-zinc-400 text-xs/relaxed'>
					Copyright © 北科大資財四乙 2023 All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}
