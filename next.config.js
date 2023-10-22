const nextConfig = {
	swcMinify: true,
	images: {
		domains: [
			'img.icons8.com',
			'images.unsplash.com',
			'p1-jj.byteimg.com',
			'upload.wikimedia.org',
			'fakeimg.pl',
			'i.imgur.com',
			'www.freepnglogos.com',
			'lh3.googleusercontent.com',
		], // 添加你的圖片來源主機名
	},
	env: {
		DB_URL: process.env.DB_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		EMAIL_API_KEY: process.env.EMAIL_API_KEY,
		EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
		EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
		GNEWS_API_KEY: process.env.GNEWS_API_KEY,
	},
}

module.exports = nextConfig
