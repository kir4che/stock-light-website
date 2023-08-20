import { useRouter } from 'next/router'
import '../app/globals.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NextAuthProvider from '../components/NextAuthProvider/NextAuthProvider'
import { DarkModeProvider } from '../context/DarkModeContext'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter()
	const isExcludedPage = router.pathname === '/analysis' || router.pathname === '/light'

	return (
		<DarkModeProvider>
			<NextAuthProvider session={session}>
				<div className={`container bg-white dark:bg-zinc-900 ${isExcludedPage ? 'p-0' : 'px-4 md:px-10 lg:px-16'}`}>
					<Header />
					<Component {...pageProps}></Component>
					<Footer />
				</div>
			</NextAuthProvider>
		</DarkModeProvider>
	)
}
