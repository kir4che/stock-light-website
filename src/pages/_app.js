import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
import '../styles/globals.css'

import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider attribute='class'>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	)
}
