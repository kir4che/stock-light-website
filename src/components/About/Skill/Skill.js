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
			category: 'UI／UX',
			skills: [
				{
					icon: 'https://img.icons8.com/color/28/figma--v1.png',
					name: 'Figma',
				},
			],
		},
		{
			id: 3,
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
				{
					icon: 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/leancloud-assets/7761624853837b0f78cc.png~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp',
					name: 'Apache ECharts',
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
		<div className='flex flex-col justify-center w-full md:flex-row'>
			{skill_list.map((item) => (
				<ul className='flex py-3 px-14 md:px-6 md:block md:py-4' key={item.id}>
					<h4 className='font-medium md:mb-4'>{item.category}</h4>
					{item.skills.map((skill) => (
						<li className='flex items-center justify-center px-4 md:mx-auto md:py-1.5 md:mb-3' key={skill.name}>
							{skill.icon !== '' ? <img className='w-6 mr-1' src={skill.icon} alt={skill.name}></img> : null}
							{skill.name}
						</li>
					))}
				</ul>
			))}
		</div>
	)
}
