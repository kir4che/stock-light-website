export default function Team() {
	const members = [
		{
			id: 1,
			name: '林禹丞',
			duty: '後端、分析數據',
			img: '../images/109AB0752.png',
			desc: '您好我是林禹丞目前就讀臺北科技大學資訊與財金管理學系三年級。',
		},
		{
			id: 2,
			name: '葉柏賢',
			duty: '後端、分析數據',
			img: 'https://dummyimage.com/720x400',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 3,
			name: '翁智宏',
			duty: '前端、UI/UX、分析數據',
			img: 'https://dummyimage.com/720x400',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 4,
			name: '蘇昶諭',
			duty: '前端、UI/UX、分析數據',
			img: 'https://dummyimage.com/720x400',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
	]

	return (
		<ul className='card-group'>
			{members.map((member) => (
				<li className='card'>
					<h4 className='font-medium '>{member.name}</h4>
					<button className='mb-4 text-xs tracking-widest'>{member.duty}</button>
					<img className='card-img' src={member.img} alt={member.name} />
					<p className='back'>{member.desc}</p>
				</li>
			))}
		</ul>
	)
}
