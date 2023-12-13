import Image from 'next/image'

const members = [
	{
		id: 1,
		name: '葉柏賢',
		content: '後端、資料庫設計、天氣分析',
		img: '/assets/members/109AB0712.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
	{
		id: 2,
		name: '蘇昶諭',
		content: 'UI/UX設計、前端設計、前後端串接、圖表設計',
		img: '/assets/members/109AB0738.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
	{
		id: 3,
		name: '林禹丞',
		content: '後端、資料庫設計、模型訓練',
		img: '/assets/members/109AB0752.jpg',
		desc: '您好我是林禹丞目前就讀臺北科技大學資訊與財金管理學系三年級。',
	},
	{
		id: 4,
		name: '翁智宏',
		content: 'UI/UX設計、前端設計、網站動畫設計',
		img: '/assets/members/109AB0760.jpg',
		desc: 'Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.',
	},
]

export default function Team() {
	return (
		<section>
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
						<Image src={member.img} width={800} height={800} className='team-card_img' alt={member.name} />
						<p className='team-card_back'>{member.desc}</p>
					</li>
				))}
			</ul>
		</section>
	)
}
