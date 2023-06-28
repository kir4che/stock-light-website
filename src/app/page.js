'use client'

import Footer from '@/components/Home/Footer'
import Header from '@/components/Home/Header'
import Home from '@/pages/Home'

import { ThemeProvider } from 'next-themes'

export default function App() {
	return (
		<ThemeProvider attribute='class'>
			<Header />
			<Home />
			<Footer />
		</ThemeProvider>
	)
}
