import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useState } from 'react'

export default function Gantt() {
	const imageUrls = ['/assets/gantt/development-timeline-1.svg', '/assets/gantt/development-timeline-2.svg']

	const [currentImg, setCurrentImg] = useState(0)

	const handleNextImg = () => setCurrentImg((prevIndex) => (prevIndex + 1) % imageUrls.length)
	const handlePrevImg = () => setCurrentImg((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length)

	return (
		<section>
			<h3 className='mb-5 text-center'>開發時程</h3>
			<div className='flex-col sm:flex-row flex-center'>
				{currentImg === 1 && (
					<button
						className='w-9 py-0.5 rounded-full dark:bg-zinc-600 dark:hover:bg-zinc-600/80'
						onClick={handlePrevImg}
					>
						<NavigateBeforeIcon />
					</button>
				)}
				<img
					src={imageUrls[currentImg]}
					width={720}
					height={400}
					className='object-cover mx-auto my-2 sm:mb-0 bg-white rounded-lg h-[56vw] sm:h-[425px]'
					alt={`development-timeline-${currentImg + 1}`}
				/>
				{currentImg === 0 && (
					<button
						className='w-9 py-0.5 rounded-full dark:bg-zinc-600 dark:hover:bg-zinc-600/80'
						onClick={handleNextImg}
					>
						<NavigateNextIcon />
					</button>
				)}
			</div>
		</section>
	)
}
