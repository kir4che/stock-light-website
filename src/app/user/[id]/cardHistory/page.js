import Image from 'next/image'

import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export default function CardHistory() {
	const cardsData = [
		{ date: '2023年10月28日', industry: '金融類股', imageUrl: 'https://imgur.com/h4ICpmE.png' },
		{ date: '2023年10月30日', industry: '電子類股', imageUrl: 'https://i.imgur.com/bZOT3Sq.png' },
	]

	return (
		<StarryBackground className='pt-12 text-zinc-100'>
			<Breadcrumbs prevPage='使用者頁面' curPage='我的小卡' />
			<section className='flex flex-row items-start justify-center min-h-full mt-6'>
				<div className='gap-10 card-grid'>
					{cardsData.map((card) => (
						<a className='relative list-none card' href='#'>
							<div className='card__background'>
								<Image src={card.imageUrl} width={640} height={320} alt='card' />
							</div>
							<div className='absolute top-0 left-0 p-2'>
								<p className='text-sm uppercase'>{card.date}</p>
								<h3 className='card__category'>{card.industry}</h3>
							</div>
						</a>
					))}
				</div>
			</section>
		</StarryBackground>
	)
}
