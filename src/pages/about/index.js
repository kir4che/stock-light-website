import Skill from '../../components/Skill/Skill'
import Team from '../../components/Team/Team'
import Timeline from '../../components/Timeline/Timeline'

export default function About() {
	return (
		<div className='w-full py-16 mx-auto'>
			<div className='pb-10 mb-16 text-center'>
				<h2 className='mb-5'>開發團隊</h2>
				<p className='text-sm leading-6 mb-7'>
					一群由臺北科技大學資訊與財金管理系的學生所組成的團隊
					<br />
					希望能夠藉由搜集台灣股市的歷史數據，分析各種可能性！
				</p>
				<Team />
			</div>
			<div className='mb-24 text-center'>
				<h3 className='mb-6 font-medium '>本站所用技術</h3>
				<Skill />
			</div>
			<div className='text-center'>
				<h3 className='mb-6 font-medium'>開發時程</h3>
				<Timeline />
			</div>
		</div>
	)
}
