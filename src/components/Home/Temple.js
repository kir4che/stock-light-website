export default function Temple() {
	return (
		<svg
			className='w-[300px] h-[238px] md:w-[360px] md:h-[286px] lg:w-[450px] lg:h-[382px]'
			id='banner-temple'
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			x='0px'
			y='0px'
			viewBox='0 0 303 155'
			xmlSpace='preserve'
		>
			<g className='wall'>
				<rect x='21.5' y='101.501' width='260' height='20' />
				<rect x='21.5' y='131.501' width='260' height='80' />
			</g>

			<g className='wall wall-top'>
				<rect x='41.5' y='31.501' width='220' height='40' />
			</g>

			<g className='lamp lamp-yellow'>
				<g className='animation-pendulum animation-delayed-1'>
					<line x1='101.5' y1='141.501' x2='101.5' y2='131.417' />
					<rect x='96.5' y='141.501' width='10' height='2' />
					<circle cx='101.5' cy='154.001' r='10' />
					<rect x='96.5' y='164.501' width='10' height='2' />
				</g>
			</g>

			<g className='lamp lamp-yellow'>
				<g className='animation-pendulum animation-delayed-2'>
					<line x1='201.5' y1='141.501' x2='201.5' y2='131.417' />
					<rect x='196.5' y='141.501' width='10' height='2' />
					<circle cx='201.5' cy='154.001' r='10' />
					<rect x='196.5' y='164.501' width='10' height='2' />
				</g>
			</g>

			<g className='lamp lamp-red'>
				<g className='animation-pendulum'>
					<line x1='151.5' y1='141.501' x2='151.5' y2='131.417' />
					<rect x='146.5' y='141.501' width='10' height='2' />
					<path d='M151.656,171.084L151.656,171.084c-5.586,0-10.156-4.57-10.156-10.156v-6.813c0-5.586,4.57-10.156,10.156-10.156h0,c5.586,0,9.844,4.57,9.844,10.156v6.813C161.5,166.514,157.242,171.084,151.656,171.084z' />
					<rect x='146.5' y='171.542' width='10' height='2' />
				</g>
			</g>

			<g className='windows'>
				<line x1='41.5' y1='131.501' x2='41.5' y2='141.459' />
				<line x1='51.5' y1='141.459' x2='51.5' y2='131.501' />
				<line x1='61.5' y1='131.501' x2='61.5' y2='141.459' />
				<line x1='41.5' y1='181.501' x2='41.5' y2='211.501' />
				<line x1='51.5' y1='181.501' x2='51.5' y2='211.501' />
				<line x1='61.5' y1='181.501' x2='61.5' y2='211.501' />
				<line x1='241.5' y1='131.501' x2='241.5' y2='141.459' />
				<line x1='251.5' y1='131.501' x2='251.5' y2='141.459' />
				<line x1='261.5' y1='131.501' x2='261.5' y2='141.459' />
				<line x1='241.5' y1='181.501' x2='241.5' y2='211.501' />
				<line x1='251.5' y1='181.501' x2='251.5' y2='211.501' />
				<line x1='261.5' y1='181.501' x2='261.5' y2='211.501' />
				<line className='window-red' x1='31.5' y1='181.501' x2='71.5' y2='181.501' />
				<line className='window-red' x1='231.5' y1='181.501' x2='271.5' y2='181.501' />
				<line className='window-red' x1='31.5' y1='141.501' x2='71.5' y2='141.501' />
				<line className='window-red' x1='231.5' y1='141.501' x2='271.5' y2='141.501' />
			</g>

			<g className='floor floor-middle'>
				<line x1='21.5' y1='111.501' x2='281.5' y2='111.501' />
				<line x1='51.501' y1='101.501' x2='51.501' y2='122.667' />
				<line x1='251.501' y1='101.501' x2='251.501' y2='122.667' />
				<line x1='151.501' y1='101.501' x2='151.501' y2='122.667' />
				<line x1='201.501' y1='101.501' x2='201.501' y2='122.667' />
				<line x1='101.501' y1='101.501' x2='101.501' y2='122.667' />
				<rect x='21.5' y='121.501' width='260' height='10.001' />
			</g>

			<g className='floor floor-top'>
				<line x1='41.5' y1='41.501' x2='261.5' y2='41.501' />
				<line x1='56.833' y1='31.479' x2='56.833' y2='51.501' />
				<line x1='246.458' y1='31.501' x2='246.458' y2='51.501' />
				<line x1='201.5' y1='31.479' x2='201.5' y2='51.501' />
				<line x1='101.5' y1='31.479' x2='101.5' y2='51.501' />
				<rect x='146.5' y='31.479' width='10' height='20.022' />
				<polygon
					points='
		261.5,31.492 41.5,31.46 41.5,71.501 261.5,71.501 	'
				/>
			</g>

			<g className='columns'>
				<rect x='21.5' y='102' height='109.916' />
				<rect x='71.5' y='33' height='179.958' />
				<rect x='121.5' y='33' height='178.5' />
				<rect x='171.5' y='33' height='178.5' />
				<rect x='221.5' y='33' height='178.5' />
				<rect x='271.5' y='102' height='109.916' />
			</g>

			<g className='balcony'>
				<rect x='21.5' y='51.501' width='260' height='20' />
				<line x1='21.5' y1='61.501' x2='281.5' y2='61.501' />
			</g>

			<g className='base'>
				<line x1='21.5' y1='211.501' x2='281.5' y2='211.501' />
			</g>

			<g className='roof roof-top'>
				<polygon
					points='
		11.5,31.5 21.48,11.5 21.48,1.5 281.48,1.5 281.48,11.5 291.5,31.5 	'
				/>
			</g>
			<g className='roof roof-middle'>
				<polygon
					points='
		1.5,101.501 21.5,71.501 281.5,71.501 301.5,101.501 	'
				/>
			</g>
		</svg>
	)
}
