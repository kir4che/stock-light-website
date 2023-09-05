import Link from 'next/link'

export default function Lantern({ user }) {
	return (
		<div className='float'>
			<Link href={`/light/checkout?category=水泥&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternone'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md '></div>
					<div className='rounded-t-lg right rounded-b-md '></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>水泥股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=食品&id=${user.id}`}>
				<div className='lantern lanterntag_container lanterntwo'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>食品股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=塑膠&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternthree'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>塑膠股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=化學&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternfour'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>化學股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=生技醫療&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternfive'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>生技醫療股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=鋼鐵&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternsix'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>鋼鐵股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=汽車&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternseven'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>汽車股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=電機&id=${user.id}`}>
				<div className='lantern lanterntag_container lanterneight'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>電機股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=半導體&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternnight'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>半導體股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=光電&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternten'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>光電股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=資訊服務&id=${user.id}`}>
				<div className='lantern lanterntag_container lanterneleven'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>資訊服務股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=電子零件&id=${user.id}`}>
				<div className='lantern lanterntag_container lanterntwelve'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>電子零件股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=航運&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternthirteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>航運股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=金融&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternforteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>金融股</div>
				</div>
			</Link>
			<Link href={`/light/checkout?category=綠能環保&id=${user.id}`}>
				<div className='lantern lanterntag_container lanternfifteen'>
					<div className='laternlight'></div>
					<div className='rounded-t-lg left rounded-b-md'></div>
					<div className='rounded-t-lg right rounded-b-md'></div>
					<div className='flame'></div>
					<div className='flex justify-center w-8 mx-2 my-5 laterntag'>綠能環保股</div>
				</div>
			</Link>
		</div>
	)
}
