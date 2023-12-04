import Gantt from '@/components/About/Gantt'
import Skill from '@/components/About/Skill'
import Team from '@/components/About/Team'

export default function About() {
	return (
		<div className='pt-8 pb-12 space-y-24 sm:pt-12 sm:pb-20'>
			<Team />
			<Skill />
			<Gantt />
		</div>
	)
}
