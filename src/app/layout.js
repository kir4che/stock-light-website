import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '../styles/globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang='zh-Hant'>
			<head>
				<link rel='icon' href='/favicon.ico' />
			</head>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
