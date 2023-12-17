import Image from 'next/image'

export default function Skill() {
	const skill_list = [
		{
			id: 1,
			category: '後端',
			skills: [
				{
					icon: 'https://img.icons8.com/fluency/48/node-js.png',
					name: 'Node.js',
				},
				{
					icon: 'https://img.icons8.com/material-outlined/24/mysql-logo.png',
					name: 'MySQL',
				},
				{
					icon: 'https://img.icons8.com/color/48/chatgpt.png',
					name: 'GPT-4',
				},
			],
		},
		{
			id: 2,
			category: '前端',
			skills: [
				{
					icon: 'https://img.icons8.com/fluency/30/nextjs.png',
					name: 'Next.js',
				},
				{
					icon: 'https://img.icons8.com/color/28/tailwind_css.png',
					name: 'Tailwind CSS',
				},
				{
					icon: 'https://img.icons8.com/color/28/material-ui.png',
					name: 'Material UI',
				},
				{
					icon: 'https://img.icons8.com/nolan/28/pie-chart.png',
					name: 'Echarts',
				},
			],
		},
		{
			id: 3,
			category: 'UI / UX',
			skills: [
				{
					icon: 'https://img.icons8.com/color/28/figma--v1.png',
					name: 'Figma',
				},
			],
		},
		{
			id: 4,
			category: '統計分析',
			skills: [
				{
					icon: '',
					name: '情緒分析',
				},
				{
					icon: '',
					name: '相關性分析',
				},
				{
					icon: '',
					name: '迴歸分析',
				},
			],
		},
	]

	return (
		<section>
			<h3 className='mb-10 text-center'>開發技術</h3>
			<div className='flex-center'>
				<div className='flex pb-4 overflow-x-scroll flex-nowrap'>
					{skill_list.map((item) => (
						<div className='inline-block mx-3 shadow-md dark:bg-zinc-700 rounded-xl' key={item.id}>
							<h5 className='py-2 font-medium tracking-wider text-center bg-secondary_blue/30 dark:bg-secondary_blue/80 rounded-t-xl'>
								{item.category}
							</h5>
							<div className='max-w-xs p-4 space-y-2 w-52'>
								{item.skills.map((skill) => (
									<div className='flex items-center space-x-1.5' key={skill.name}>
										{skill.icon && <Image src={skill.icon} width={24} height={24} alt={skill.name} />}
										<p>{skill.name}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
