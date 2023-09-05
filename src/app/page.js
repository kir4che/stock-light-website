'use client'

import Banner from '../components/Home/Banner/Banner'
import MainContent from '../components/Home/MainContent/MainContent'
import Marquee from '../components/Home/Marquee/Marquee'
import Sidebar from '../components/Home/Sidebar/Sidebar'

export default function Home() {
	return (
		<>
			<Banner />
			<Marquee />
			<div className='pt-8 pb-12 sm:pt-12 sm:pb-16'>
				<div className='flex w-full md:gap-12 lg:gap-20 xl:gap-24'>
					<Sidebar />
					<MainContent />
				</div>
			</div>
		</>
	)
}
