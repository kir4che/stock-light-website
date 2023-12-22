export function Lantern({ position = 'absolute', label = '', isLighted = true, isHovered = false }) {
	return (
		<div
			className={`scale-75 lantern ${position} ${label !== '' ? 'lanterntag_container' : ''} ${
				isLighted ? '' : 'brightness-75'
			}`}
		>
			<div
				className={`${isLighted ? 'laternlight laternlight_hover' : ''} ${
					isHovered
						? 'translate-x-12 bg-white translate-y-7 h-24 animate-none w-24 absolute shadow-[0_0_10px_#fff,0_0_20px_#fff,0_0_30px_#fff,0_0_40px_#FFCD1E,0_0_70px_#FFCD1E,0_0_80px_#FFCD1E,0_0_100px_#FFC600,0_0_150px_#FFC600,0_0_180px_#FFC600] rounded-full'
						: ''
				}`}
			/>
			<div className='rounded-t-lg left rounded-b-md' />
			<div className='rounded-t-lg right rounded-b-md' />
			<div className={isLighted ? 'lantern-flame' : ''} />
			<div className={`w-8 mx-2 my-5 flex-center latern_label ${isHovered ? 'visible' : ''}`}>{label}</div>
		</div>
	)
}

export function LanternLayout({ otherStyle = '', children }) {
	return <div className={`lantern-float ${otherStyle}`}>{children}</div>
}
