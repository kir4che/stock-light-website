import NextAuth, { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials) {
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

					if (response.ok && data) {
						const user = {
							name: data.data.name,
							email: data.data.email,
							image: '',
						}
						return user
					} else return null
				} catch (error) {
					return null
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	callbacks: {
		async session(session, user) {
			session.user = user
			console.log('session', session.session)
			return session.session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}

export const getServerAuthSession = (ctx) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}

export default NextAuth(authOptions)
