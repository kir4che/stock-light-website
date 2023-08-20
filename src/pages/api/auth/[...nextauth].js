import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import LineProvider from 'next-auth/providers/line'

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		LineProvider({
			clientId: process.env.LINE_CHANNEL_ID,
			clientSecret: process.env.LINE_CHANNEL_SECRET,
		}),
	],
	session: {
		jwt: true,
	},
	debug: false,
	pages: {
		signIn: '/dashboard/login',
	},
}

export default NextAuth(authOptions)
