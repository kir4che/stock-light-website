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
			<div className='z-50 flex-col py-4 mx-auto bg-white border-t dark:bg-zinc-800 flex-center dark:border-none sm:py-8 sm:items-start sm:flex-row'>
				<div className='text-center'>
					<Image src='/assets/temple.png' width={160} height={100} alt='temple' />
					<h4 className='mt-2 mb-1 font-bold'>股市光明燈</h4>
					<p className='text-sm font-light'>帶給所有投資人新的希望</p>
				</div>
				<div className='flex-col flex-wrap flex-grow mt-4 space-y-4 text-center flex-center sm:flex-row sm:justify-end sm:space-x-20 sm:space-y-0 sm:my-0 sm:text-left'>
					<nav className='space-x-4 flex-center sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4'>
						{navigationLinks.map((link, index) => (
							<Link className='text-sm' href={link.url} key={index}>
								{link.name}
							</Link>
						))}
					</nav>
					<nav className='hidden space-y-5 sm:block'>
						<h4 className='mb-2 text-xl font-bold'>聯絡方式</h4>
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
					</nav>
				</div>
			</div>
			<div className='flex flex-col items-center py-5 mx-auto '>
				<p className='text-sm font-thin'>Copyright © 北科大資財四乙 2023 All Rights Reserved.</p>
			</div>
		</footer>
	)
}
