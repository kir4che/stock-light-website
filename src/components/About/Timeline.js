import Carousel from 'react-material-ui-carousel'

export default function Timeline() {
	return (
		<Carousel
			className='w-[740px] px-14 mx-auto'
			navButtonsAlwaysVisible={true}
			cycleNavigation={false}
			indicators={false}
			autoPlay={false}
		>
			<img src='../images/development-timeline-1.svg' alt='development-timeline-1' />
			<img src='../images/development-timeline-2.svg' alt='development-timeline-2' />
		</Carousel>
	)
}
