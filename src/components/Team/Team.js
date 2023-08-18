import Image from 'next/image'

export default function Team() {
	const members = [
		{
			id: 1,
			name: '林禹丞',
			duty: '後端、分析數據',
			img: '/images/members/109AB0752.jpg',
			desc: '您好我是林禹丞目前就讀臺北科技大學資訊與財金管理學系三年級。',
		},
		{
			id: 2,
			name: '葉柏賢',
			duty: '後端、分析數據',
			img: '/images/members/109AB0712.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 3,
			name: '翁智宏',
			duty: '前端、UI/UX、分析數據',
			img: '/images/members/109AB0760.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
		{
			id: 4,
			name: '蘇昶諭',
			duty: '前端、UI/UX、分析數據',
			img: '/images/members/109AB0738.jpg',
			desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
		},
	]

	return (
		<ul className='card-group'>
			{members.map((member) => (
				<li className='card' key={member.id}>
					<h4>{member.name}</h4>
					<p className='mb-4 text-xs tracking-widest opacity-75'>{member.duty}</p>
					<Image
						src={member.img}
						width={400}
						height={400}
						alt={member.name}
						className='object-cover object-center w-full h-64'
					/>
					<p className='back'>{member.desc}</p>
				</li>
			))}
		</ul>
	)
}
