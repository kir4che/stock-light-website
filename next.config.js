/**
 * @type {import('next').NextConfig}
 */
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
		],
	},
	env: {
		DB_URL: process.env.DB_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		GOOGLE_ID: process.env.GOOGLE_ID,
		GOOGLE_SECRET: process.env.GOOGLE_SECRET,
		FACEBOOK_ID: process.env.FACEBOOK_ID,
		FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
		EMAIL_API_KEY: process.env.EMAIL_API_KEY,
		EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
		EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		OPENAI_API_KEY_RAG: process.env.OPENAI_API_KEY_RAG,
	},
	future: {
		webpack5: {
			verbose: true,
		},
	},
}

module.exports = nextConfig
