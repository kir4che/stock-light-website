import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { DarkModeProvider } from '../context/DarkModeContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<DarkModeProvider>
			<div className='container space-y-6'>
				<Header />
				<Component {...pageProps}></Component>
				<Footer />
			</div>
		</DarkModeProvider>
	)
}
