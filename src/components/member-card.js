export default function Member_Card() {
	const members = [
		{
			id: 1,
			name: '林禹辰',
			duty: '後端、分析數據',
			img: 'https://assets.codepen.io/152347/crooked-colours.jpg',
			desc: '我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我',
		},
		{
			id: 2,
			name: '葉柏賢',
			duty: '後端、分析數據',
			img: 'https://assets.codepen.io/152347/crooked-colours.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 3,
			name: '翁智宏',
			duty: '前端、UI/UX、分析數據',
			img: 'https://assets.codepen.io/152347/crooked-colours.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 4,
			name: '蘇昶諭',
			duty: '前端、UI/UX、分析數據',
			img: 'https://assets.codepen.io/152347/crooked-colours.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
	]

	return (
		<ul className='card-group'>
			{members.map((member) => (
				<li className='card'>
					<h4 className='font-medium '>{member.name}</h4>
					<button className='mb-3 text-xs tracking-widest'>{member.duty}</button>
					<img className='card-img' src='https://dummyimage.com/720x400' alt={member.name} />
					<p className='back'>{member.desc}</p>
				</li>
			))}
		</ul>
	)
}
