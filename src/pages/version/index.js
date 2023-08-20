import Image from 'next/image'

export default function Version() {
	return (
		<div className='max-w-screen-sm px-8 py-20 mx-auto lg:px-0'>
			<h2 className='mb-5 font-bold text-center pb-2.5 border-b-[3px] border-b-primary_yellow'>版本更新資訊</h2>
			<ul className='space-y-3'>
				<li>
					<h5 className='font-bold text-center '>Version 0.2</h5>
					<Image src='https://fakeimg.pl/640x320/' width={640} height={320} alt='股市光明燈' className='my-5' />
					<p className='mb-5 font-light text-center'>banner動畫設計</p>
					<hr></hr>
				</li>
				<li>
					<h5 className='font-bold text-center '>Version 0.1</h5>
					<Image src='https://fakeimg.pl/640x320/' width={640} height={320} alt='股市光明燈' className='my-5' />
					<p className='mb-5 font-light text-center'>確認網站的架構以及主色調</p>
				</li>
			</ul>
		</div>
	)
}
