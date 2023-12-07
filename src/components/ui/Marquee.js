const ANNOUNCEMENT = '網站版本目前已更新到 Version 2.0.0 🎉'

export default function Marquee() {
	return (
		<div className='flex-center py-1 border-y-[1.35px] border-zinc-800 dark:border-y-[0.85px] dark:border-white'>
			<marquee behavior='scroll' direction='left'>
				<span className='inline-block text-sm'>{ANNOUNCEMENT}</span>
			</marquee>
		</div>
	)
}
