import Link from 'next/link'

export default function Footer() {
	const pages = [
		{
			name: '最新消息',
			url: 'news',
		},
		{
			name: '股市預測',
			url: 'analysis',
		},
		{
			name: '關於我們',
			url: 'about',
		},
		{
			name: '意見回饋',
			url: 'feedback',
		},
		{
			name: '版本資訊',
			url: 'version',
		},
	]

	return (
		<footer className='bg-white dark:bg-zinc-900'>
			<div className='flex flex-col items-center py-10 mx-auto sm:items-start sm:flex-row'>
				<div className='mx-auto text-center md:text-center'>
					<img className='w-full mb-3' src='https://fakeimg.pl/180x92/' alt='股市光明燈' />
					<h4 className='mb-2 font-bold'>股市光明燈</h4>
					<p className='text-sm'>帶給所有投資人新的希望</p>
				</div>
				<div className='flex flex-col flex-wrap justify-center flex-grow mt-4 space-y-4 text-center sm:flex-row sm:justify-end sm:space-x-20 sm:space-y-0 sm:my-0 sm:text-left'>
					<nav className='flex justify-center space-x-4 sm:flex-col sm:justify-start sm:space-x-0 sm:space-y-4'>
						{pages.map((page) => (
							<Link className='text-sm' href={page.url} key={page.url}>
								{page.name}
							</Link>
						))}
					</nav>
					<nav className='hidden space-y-5 sm:block'>
						<h4 className='mb-2 text-xl font-bold'>聯絡方式</h4>
						<div className='flex items-center mb-1 space-x-2'>
							<img src='https://img.icons8.com/ios/20/address--v1.png' alt='address' />
							<a
								target='_blank'
								href='https://www.google.com/maps/place/106%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%BF%A0%E5%AD%9D%E6%9D%B1%E8%B7%AF%E4%B8%89%E6%AE%B51%E8%99%9F/@25.0424604,121.5330755,17z/data=!3m1!4b1!4m6!3m5!1s0x3442a97d14c16483:0x8bd463ae49b2e63d!8m2!3d25.0424604!4d121.5356504!16s%2Fg%2F11csf7fb9c?authuser=0'
							>
								106台北市大安區忠孝東路三段1號
							</a>
						</div>
						<div className='flex items-center mb-12 space-x-2.5'>
							<img src='https://img.icons8.com/ios/20/new-post--v1.png' alt='email' />
							<p>xxx@gmail.com</p>
						</div>
						<div className='flex items-center mb-12 space-x-2.5'>
							<img src='https://img.icons8.com/ios/20/phone--v1.png' alt='phone' />
							<p>0912-345-678</p>
						</div>
					</nav>
				</div>
			</div>
			<div className='flex flex-col items-center py-5 mx-auto '>
				<p className='text-sm font-thin'>copyright © 北科大資財四乙 2023 All Rights Reserved.</p>
			</div>
		</footer>
	)
}
