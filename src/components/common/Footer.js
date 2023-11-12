import { navigationLinks } from '@/data/navigationLinks'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import Image from 'next/image'
import Link from 'next/link'

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
		<footer>
			<div className='z-50 flex-col py-4 mx-auto bg-white border-t sm:pb-2 sm:pt-6 dark:bg-zinc-800 flex-center dark:border-none sm:items-start sm:flex-row'>
				<div className='lg:w-1/2 xl:w-1/3'>
					<h4 className='flex items-center justify-center sm:justify-start mb-2 sm:mb-4 space-x-1.5'>
						<Image src='/assets/logo.png' width={32} height={32} alt='temple' className='w-auto h-auto' />
						<span>股市光明燈</span>
					</h4>
					<p className='text-sm font-light text-center sm:mb-20 sm:text-left'>帶給所有投資人新的希望</p>
					<p className='hidden text-sm font-thin opacity-50 md:inline'>
						Copyright © 北科大資財四乙 2023 All Rights Reserved.
					</p>
				</div>
				{/* 蠟燭動畫 */}
				<div className='mt-8 mb-4 scale-75 sm:my-0 lg:w-1/2 xl:w-1/3 candle_wrapper flex-center'>
					<div className='candle_spark' />
					<div className='candle_sparkling' />
					<div className='candle' />
					<div className='candle_wax' />
					<div className='candle_wax-bot' />
				</div>
				<div className='flex-col flex-wrap flex-grow w-full mt-4 space-y-4 xl:w-1/3 flex-center sm:flex-row sm:justify-end sm:space-x-20 sm:space-y-0 sm:my-0 sm:text-left'>
					<nav className='space-x-4 flex-center sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4'>
						{navigationLinks.map((link, index) => (
							<Link className='text-sm' href={link.url} key={index}>
								{link.name}
							</Link>
						))}
					</nav>
					<div className='hidden space-y-5 sm:block'>
						<h4 className='mb-2'>聯絡方式</h4>
						{contactInfo.map((info, index) => (
							<div className='flex items-center space-x-2 text-sm' key={index}>
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
					</div>
				</div>
			</div>
		</footer>
	)
}
