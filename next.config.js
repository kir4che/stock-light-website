const nextConfig = {
	images: {
		domains: [
			'img.icons8.com',
			'images.unsplash.com',
			'p1-jj.byteimg.com',
			'upload.wikimedia.org',
			'fakeimg.pl',
			'i.imgur.com',
			'imgur.com',
			'www.freepnglogos.com',
			'lh3.googleusercontent.com',
			'encrypted-tbn3.gstatic.com',
			'encrypted-tbn2.gstatic.com',
			'encrypted-tbn1.gstatic.com',
			'encrypted-tbn0.gstatic.com',
		], // 添加你的圖片來源主機名
	},
	env: {
		DB_URL: process.env.DB_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		JWT_SECRET: process.env.JWT_SECRET,
		EMAIL_API_KEY: process.env.EMAIL_API_KEY,
		EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
		EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	},
}

module.exports = nextConfig
