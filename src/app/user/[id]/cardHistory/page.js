'use client'

import Image from 'next/image'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function cardHistory() {
	return [
		<StarryBackground className='pt-12 text-zinc-100'>
			<Breadcrumbs prevPage='使用者頁面' curPage='我的小卡' />
			<section className='flex flex-row items-start justify-center min-h-full mt-6'>
				<div className='gap-10 card-grid'>
					<a className='relative list-none card' href='#'>
						<div className='card__background'>
							<Image src={'https://imgur.com/h4ICpmE.png'} width={640} height={320} alt='card' />
						</div>
						<div className='absolute top-0 left-0'>
							<p className='text-sm uppercase'>2023年10月28日</p>
							<h3 className='card__category'>金融類股</h3>
						</div>
					</a>

					<a className='relative list-none card' href='#'>
						<div className='card__background '>
							<Image src={'https://i.imgur.com/bZOT3Sq.png'} width={640} height={320} alt='card' />
						</div>
						<div className='absolute top-0 left-0'>
							<p className='text-sm uppercase'>2023年10月30日</p>
							<h3 className='card__category'>電子類股</h3>
						</div>
					</a>
				</div>
			</section>
		</StarryBackground>,
	]
}
