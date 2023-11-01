import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const testUser = {
	user_id: 0,
	email: 'test@gmail.com',
	password: '12345',
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// // 本地測試用（不需連接資料庫）
				// if (credentials.email === testUser.email && credentials.password === testUser.password) {
				// 	return testUser
				// } else {
				// 	console.error('登入失敗：電子郵件或密碼輸入錯誤！')
				// 	return null
				// }

				// 串接後端 API（已確認可使用）
				const res = await fetch(`${process.env.DB_URL}/api/user/login`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						'Content-Type': 'application/json',
					},
				})

				const data = await res.json()
				const user = {
					...data.data,
				}

				if (res.status === 200) return user
				else {
					alert('登入失敗：電子郵件或密碼輸入錯誤！')
					console.error(data.errorMessage)
					return null
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	session: {
		jwt: true,
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account) {
				token.accessToken = account.accessToken
				token.refreshToken = account.refreshToken
			}
			if (user) token.user = user
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			console.log('session', session)
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}

export const getServerAuthSession = (ctx) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}

export default NextAuth(authOptions)
