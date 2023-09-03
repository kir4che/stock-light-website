const nextConfig = {
	images: {
		domains: [
			'img.icons8.com',
			'p1-jj.byteimg.com',
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
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
		LINE_CHANNEL_ID: process.env.LINE_CHANNEL_ID,
		LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET,
		NEWS_API_KEY: process.env.NEWS_API_KEY,
	},
}

module.exports = nextConfig
