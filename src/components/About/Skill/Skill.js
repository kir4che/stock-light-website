import Image from 'next/image'

export default function Skill() {
	const skill_list = [
		{
			id: 1,
			category: '後端',
			skills: [
				{
					icon: 'https://img.icons8.com/color/28/python--v1.png',
					name: 'Python',
				},
				{
					icon: 'https://img.icons8.com/external-tal-revivo-fresh-tal-revivo/28/external-django-a-high-level-python-web-framework-that-encourages-rapid-development-logo-fresh-tal-revivo.png',
					name: 'Django',
				},
				{
					icon: 'https://img.icons8.com/color/24/mongodb.png',
					name: 'NoSQL',
				},
			],
		},
		{
			id: 2,
			category: '前端',
			skills: [
				{
					icon: 'https://img.icons8.com/color/28/react-native.png',
					name: 'React.js',
				},
				{
					icon: 'https://img.icons8.com/color/28/tailwind_css.png',
					name: 'Tailwind CSS',
				},
			],
		},
		{
			id: 3,
			category: 'UI／UX',
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
					name: '敘述統計',
				},
				{
					icon: '',
					name: '卡方檢定',
				},
				{
					icon: '',
					name: '迴歸分析',
				},
			],
		},
	]

	return (
		<div>
			<h3 className='mb-10 text-center'>主要技術</h3>
			<div className='flex justify-center'>
				<div className='flex pb-8 overflow-x-scroll flex-nowrap'>
					{skill_list.map((item) => (
						<div className='inline-block mx-3 shadow-md dark:bg-zinc-800 rounded-xl' key={item.id}>
							<h5 className='py-2 font-medium tracking-wider text-center bg-secondary_blue/30 dark:bg-secondary_blue/80 rounded-t-xl'>
								{item.category}
							</h5>
							<div className='w-64 h-40 max-w-xs p-4 space-y-4'>
								{item.skills.map((skill) => (
									<div className='flex items-center space-x-1' key={skill.name}>
										{skill.icon && <Image src={skill.icon} width={24} height={24} alt={skill.name} />}
										<p>{skill.name}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
