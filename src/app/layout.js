import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NextAuthProvider from '../components/NextAuthProvider/NextAuthProvider'
import { DarkModeProvider } from '../context/DarkModeContext'
import './globals.css'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: '股市光明燈',
	description: 'This is the description.',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<DarkModeProvider>
					<NextAuthProvider>
						<div className='container px-4 bg-white dark:bg-zinc-900 sm:px-6 md:px-10 lg:px-16'>
							<Header />
							{children}
							<Footer />
						</div>
					</NextAuthProvider>
				</DarkModeProvider>
			</body>
		</html>
	)
}
