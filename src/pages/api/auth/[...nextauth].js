import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
		error: '/login',
	},
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials
				// 測試用
				if (email === 'test@gmail.com' && password === '12345') {
					const user = {
						name: 'Tester',
						email: email,
						image: '',
						id: '123',
						access_token: '',
					}
					if (user) return user
				} else return null

				// const response = await fetch(`${process.env.DB_URL}/api/user/login`, {
				// 	method: 'POST',
				// 	body: JSON.stringify(credentials),
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// })
				// const user = await response.json()
				// if (res.ok && user) return user
				// return null
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.id = account.providerAccountId
				token.accessToken = account.access_token || null
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id
				session.user.accessToken = token.accessToken
			}
			console.log(session)
			console.log(token)
			return session
		},
	},
}

export const getServerAuthSession = (ctx) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}

export default NextAuth(authOptions)
