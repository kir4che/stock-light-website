'use client'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { DarkModeProvider } from '@/providers/DarkModeProvider'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import '@/styles/globals.css'

export default function RootLayout({ children, params: { session, ...params } }) {
	const pathname = usePathname()
	const excludedPaths = /(\/analysis|\/light|\/user|\/ask|\/feedback|\/register|\/login)/
	const isExcludedPage = excludedPaths.test(pathname)

	useEffect(() => {
		AOS.init({
			easing: 'ease-in-out-cubic',
			delay: 100,
			once: false,
			mirror: false,
		})
		AOS.refresh()
	}, [])

	return (
		<html lang='en'>
			<body>
				<DarkModeProvider>
					<NextAuthProvider session={session}>
						<div
							className={`container bg-white dark:bg-zinc-800 ${
								isExcludedPage ? '' : 'px-4 sm:px-6 md:px-10 lg:px-16'
							}`}
						>
							<Header />
							<div className={pathname === '/' ? 'relative top-[76px]' : 'pt-[76px]'}>{children} </div>
							<div className={`${isExcludedPage ? 'px-4 sm:px-6 md:px-10 lg:px-16' : ''}`}>
								<Footer />
							</div>
						</div>
					</NextAuthProvider>
				</DarkModeProvider>
			</body>
		</html>
	)
}
