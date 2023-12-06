import style from '@/styles/starrybg.module.css'

const StarryBackground = ({ children, className }) => {
	return (
		<div id={style.starry_background_container} className={className}>
			{children}
			<div className={style.stars} />
			<div className={style.twinkling} />
			<div className={style.clouds} />
		</div>
	)
}

export default StarryBackground
