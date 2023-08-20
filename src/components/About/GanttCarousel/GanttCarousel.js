import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'

export default function GanttCarousel() {
	return (
		<Carousel
			indicators={false}
			cycleNavigation={false}
			className='w-[780px] mx-auto rounded-xl dark:bg-white h-[400px] flex items-center justify-center'
		>
			<Image src='/images/development-timeline-1.svg' fill={true} alt='development-timeline-1' />
			<Image src='/images/development-timeline-2.svg' fill={true} alt='development-timeline-2' />
		</Carousel>
	)
}
