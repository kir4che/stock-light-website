import Link from 'next/link'

export default function SidebarBlock2({ icon, title, data }) {
	return (
		<div className='space-y-6'>
			<div className='flex items-center py-1.5 dark:pl-1.5 space-x-2 border-b-[3px] border-b-primary_yellow dark:bg-primary_yellow  dark:text-zinc-800'>
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
							<hr className='mt-3 dark:border-zinc-600' />
						</li>
					))}
			</ul>
		</div>
	)
}
