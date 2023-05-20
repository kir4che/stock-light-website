import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='bg-white'>
			<div className='container flex flex-col flex-wrap pt-12 pb-10 mx-auto border-t-[1.5px] sm:items-center lg:items-start sm:flex-row sm:flex-nowrap'>
				<div className='w-48 mx-auto text-center'>
					<img className='w-full' src='https://fakeimg.pl/200x100/' alt='股市光明燈' />
					<h4 className='mt-2.5 mb-1.5 font-bold'>股市光明燈</h4>
					<p className='text-sm'>帶給所有投資人新的希望</p>
				</div>
				<div className='flex flex-col flex-wrap justify-center flex-grow mt-4 space-y-4 text-center sm:flex-row sm:justify-end sm:space-x-20 sm:space-y-0 sm:my-0 sm:text-left'>
					<nav className='flex justify-center space-x-3 list-none sm:flex-col sm:justify-start sm:space-y-2 sm:space-x-0'>
						<Link href='/analysis'>股市預測</Link>
						<Link href='/about'>關於我們</Link>
					</nav>
					<nav className='space-y-2.5 list-none hidden sm:block'>
						<h4 className='mb-2 font-medium'>聯絡方式</h4>
						<li className='text-sm'>106台北市大安區忠孝東路三段1號</li>
						<li className='text-sm'>xxx@gmail.com</li>
						<li className='text-sm'>0912-345-678</li>
					</nav>
				</div>
			</div>
		</footer>
	)
}
