import Link from 'next/link'

import StarryBackground from '@/components/common/StarryBackground'
import Lantern from '@/components/ui/Lantern'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (!session) return { redirect: { destination: `/login`, permanent: false } }
	else return { props: { user: session.user } }
}

export default function Light({ user }) {
	return (
		<StarryBackground>
			<div className='float'>
				<Link href={`/light/checkout?id=${user.id}&category=水泥`}>
					<Lantern labelPosition={'top-96'} label={'水泥股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=食品`}>
					<Lantern labelPosition={'left-[500px] top-52'} label={'食品股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>
					<Lantern labelPosition={'left-[350px] top-64 scale-75'} label={'塑膠股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=化學`}>
					<Lantern labelPosition={'right-0 top-32'} label={'化學股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>
					<Lantern labelPosition={'right-52 top-4 scale-[70%]'} label={'生技醫療股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>
					<Lantern labelPosition={'right-[400px] top-[400px] scale-75'} label={'鋼鐵股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=汽車`}>
					<Lantern labelPosition={'right-56 top-[530px]'} label={'汽車股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=電機`}>
					<Lantern labelPosition={'left-12 top-40'} label={'電機股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=半導體`}>
					<Lantern labelPosition={'right-96 top-36'} label={'半導體股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=光電`}>
					<Lantern labelPosition={'left-[430px] top-[460px]'} label={'光電股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>
					<Lantern labelPosition={'left-52 top-20'} label={'資訊服務股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>
					<Lantern labelPosition={'left-48 top-[560px] scale-[80%]'} label={'電子零件股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=航運`}>
					<Lantern labelPosition={'right-20 top-80 scale-[60%]'} label={'航運股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=金融`}>
					<Lantern labelPosition={'-right-12 top-[500px] scale-90'} label={'金融股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>
					<Lantern labelPosition={'-left-12 top-10 scale-75'} label={'綠能環保股'} />
				</Link>
			</div>
		</StarryBackground>
	)
}
