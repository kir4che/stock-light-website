import Lantern from '@/components/Light/Lantern'
import StarryBackground from '@/components/common/StarryBackground'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (!session) return { redirect: { destination: `/login`, permanent: false } }
	else return { props: { user: session.user } }
}

export default function Light({ user }) {
	return (
		<StarryBackground>
			<div className='min-h-screen'>
				<Lantern user={user} />
			</div>
		</StarryBackground>
	)
}
