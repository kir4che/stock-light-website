import Card from '@/components/member-card'

export default function Team() {
	return (
		<div className='container w-full mx-auto mt-12'>
			<div className='mb-8 text-center'>
				<h3 className='mb-4 font-medium team-title'>開發團隊</h3>
				<p className='leading-7'>
					一群由臺北科技大學資訊與財金管理系的學生所組成的團隊
					<br />
					希望能夠藉由搜集台灣股市的歷史數據，分析各種可能性！
				</p>
			</div>
			<Card />
			<div className='text-center'>
				<h3 className='mb-4 font-medium '>本站所用技術</h3>
			</div>
		</div>
	)
}
