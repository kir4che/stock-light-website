import Image from 'next/image'
import Link from 'next/link'
import { EnvelopeFill, GeoAltFill, TelephoneFill } from 'react-bootstrap-icons'
import { navigationLinks } from '../../data/navigationLinks'

export default function Footer() {
	const contactInfo = [
		{
			icon: <GeoAltFill size={20} />,
			text: '106台北市大安區忠孝東路三段1號',
			link: 'https://goo.gl/maps/Un5dRkG2Gi2TDgeV7',
		},
		{
			icon: <EnvelopeFill size={20} />,
			text: 'xxx@gmail.com',
		},
		{
			icon: <TelephoneFill size={20} />,
			text: '0912-345-678',
		},
	]

	return (
		<footer>
			<div className='flex flex-col items-center py-4 mx-auto border-t sm:py-8 sm:items-start sm:flex-row'>
				<div className='mx-auto text-center md:text-center'>
					<Image src='https://fakeimg.pl/180x92/' width={180} height={92} alt='股市光明燈' />
					<h4 className='my-2 font-bold'>股市光明燈</h4>
					<p className='text-sm'>帶給所有投資人新的希望</p>
				</div>
				<div className='flex flex-col flex-wrap justify-center flex-grow mt-4 space-y-4 text-center sm:flex-row sm:justify-end sm:space-x-20 sm:space-y-0 sm:my-0 sm:text-left'>
					<nav className='flex justify-center space-x-4 sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4'>
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
