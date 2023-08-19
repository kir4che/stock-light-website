import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'

export default function Timeline() {
	return (
		<Carousel
			className='w-[740px] h-[430px] px-12 flex items-center justify-center bg-white rounded-xl mx-auto'
			navButtonsAlwaysVisible={true}
			cycleNavigation={false}
			indicators={false}
			autoPlay={false}
		>
			<Image src='/images/development-timeline-1.svg' width={800} height={800} alt='development-timeline-1' />
			<Image src='/images/development-timeline-2.svg' width={800} height={800} alt='development-timeline-2' />
		</Carousel>
	)
}
