import Image from 'next/image'

export default function Version() {
	const info = [
		{
			title: 'Version 2.0.0',
			url: '/version',
			image: [
				'/assets/version/version2.0.0-1.png',
				'/assets/version/version2.0.0-2.png',
				'/assets/version/version2.0.0-3.png',
			],
			desc: '更換網站風格、新增點燈 / 股市...各項功能',
		},
		{
			title: 'Version 1.1.0',
			url: '/version',
			image: ['/assets/version/version1.1.0.png'],
			desc: 'banner 動畫設計',
		},
		{
			title: 'Version 1.0.0',
			url: '/version',
			image: ['/assets/version/version1.0.0.png'],
			desc: '確認網站的架構以及主色調',
		},
	]

	return (
		<div className='max-w-screen-sm px-8 pt-12 pb-20 mx-auto lg:px-0'>
			<h2 className='mb-5 text-center pb-2.5 border-b-[3px] border-b-primary_yellow'>版本更新資訊</h2>
			<ul className='space-y-3'>
				{info.map((item) => (
					<li key={item.version}>
						<h5 className='font-bold text-center'>{item.title}</h5>
						{item.image.map((imgSrc, index) => (
							<Image key={index} src={imgSrc} width={640} height={320} alt='股市光明燈' className='my-5' />
						))}
						<p className='mb-5 font-light text-center'>{item.desc}</p>
						<hr />
					</li>
				))}
			</ul>
		</div>
	)
}
