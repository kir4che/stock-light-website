export default function PasswordInput({ label, placeholder }) {
	return (
		<div className='w-full space-y-1'>
			<label className='text-sm'>{label}</label>
			<div className='relative flex items-center justify-center'>
				<input
					placeholder={placeholder}
					type='password'
					className='w-full py-3 pl-3 text-xs border rounded bg-zinc-200'
				/>
			</div>
		</div>
	)
}
