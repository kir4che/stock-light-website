import { DarkModeProvider } from '@/providers/DarkModeProvider'
import { NextAuthProvider } from '@/providers/NextAuthProvider'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import '@/styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter()
	const excludedPaths = /(\/analysis|\/light|\/user|\/ask|\/feedback|\/register|\/login)/
	const isExcludedPage = excludedPaths.test(router.pathname)

	useEffect(() => {
		AOS.init({
			easing: 'ease-in-out-cubic',
			delay: 100,
			once: false,
			mirror: false,
		})
	}, [])

	useEffect(() => {
		AOS.refresh()
	}, [])

	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/assets/logo.png' />
			</Head>
			<DarkModeProvider>
				<NextAuthProvider session={session}>
					<div
						className={`container bg-white dark:bg-zinc-800 ${isExcludedPage ? '' : 'px-4 sm:px-6 md:px-10 lg:px-16'}`}
					>
						<Header />
						<div className={router.pathname === '/' ? 'relative top-[76px]' : 'pt-[76px]'}>
							<Component {...pageProps} />
						</div>
						<div className={`${isExcludedPage ? 'px-4 sm:px-6 md:px-10 lg:px-16' : ''}`}>
							<Footer />
						</div>
					</div>
				</NextAuthProvider>
			</DarkModeProvider>
		</>
	)
}
