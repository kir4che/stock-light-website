import Link from 'next/link'
import style from '../../../styles/Banner.module.css'

export default function Banner() {
	return (
		<div className="w-full h-56 lg:h-80 bg-[url('https://imgur.com/TUd42OT.jpg')] dark:bg-[url('https://imgur.com/cBa93lo.jpg')] bg-no-repeat lg:bg-cover bg-center">
			<svg
				className='w-[292px] h-[240px] lg:w-[420px] lg:h-[340px]'
				id={style.banner_temple}
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				x='0px'
				y='0px'
				viewBox='-5 21.5 303 163.8'
				xmlSpace='preserve'
			>
				{/* 下方牆壁 */}
				<g className={style.wall}>
					<rect x='21.5' y='101.501' width='260' height='20' />
					<rect x='21.5' y='131.501' width='260' height='80' />
				</g>
				{/* 上方牆壁 */}
				<g className={`${style.wall} ${style.wall_top}`}>
					<rect x='41.5' y='31.501' width='220' height='40' />
				</g>
				{/* 黃色燈籠(左) */}
				<g className={`${style.lamp} ${style.lamp_yellow}`}>
					<g className={`${style.animation_pendulum} ${style.animation_delayed_1}`}>
						<line x1='101.5' y1='141.501' x2='101.5' y2='131.417' />
						<rect x='96.5' y='141.501' width='10' height='2' />
						<circle cx='101.5' cy='154.001' r='10' />
						<rect x='96.5' y='164.501' width='10' height='2' />
					</g>
				</g>
				{/* 黃色燈籠(右) */}
				<g className={`${style.lamp} ${style.lamp_yellow}`}>
					<g className={`${style.animation_pendulum} ${style.animation_delayed_2}`}>
						<line x1='201.5' y1='141.501' x2='201.5' y2='131.417' />
						<rect x='196.5' y='141.501' width='10' height='2' />
						<circle cx='201.5' cy='154.001' r='10' />
						<rect x='196.5' y='164.501' width='10' height='2' />
					</g>
				</g>
				{/* 紅色燈籠 */}
				<Link href={'/light'}>
					<g className={`${style.lamp} ${style.lamp_red}`}>
						<g className={style.animation_pendulum}>
							<line x1='151.5' y1='141.501' x2='151.5' y2='131.417' />
							<rect x='146.5' y='141.501' width='10' height='2' />
							<path d='M151.656,171.084L151.656,171.084c-5.586,0-10.156-4.57-10.156-10.156v-6.813c0-5.586,4.57-10.156,10.156-10.156h0,c5.586,0,9.844,4.57,9.844,10.156v6.813C161.5,166.514,157.242,171.084,151.656,171.084z' />
							<rect x='146.5' y='171.542' width='10' height='2' />
						</g>
					</g>
				</Link>
				{/* 主梁柱 */}
				<g className={style.columns}>
					<rect x='21.5' y='101.6' height='109.916' />
					<rect x='71.5' y='31.6' height='179.958' />
					<rect x='121.5' y='33' height='178.5' />
					<rect x='171.5' y='32.8' height='178.5' />
					<rect x='221.5' y='33' height='178.5' />
					<rect x='271.5' y='101.6' height='109.916' />
				</g>
				{/* 上方梁柱 */}
				<g className={`${style.floor} ${style.floor_top}`}>
					<line x1='41.5' y1='41.501' x2='261.5' y2='41.501' />
					<line x1='56.833' y1='31.479' x2='56.833' y2='51.501' />
					<line x1='246.458' y1='31.501' x2='246.458' y2='51.501' />
					<line x1='201.5' y1='31.479' x2='201.5' y2='51.501' />
					<line x1='101.5' y1='31.479' x2='101.5' y2='51.501' />
					<rect x='146.5' y='31.479' width='10' height='20.022' />
					<polygon points='261.5,31.492 41.5,31.46 41.5,71.501 261.5,71.501' />
				</g>
				{/* 下方梁柱 */}
				<g className={`${style.floor} ${style.floor_middle}`}>
					<line x1='21.5' y1='111.501' x2='281.5' y2='111.501' />
					<line x1='51.501' y1='101.501' x2='51.501' y2='122.667' />
					<line x1='251.501' y1='101.501' x2='251.501' y2='122.667' />
					<line x1='151.501' y1='101.501' x2='151.501' y2='122.667' />
					<line x1='201.501' y1='101.501' x2='201.501' y2='122.667' />
					<line x1='101.501' y1='101.501' x2='101.501' y2='122.667' />
					<rect x='21.5' y='121.501' width='260' height='10.001' />
				</g>
				{/* 上屋簷 */}
				<g className={`${style.roof} ${style.roof_top}`}>
					<polygon points='11.5,31.5 21.48,11.5 21.48,1.5 281.48,1.5 281.48,11.5 291.5,31.5' />
				</g>
				{/* 下屋簷上方樓層 */}
				<g className={style.balcony}>
					<rect x='21.5' y='51.501' width='260' height='20' />
					<line x1='21.5' y1='61.501' x2='281.5' y2='61.501' />
				</g>
				{/* 下屋簷 */}
				<g className={`${style.roof} ${style.roof_middle}`}>
					<polygon points='1.5,101.501 21.5,71.501 281.5,71.501 301.5,101.501' />
				</g>
			</svg>
		</div>
	)
}