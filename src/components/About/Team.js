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
		desc: '這次專題的多人協作對於我來說是第一次，第一次從無到有開發一個平台、第一次使用 GitHub 遠端協作的功能、第一次串接團隊後端自己構建的 API。藉由專題，我也學習到了許多前端的新技術，像是視覺化圖表、身份驗證等，也了解在 UI/UX 設計上還有很多部分是我能去學習的。同時，我最大的收穫就是前後端協作，雖然我們剛開始不經常開會，專案進度落後，但後來我們也增加溝通次數，意識到溝通及協調的重要性。也多虧了其他組員，每個組員都發揮所長，互補不足，體現了一加一大於二的效果，讓我們的專題完美落幕。往後，我也會帶著從專題學到的經驗去更有效率地完成職場上遇到的各種挑戰。',
	},
	{
		id: 3,
		name: '林禹丞',
		content: '後端、資料庫設計、模型訓練',
		img: '/assets/members/109AB0752.jpg',
		desc: '對我來說，透過這個期末專題對於整個網頁架構的學習是最多的，2023年7月股市光明燈從無到有，最一開始的主題發想，中間還經歷了系統、資料庫、UI/UX設計以及前後端開發，12月即將迎來收尾，對我來說這個專案已經相對完整。然而中間報名比賽的時候我們的主題似乎不被認同，其實我一直都把這個專題視為一個實作大於想法的專案，因為如果只是要提一個想法的話他應該叫做商業計畫書而非專題。但在投稿失利後，我其實就一直在想該如何在想法和實作中間取得一個平衡，最後就決定加入2023年最熱門的主題-生程式AI到我們的投資儀表板中，將chatbot、情緒分析、RAG這些應用和現有的數據分析做整合，現在看起來股市光明燈已經變成一個更全面的平台即服務的產品。最後的最後還是要非常感謝每位組員的努力，如果沒有每個人的付出是不可能做出這樣的成果的。',
	},
	{
		id: 4,
		name: '翁智宏',
		content: 'UI/UX設計、前端設計、網站動畫設計',
		img: '/assets/members/109AB0760.jpg',
		desc: '我從這份專題中學到好多好多，尤其是對於前端的概念與技術都覺得跟以往做做練習的程度都不一樣，因為我會一直去思考要如何將我們主題光明燈融入進我們的網站中，讓使用者能看到我們的網頁就知道我們的主題風格，所以也參考了各種網站、特效之類的元素，而且跟在各領域專長的組員身邊一起學習，成長起來最快速。起初從很懶得製作專題，到後期雛型都出來時，漸漸地覺得這已經不像是專題，而是一個專案的流程製作，希望能能讓大家都感受到我們網站想帶來的感受。最後，我很感謝各位組員的照顧，因為知道我要考研究所，沒辦法把全部心力投入進來專題製作，但都願意包容，也都有做好明確的分工，讓我知道我負責哪部分，好好地把我該負責的做到最好，就是回饋給各位以及這份專題的表現！',
	},
]

export default function Team() {
	return (
		<section className='pb-24'>
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
						<p className=' team-card_back'>{member.desc}</p>
					</li>
				))}
			</ul>
		</section>
	)
}
