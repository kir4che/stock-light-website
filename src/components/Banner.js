import Temple from '@/components/Temple'

export default function Banner() {
	return (
		<div className='w-full text-center border-b-2 h-60 border-b-text_black md:h-72 lg:h-96'>
			<Temple />
			<div id='banner-title'>
				<span id='股'>股</span>
				<span id='市'>市</span>
				<span id='光'>光</span>
				<span id='明'>明</span>
				<span id='燈'>燈</span>
			</div>
		</div>
	)
}