export function Lantern({ position, label = '' }) {
	return (
		<div className={`absolute lantern ${label !== '' ? 'lanterntag_container' : ''} ${position} lantern_hover`}>
			<div className='laternlight'></div>
			<div className='rounded-t-lg left rounded-b-md'></div>
			<div className='rounded-t-lg right rounded-b-md'></div>
			<div className='lantern-flame'></div>
			<div className='w-8 mx-2 my-5 flex-center latern_label'>{label}</div>
		</div>
	)
}

export function LanternLayout({ children, otherStyle = '' }) {
	return <div className={`lantern-float ${otherStyle}`}>{children}</div>
}
