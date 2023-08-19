const nextConfig = {
	images: {
		domains: ['img.icons8.com'], // 添加你的圖片來源主機名
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
}

module.exports = nextConfig
