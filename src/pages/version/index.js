import { versionInfo } from '@/data/versionInfo'
import Image from 'next/image'

export default function Version() {
	return (
		<div className='max-w-screen-sm px-8 py-20 mx-auto lg:px-0'>
			<h2 className='mb-5 text-center pb-2.5 border-b-[3px] border-b-primary_yellow'>版本更新資訊</h2>
			<ul className='space-y-3'>
				{versionInfo.map((item) => (
					<li key={item.version}>
						<h5 className='font-bold text-center'>{item.title}</h5>
						<Image src={item.image} width={640} height={320} alt='股市光明燈' className='my-5' />
						<p className='mb-5 font-light text-center'>{item.desc}</p>
						<hr />
					</li>
				))}
			</ul>
		</div>
	)
}
