const nextConfig = {
	images: {
		domains: ['img.icons8.com', 'p1-jj.byteimg.com', 'fakeimg.pl', 'i.imgur.com', 'www.freepnglogos.com'], // 添加你的圖片來源主機名
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
}

module.exports = nextConfig
