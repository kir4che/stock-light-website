import Image from 'next/image'

const members = [
	{
		id: 1,
		name: '林禹丞',
		content: '後端、分析數據',
		img: '/assets/members/109AB0752.jpg',
		desc: '您好我是林禹丞目前就讀臺北科技大學資訊與財金管理學系三年級。',
	},
	{
		id: 2,
		name: '葉柏賢',
		content: '後端、分析數據',
		img: '/assets/members/109AB0712.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
	{
		id: 3,
		name: '翁智宏',
		content: '前端、UI/UX、分析數據',
		img: '/assets/members/109AB0760.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
	{
		id: 4,
		name: '蘇昶諭',
		content: '前端、UI/UX、分析數據',
		img: '/assets/members/109AB0738.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
]

export default function Team() {
	return (
		<div>
			<h2 className='mb-5 text-center'>開發團隊</h2>
			<p className='mb-10 text-sm leading-6 text-center'>
				一群由臺北科技大學資訊與財金管理系的學生所組成的團隊
				<br />
				希望能夠藉由搜集台灣股市的歷史數據，分析各種可能性！
			</p>
			<ul className='team-card_group flex-center'>
				{members.map((member) => (
					<li className='team-card' key={member.id}>
						<h4>{member.name}</h4>
						<p className='team-card_content'>{member.content}</p>
						<Image src={member.img} width={400} height={400} alt={member.name} className='team-card_img' />
						<p className='team-card_back'>{member.desc}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
