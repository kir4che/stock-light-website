import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				try {
					const response = await fetch(`${process.env.DB_URL}/api/user/login`, {
						method: 'POST',
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					})

					const data = await response.json()

					const user = {
						id: data.data.user_id,
						name: data.data.name,
						email: data.data.email,
						image: '',
					}

					return { user, token: data.data.token }
				} catch (error) {
					console.error('Error: ', error)
					// if (credentials.email === 'test@gmail.com' && credentials.password === '12345') {
					// 	const user = {
					// 		id: 1,
					// 		name: 'test',
					// 		email: 'test@gmail.com',
					// 		image: '',
					// 	}
					// 	return { user, token: '123' }
					// } else return null
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 2 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				if (account.provider === 'google' || account.provider === 'facebook') token.user = { user: user }
				else token.user = user
				token.provider = account.provider
				token.accessToken = user.token
			}
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			session.user.provider = token.provider
			session.accessToken = token.accessToken

			// console.log('session', session)
			return session.user
		},
		debug: true,
		secret: process.env.NEXTAUTH_SECRET,
	},
})

export { handler as GET, handler as POST }
