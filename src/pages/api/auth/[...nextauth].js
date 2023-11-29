import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
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
						name: data.data.name,
						email: data.data.email,
						image: '',
					}
					return { user, token: data.data.token }
				} catch (error) {
					return null
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 2 * 60 * 60,
	},
	jwt: {
		maxAge: 2 * 60 * 60,
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && account.type === 'credentials' && user) {
				token.user = user
				token.accessToken = user.token
			}
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			session.accessToken = token.accessToken

			console.log('session', session.user)
			return session.user
		},
	},
}

export const getServerAuthSession = (ctx) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}

export default NextAuth(authOptions)
