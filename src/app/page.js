'use client'

import Banner from '../components/Banner/Banner'
import MainContent from '../components/Home/MainContent/MainContent'
import Marquee from '../components/Home/Marquee/Marquee'
import Sidebar from '../components/Home/Sidebar/Sidebar'

export default function Home() {
	return (
		<>
			<Banner />
			<Marquee />
			<div className='py-8 sm:pb-10 sm:pt-14'>
				<div className='flex w-full md:gap-12 lg:gap-20 xl:gap-24'>
					<Sidebar />
					<MainContent />
				</div>
			</div>
		</>
	)
}
