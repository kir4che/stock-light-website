import '../styles/globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang='zh-Hant'>
			<head>
				<link rel='icon' href='/favicon.ico' />
			</head>
			<body>{children}</body>
		</html>
	)
}
