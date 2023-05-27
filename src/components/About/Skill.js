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
					icon: 'https://img.icons8.com/external-those-icons-flat-those-icons/24/external-MySQL-programming-and-development-those-icons-flat-those-icons.png',
					name: 'MySQL',
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
					icon: 'https://cdn.worldvectorlogo.com/logos/highcharts.svg',
					name: 'Highchart.js',
				},
			],
		},
		{
			id: 4,
			category: '統計分析',
			skills: [],
		},
	]

	return (
		<section className='container'>
			<div className='flex justify-center w-full'>
				{skill_list.map((item) => (
					<ul className='p-6' key={item.id}>
						<h4 className='mb-4 font-medium'>{item.category}</h4>
						{item.skills.map((skill) => (
							<li
								className='flex items-center justify-center px-4 py-1.5 mx-auto mb-3 rounded-full button'
								key={skill.name}
							>
								<img className='w-6 mr-1' src={skill.icon} alt={skill.name}></img>
								{skill.name}
							</li>
						))}
					</ul>
				))}
			</div>
		</section>
	)
}
