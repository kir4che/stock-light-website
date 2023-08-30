import style from './style.module.css'

const StarryBackground = ({ children, className }) => {
	return (
		<div id={style.starry_background_container} className={className}>
			{children}
			<div className={style.stars}></div>
			<div className={style.twinkling}></div>
			<div className={style.clouds}></div>
		</div>
	)
}

export default StarryBackground
