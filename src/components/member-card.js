export default function Member_Card({ onClick }) {
	const members = [
		{ id: 1, name: '林禹辰', duty: '後端', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 2, name: '葉柏賢', duty: '後端', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 3, name: '翁智宏', duty: '前端、UI/UX', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 4, name: '蘇昶諭', duty: '前端、UI/UX', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
	]

	const [flipped, setFlipped] = React.useState(false)

	const flip = () => {
		setFlipped(!flipped)
	}

	return (
		<ul className={'card-container' + (flipped ? ' flipped' : '')} onMouseEnter={flip} onMouseLeave={flip}>
			<li class='w-full p-4 shadow-lg xl:w-[22%] lg:w-[24%] md:w-[45%] sm:w-[42%]'>
				<Front />
				<Back />
			</li>
		</ul>
	)
}

function Front() {
	return (
		<>
			{members.map((member) => (
				<div class='p-4 rounded-lg'>
					<p class='tracking-widest text-secondary_blue text-xs mb-0.5'>{member.duty}</p>
					<h4 class='font-medium mb-3'>{member.name}</h4>
					<img
						class='h-40 rounded w-full object-cover object-center'
						src='https://dummyimage.com/720x400'
						alt='content'
					/>
				</div>
			))}
		</>
	)
}

function Back() {
	return (
		<p class='leading-relaxed text-base hidden hover:block'>
			Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache
			flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.
		</p>
	)
}
