import Gantt from '@/components/GanttChart'
import Skill from '@/components/Skill'
import Team from '@/components/Team'

export default function About() {
	return (
		<div className='container w-full mx-auto mt-12'>
			<div className='text-center mb-28'>
				<h3 className='mb-3 font-medium'>開發團隊</h3>
				<p className='mb-6 text-sm leading-6'>
					一群由臺北科技大學資訊與財金管理系的學生所組成的團隊
					<br />
					希望能夠藉由搜集台灣股市的歷史數據，分析各種可能性！
				</p>
				<Team />
			</div>
			<div className='text-center mb-28'>
				<h3 className='mb-5 font-medium '>本站所用技術</h3>
				<Skill />
			</div>
			<div className='text-center mb-28'>
				<h3 className='mb-5 font-medium '>開發時程</h3>
				<Gantt />
			</div>
		</div>
	)
}
