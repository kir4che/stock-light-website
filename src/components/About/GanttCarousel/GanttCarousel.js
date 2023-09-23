import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'

export default function GanttCarousel() {
	return (
		<div className='pb-16'>
			<h3 className='mb-5 text-center'>開發時程</h3>
			<div className='overflow-x-scroll flex-nowrap'>
				<Carousel
					indicators={false}
					cycleNavigation={false}
					className='w-[780px] mx-auto rounded-xl dark:bg-white h-[420px] flex-center'
				>
					<Image
						src='/assets/development-timeline-1.svg'
						width={720}
						height={400}
						alt='development-timeline-1'
						className='mx-auto'
					/>
					<Image
						src='/assets/development-timeline-2.svg'
						width={680}
						height={400}
						alt='development-timeline-2'
						className='mx-auto'
					/>
				</Carousel>
			</div>
		</div>
	)
}
