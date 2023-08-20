import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import LineProvider from 'next-auth/providers/line'

export default async function auth(req, res) {
	const providers = [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
		}),
		LineProvider({
			clientId: process.env.NEXT_PUBLIC_LINE_CHANNEL_ID,
			clientSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET,
		}),
	]

	return await NextAuth(req, res, {
		providers,
		secret: process.env.SECRET,
		jwt: {
			secret: process.env.SECRET,
		},
		session: {
			strategy: 'jwt',
		},
		debug: true,

		pages: {
			signIn: '/auth/signin',
			error: '/auth/signin',
			newUser: '/auth/new-user',
		},

		callbacks: {
			async session({ session, token }) {
				session.accessToken = token.accessToken
				session.refreshToken = token.refreshToken
				session.idToken = token.idToken
				session.provider = token.provider
				session.id = token.id
				return session
			},
			async jwt({ token, user, account }) {
				if (account) {
					token.accessToken = account.access_token
					token.refreshToken = account.refresh_token
					token.idToken = account.id_token
					token.provider = account.provider
				}
				if (user) token.id = user.id.toString()
				return token
			},
		},
	})
}
