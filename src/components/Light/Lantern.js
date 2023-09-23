import Link from 'next/link'

export default function Lantern({ user }) {
	return (
		<div className='float'>
			<Link href={`/light/checkout?id=${user.id}&category=水泥`}>
				<div className='lantern lanterntag_container lanternone'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>水泥股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=食品`}>
				<div className='lantern lanterntag_container lanterntwo'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>食品股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>
				<div className='lantern lanterntag_container lanternthree'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>塑膠股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=化學`}>
				<div className='lantern lanterntag_container lanternfour'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>化學股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>
				<div className='lantern lanterntag_container lanternfive'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>生技醫療股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>
				<div className='lantern lanterntag_container lanternsix'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>鋼鐵股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=汽車`}>
				<div className='lantern lanterntag_container lanternseven'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>汽車股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=電機`}>
				<div className='lantern lanterntag_container lanterneight'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>電機股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=半導體`}>
				<div className='lantern lanterntag_container lanternnight'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>半導體股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=光電`}>
				<div className='lantern lanterntag_container lanternten'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>光電股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>
				<div className='lantern lanterntag_container lanterneleven'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>資訊服務股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>
				<div className='lantern lanterntag_container lanterntwelve'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>電子零件股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=航運`}>
				<div className='lantern lanterntag_container lanternthirteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>航運股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=金融`}>
				<div className='lantern lanterntag_container lanternforteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>金融股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>
				<div className='lantern lanterntag_container lanternfifteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='w-8 mx-2 my-5 flex-center laterntag'>綠能環保股</div>
				</div>
			</Link>
		</div>
	)
}
