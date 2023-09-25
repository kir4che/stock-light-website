export default function Lantern({ labelPosition, label = '' }) {
	return (
		<div className={`absolute lantern ${label !== '' ? 'lanterntag_container' : ''} ${labelPosition}`}>
			<div className='laternlight'></div>
			<div className='rounded-t-lg left rounded-b-md'></div>
			<div className='rounded-t-lg right rounded-b-md'></div>
			<div className='flame'></div>
			<div className='w-8 mx-2 my-5 flex-center laterntag'>{label}</div>
		</div>
	)
}
