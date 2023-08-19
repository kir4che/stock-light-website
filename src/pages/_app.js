import '../app/globals.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NextAuthProvider from '../components/NextAuthProvider/NextAuthProvider'
import { DarkModeProvider } from '../context/DarkModeContext'

export default function App({ Component, pageProps }) {
	return (
		<DarkModeProvider>
			<NextAuthProvider>
				<div className='container space-y-6'>
					<Header />
					<Component {...pageProps}></Component>
					<Footer />
				</div>
			</NextAuthProvider>
		</DarkModeProvider>
	)
}
