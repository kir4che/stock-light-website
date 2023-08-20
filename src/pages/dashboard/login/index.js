import { getServerSession } from 'next-auth/next'
import { getProviders, signIn } from 'next-auth/react'
import { authOptions } from '../../api/auth/[...nextauth]'

export default function SignIn({ providers }) {
	return (
		<>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
				</div>
			))}
		</>
	)
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions)

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
		return { redirect: { destination: '/dashboard' } }
	}

	const providers = await getProviders()

	return {
		props: { providers: providers ?? [] },
	}
}
