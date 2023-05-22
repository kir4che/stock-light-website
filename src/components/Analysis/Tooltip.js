export default function Tooltip({ isExplain, explanation, children }) {
	return (
		<div className='relative flex group'>
			{children}
			<span
				className={`${
					isExplain
						? 'absolute w-36 p-2 left-1 -top-12 text-xs text-white transition-all scale-0 bg-gray-800/80 rounded text-left group-hover:scale-100'
						: 'hidden'
				} `}
			>
				{explanation}
			</span>
		</div>
	)
}
