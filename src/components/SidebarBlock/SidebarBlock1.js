import Link from 'next/link'

export default function SidebarBlock1({ icon, title, data }) {
	return (
		<div className='space-y-6'>
			<div className='flex items-center pb-2.5 space-x-2 border-b-[3px] border-b-primary_yellow'>
				{icon}
				<h5>{title}</h5>
			</div>
			<ul className='space-y-3'>
				{data &&
					data.map((item, index) => (
						<li key={index}>
							<Link href={item.url} target='_blank' className='hover:text-zinc-500 dark:hover:text-zinc-300'>
								{item.title}
							</Link>
							<hr className='mt-3' />
						</li>
					))}
			</ul>
		</div>
	)
}
